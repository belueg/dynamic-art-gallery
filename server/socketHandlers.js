const _ = require('lodash')

/**
 * @typedef {Object} GalleryCanvasState
 * @property {string} themeColor
 * @property {Array<{id: string, x: number, y: number, src: string}>} images
 * @property {Array<{id: string, x: number, y: number, text: string, color: string}>} annotations
 */

/** @type {GalleryCanvasState} */
let canvasState = {
  themeColor: '',
  images: [],
  annotations: []
}

let activeConnections = 0

function initializeSocket(io) {
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

    socket.on('addOrUpdateImage', imageData => {
      console.log('addOrUpdateImage server', imageData)
      const index = canvasState.images.findIndex(
        image => image.id === imageData.id
      )
      if (index !== -1) {
        _.assign(canvasState.images[index], imageData)
      } else {
        canvasState.images.push(imageData)
      }
      socket.broadcast.emit('canvasUpdate', canvasState)
      socket.emit('canvasUpdate', canvasState)
    })

    socket.on('addOrUpdateAnnotationText', annotation => {
      console.log('addOrUpdateAnnotationText server', annotation)
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
}

module.exports = { initializeSocket }
