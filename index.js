const express = require('express')
const helmet = require('helmet')
const consola = require('consola')
require('dotenv').config()
const morgan = require('morgan')
const app = express()
const cors = require('cors')
var server = require('http').createServer(app);
const socketio = require("socket.io")
const WebSockets = require('./utils/WebSockets')
global.io = socketio(server);
global.io.on('connection', WebSockets.connection)

const port = process.env.PORT || 5500

//applevel middleware
app.use(helmet())
app.use(morgan('common'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//setting socket to use in other routes

//connecting database
const connectDB = require('./utils/database')
connectDB()

//user define droutes
app.use('/api/v1/auth', require('./routes/authRoute'))
app.use('/api/v1/user', require('./routes/userRoute'))
app.use('/api/v1/service', require('./routes/serviceRoute'))
app.use('/api/v1/job', require('./routes/jobRoutes'))
app.use('/api/v1/proposal', require('./routes/proposalRoute'))
app.use('/api/v1/chat', require('./routes/chatRuote'))

//basic get route
app.get('/', (req, res) => {
  res.json({ message: 'daypitch API by Tatenda Bako' })
})

//not found handler
app.use((req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`)
  res.status(404)
  next(error)
})

//error hanling middleware
app.use((error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  res.status(statusCode);
  consola.error(error)
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? "you are in production" : error.stack
  })
})

//the listener
server.listen(port, (err) => {
  if (err) {
    consola.error(err)
  } else {
    consola.success(`server up on port ${port}`)
  }
})