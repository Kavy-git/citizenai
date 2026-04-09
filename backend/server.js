// ============================================================
//  CITIZEN AI — Backend Server
// ============================================================

require('dotenv').config()

const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')

const config = require('./config')
const connectDB = require('./db/connect')

// Routes
const schemesRouter = require('./routes/schemes')
const chatRouter = require('./routes/chat')
const healthRouter = require('./routes/health')
const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')
const adminRouter = require('./routes/admin')

// Middleware
const { apiLimiter } = require('./middleware/rateLimiter')
const { errorHandler, notFound } = require('./middleware/errorHandler')

const app = express()

// ============================================================
// Security Middleware
// ============================================================

app.use(helmet())

// ============================================================
// CORS
// ============================================================

app.use(
  cors({
    origin: config.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
  })
)

// ============================================================
// Body Parsing
// ============================================================

app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: false }))

// ============================================================
// Logging
// ============================================================

app.use(morgan('dev'))

// ============================================================
// Global Rate Limiter
// ============================================================

app.use('/api', apiLimiter)

// ============================================================
// API Routes
// ============================================================

app.use('/api/health', healthRouter)
app.use('/api/schemes', schemesRouter)
app.use('/api/chat', chatRouter)
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/admin', adminRouter)

// ============================================================
// Root Route
// ============================================================

app.get('/', (req, res) => {
  res.json({
    message: '🏛️ Citizen AI Backend running',
    health: '/api/health'
  })
})

// ============================================================
// Error Middleware
// ============================================================

app.use(notFound)
app.use(errorHandler)

// ============================================================
// Start Server
// ============================================================

const startServer = async () => {
  try {

    await connectDB()

    const PORT = config.PORT || 5000

    app.listen(PORT, () => {
      console.log(`🚀 Citizen AI Backend running on http://localhost:${PORT}`)
      console.log(`Frontend URL: ${config.FRONTEND_URL || 'http://localhost:5173'}`)
    })

  } catch (error) {

    console.error("Server Start Error:", error)
    process.exit(1)

  }
}

startServer()