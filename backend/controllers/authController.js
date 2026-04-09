const jwt = require('jsonwebtoken')
const User = require('../models/user')
const config = require('../config')

const signToken = (id) =>
  jwt.sign({ id }, config.JWT_SECRET, { expiresIn: config.JWT_EXPIRES_IN })


// ================= SIGNUP =================
const signup = async (req, res) => {
  try {

    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        error: 'All fields are required.'
      })
    }

    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'Email already registered.'
      })
    }

    const user = await User.create({
      name,
      email,
      password
    })

    const token = signToken(user._id)

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
      }
    })

  } catch (err) {

    console.error("Signup Error:", err)

    res.status(500).json({
      success: false,
      error: "Signup failed."
    })
  }
}


// ================= LOGIN =================
const login = async (req, res) => {

  try {

    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email and password are required.'
      })
    }

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password.'
      })
    }

    const isMatch = await user.comparePassword(password)

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password.'
      })
    }

    const token = signToken(user._id)

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
      }
    })

  } catch (err) {

    console.error("Login Error:", err)

    res.status(500).json({
      success: false,
      error: "Login failed."
    })
  }
}


// ================= GOOGLE LOGIN =================
const googleAuth = async (req, res) => {

  try {

    const { name, email, googleId, avatar } = req.body

    if (!email) {
      return res.status(400).json({
        success: false,
        error: 'Email required.'
      })
    }

    let user = await User.findOne({ email })

    if (!user) {

      user = await User.create({
        name: name || "Google User",
        email,
        googleId,
        avatar
      })

    } else if (!user.googleId) {

      // attach google account if normal user exists
      user.googleId = googleId
      user.avatar = avatar
      await user.save()

    }

    const token = signToken(user._id)

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
      }
    })

  } catch (err) {

    console.error("Google Auth Error:", err)

    res.status(500).json({
      success: false,
      error: "Google authentication failed."
    })
  }
}


// ================= GET CURRENT USER =================
const getMe = async (req, res) => {

  res.json({
    success: true,
    user: req.user
  })

}

module.exports = { signup, login, googleAuth, getMe }