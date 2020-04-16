const morgan = require('morgan')
const logger = require('./logger')

morgan.token('body', (req, res) => {
  return JSON.stringify(req.body)
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
  logger.error(error)

  if (error.name === 'CastError') {
    res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    res.status(400).json({ error: error.message })
  }

  next()
}

module.exports = {
  morgan,
  unknownEndpoint,
  errorHandler,
}
