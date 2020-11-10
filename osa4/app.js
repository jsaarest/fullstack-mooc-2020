const config = require('./utils/config')
const express = require('express')
const cors = require('cors')
const app = express()
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

// DB connection
logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })
// Config
app.use(cors())
app.use(express.json())
app.use(middleware.errorHandler)

// Routes
app.use('/api/blogs', blogsRouter)

module.exports = app