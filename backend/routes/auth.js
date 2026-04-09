const express = require('express')
const router = express.Router()

const {
  signup,
  login,
  googleAuth,
  getMe
} = require('../controllers/authController')

const { protect } = require('../middleware/auth')   // ✅ FIXED


// ================= AUTH ROUTES =================

// Signup
router.post('/signup', signup)

// Login
router.post('/login', login)

// Google Login
router.post('/google', googleAuth)

// Get current user
router.get('/me', protect, getMe)


module.exports = router