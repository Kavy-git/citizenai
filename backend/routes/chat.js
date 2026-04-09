const express = require('express')
const router = express.Router()

const { sendMessage } = require('../controllers/chatController')
const { chatLimiter } = require('../middleware/rateLimiter')

/*
Route: POST /api/chat
Body:
{
  messages: [
    { role: "user", content: "hello" },
    { role: "assistant", content: "hi" }
  ]
}
*/

router.post('/', chatLimiter, sendMessage)

module.exports = router