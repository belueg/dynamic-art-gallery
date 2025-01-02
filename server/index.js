const express = require('express')
const http = require('http')
const _ = require('lodash')
const { Server } = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*'
  }
})

let canvasState = {
  themeColor: '',
  images: [], // [{ id, x, y, src }]
  annotations: [] // [{ x, y, text, color }]
}

let activeConnections = 0

app.use(express.static('public'))

io.on('connection', socket => {
  activeConnections++
  console.log(`Users connected: ${socket.id}`)
  console.log(`Active connections: ${activeConnections}`)

  socket.on('initialize', () => {
    socket.emit('canvasUpdate', canvasState)
  })

  io.emit('canvasUpdate', canvasState)

  socket.on('updateColorTheme', ({ color }) => {
    canvasState.themeColor = color
    console.log('updateColorTheme server', color)

    socket.broadcast.emit('canvasUpdate', canvasState)
    socket.emit('canvasUpdate', canvasState)
  })

  socket.on('addImage', imageData => {
    console.log('addImage server', imageData)
    const index = canvasState.images.findIndex(
      image => image.id === imageData.id
    )
    if (index !== -1) {
      _.assign(canvasState.images[index], imageData)
    } else {
      canvasState.images.push(imageData)
    }
    socket.broadcast.emit('canvasUpdate', canvasState) // Emits to everyone except the sender
    socket.emit('canvasUpdate', canvasState) // Emits to the sender
  })

  socket.on('addAnnotation', annotation => {
    console.log('addAnnotation server', annotation)
    const index = canvasState.annotations.findIndex(
      annot => annot.id === annotation.id
    )
    if (index !== -1) {
      _.assign(canvasState.annotations[index], annotation)
    } else {
      canvasState.annotations.push(annotation)
    }
    socket.broadcast.emit('canvasUpdate', canvasState)
    socket.emit('canvasUpdate', canvasState)
  })

  socket.on('disconnect', () => {
    activeConnections--
    console.log(`User disconnected: ${socket.id}`)
    console.log(`Active connections: ${activeConnections}`)
  })
})

server.listen(3000, () => {
  console.log('Server running on  http://localhost:3000')
})
