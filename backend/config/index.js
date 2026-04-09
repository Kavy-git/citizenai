// ============================================================
// Citizen AI Configuration
// ============================================================

require('dotenv').config()

const config = {

  // ==========================================================
  // Server
  // ==========================================================

  PORT: process.env.PORT || 5000,


  // ==========================================================
  // Frontend URL (CORS)
  // ==========================================================

  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',


  // ==========================================================
  // MongoDB
  // ==========================================================

  MONGO_URI: process.env.MONGO_URI || '',


  // ==========================================================
  // JWT Authentication
  // ==========================================================

  JWT_SECRET: process.env.JWT_SECRET || 'citizenai_super_secret_2026',

  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',


  // ==========================================================
  // Groq AI
  // ==========================================================

  GROQ_API_KEY: process.env.GROQ_API_KEY || '',

  MAX_TOKENS: Number(process.env.MAX_TOKENS) || 500,


  // ==========================================================
  // Google OAuth
  // ==========================================================

  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '',


  // ==========================================================
  // Global API Rate Limit
  // ==========================================================

  RATE_LIMIT: {
    windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
    max: Number(process.env.RATE_LIMIT_MAX) || 100
  },


  // ==========================================================
  // Chat API Rate Limit
  // ==========================================================

  CHAT_RATE_LIMIT: {
    windowMs: 60 * 1000, // 1 minute
    max: Number(process.env.CHAT_RATE_LIMIT_MAX) || 20
  },


  // ==========================================================
  // AI System Prompt
  // ==========================================================

  SYSTEM_PROMPT: `
You are Citizen AI assistant.

Your job is to help Indian citizens find:

• Government schemes
• Scholarships
• Farmer benefits
• Women welfare schemes
• Job opportunities
• Startup programs

Always answer in simple language.

Format response like this:

Scheme Name:
Benefits:
Eligibility:
How to Apply:
`
}

module.exports = config