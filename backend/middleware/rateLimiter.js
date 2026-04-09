const rateLimit = require('express-rate-limit')
const config = require('../config')

// Safe defaults if config values are missing
const RATE_LIMIT = config.RATE_LIMIT || {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100
}

const CHAT_RATE_LIMIT = config.CHAT_RATE_LIMIT || {
  windowMs: 60 * 1000, // 1 minute
  max: 20
}

// General API rate limiter
const apiLimiter = rateLimit({
  windowMs: RATE_LIMIT.windowMs,
  max: RATE_LIMIT.max,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many requests. Please try again after 15 minutes.',
  },
})

// Stricter limiter for the AI chat endpoint
const chatLimiter = rateLimit({
  windowMs: CHAT_RATE_LIMIT.windowMs,
  max: CHAT_RATE_LIMIT.max,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many chat requests. Please wait a moment before sending another message.',
  },
})

module.exports = { apiLimiter, chatLimiter }