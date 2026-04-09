const express = require('express')
const router  = express.Router()
const { protect, adminOnly } = require('../middleware/auth')
const { getStats, getAllUsers } = require('../controllers/adminController')

router.get('/stats', protect, adminOnly, getStats)
router.get('/users', protect, adminOnly, getAllUsers)

module.exports = router