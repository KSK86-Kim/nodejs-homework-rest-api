const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const api = require('./router/api')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', api.contacts)
app.use('/api/users', api.users)

const { avatarDir } = require('./helpers/staticPath')
app.use(
  '/avatars',
  express.static(avatarDir)
)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

module.exports = app
