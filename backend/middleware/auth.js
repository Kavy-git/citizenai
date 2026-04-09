const jwt    = require('jsonwebtoken')
const User   = require('../models/user')
const config = require('../config')

const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token)
      return res.status(401).json({ success: false, error: 'Not authenticated.' })

    const decoded = jwt.verify(token, config.JWT_SECRET)
    req.user = await User.findById(decoded.id).select('-password')
    if (!req.user)
      return res.status(401).json({ success: false, error: 'User not found.' })

    next()
  } catch {
    res.status(401).json({ success: false, error: 'Invalid or expired token.' })
  }
}

const adminOnly = (req, res, next) => {
  if (!req.user?.isAdmin)
    return res.status(403).json({ success: false, error: 'Admin access required.' })
  next()
}

module.exports = { protect, adminOnly }