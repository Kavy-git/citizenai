const express = require('express')
const router  = express.Router()
const { protect } = require('../middleware/auth')
const {
  getSaved, saveScheme, removeSaved,
  updateProfile, getChatHistory, saveChatMessage
} = require('../controllers/userController')

router.get('/saved',              protect, getSaved)
router.post('/saved',             protect, saveScheme)
router.delete('/saved/:schemeId', protect, removeSaved)
router.put('/profile',            protect, updateProfile)
router.get('/history',            protect, getChatHistory)
router.post('/history',           protect, saveChatMessage)

module.exports = router