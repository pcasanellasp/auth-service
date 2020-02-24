// ------------------------------
// server.js
// ------------------------------

'use strict'

const express = require('express')
const morgan = require('morgan')
const { ApiError } = require('./lib/error')

// Global App
global.ApiError = ApiError

// Database Connect
require('./config/database').initialize()

// Init App
const app = express()

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan(':status | :response-time ms | :method :url | :remote-addr'))
}

// Routes
const authRouter = require('./routes/authRoute')
const userRouter = require('./routes/userRoute')
const welcomeRouter = require('./routes/welcomeRoute')

// Allow CORS.
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept-Language')
  next()
})

app.options('/*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Accept-Language')
  res.sendStatus(200)
})

// Use express json parse to get json objects in request body.
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// API Routes.
app.use('/auth', authRouter)
app.use('/users', userRouter)
app.use('/', welcomeRouter)

// Capture 404 errors
app.use(function (req, res, next) {
  const error = {
    errors: ['Nothing to do here...'],
    statusCode: '404',
  }

  next(error)
})

// Capture errors
app.use(function (error, req, res, next) {
  const { statusCode, errors } = error

  if (process.env.NODE_ENV !== 'production') {
    console.info('---> console error')
    console.error(errors || error)
    console.info('---> end error')
  }

  res.status(statusCode || 500).json({
    status: 'error',
    errors: errors || error,
  })
})

// Security.
app.disable('x-powered-by')

module.exports = app
