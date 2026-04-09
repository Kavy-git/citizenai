const User       = require('../models/user')
const SchemeView = require('../models/SchemeView')

const getStats = async (req, res) => {
  try {
    const totalUsers  = await User.countDocuments()
    const totalSaves  = await SchemeView.aggregate([{ $group: { _id: null, total: { $sum: '$saves' } } }])
    const topSchemes  = await SchemeView.find().sort({ views: -1 }).limit(10)
    const recentUsers = await User.find().sort({ createdAt: -1 }).limit(5).select('name email createdAt')

    res.json({
      success: true,
      stats: { totalUsers, totalSaves: totalSaves[0]?.total || 0, topSchemes, recentUsers }
    })
  } catch (err) {
    res.status(500).json({ success: false, error: err.message })
  }
}

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 })
    res.json({ success: true, users })
  } catch (err) {
    res.status(500).json({ success: false, error: err.message })
  }
}

module.exports = { getStats, getAllUsers }