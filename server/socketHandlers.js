const _ = require('lodash')
const {
  colorSchema,
  imageSchema,
  annotationSchema
} = require('./validators/validationSchemas')

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

function emitCanvasUpdate(socket) {
  socket.broadcast.emit('canvasUpdate', canvasState)
  socket.emit('canvasUpdate', canvasState)
}

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
      const { error } = colorSchema.validate({ color })
      if (error) {
        console.error('Invalid color data:', error.details)
        return
      }
      canvasState.themeColor = color
      console.log('updateColorTheme server', color)

      emitCanvasUpdate(socket)
    })

    socket.on('addOrUpdateImage', imageData => {
      console.log('addOrUpdateImage server', imageData)

      const { error } = imageSchema.validate(imageData)
      if (error) {
        console.error('Invalid image data:', error.details)
        return
      }
      console.log('addOrUpdateImage server', imageData)

      const index = _.findIndex(canvasState.images, { id: imageData.id })

      if (index !== -1) {
        _.assign(canvasState.images[index], imageData)
      } else {
        canvasState.images.push(imageData)
      }
      emitCanvasUpdate(socket)
    })

    socket.on('addOrUpdateAnnotationText', annotation => {
      console.log('addOrUpdateAnnotationText server', annotation)
      const { error } = annotationSchema.validate(annotation)
      if (error) {
        console.error('Invalid annotation data:', error.details)
        return
      }

      const index = _.findIndex(canvasState.annotations, { id: annotation.id })

      if (index !== -1) {
        _.assign(canvasState.annotations[index], annotation)
      } else {
        canvasState.annotations.push(annotation)
      }
      emitCanvasUpdate(socket)
    })

    socket.on('disconnect', () => {
      activeConnections--
      console.log(`User disconnected: ${socket.id}`)
      console.log(`Active connections: ${activeConnections}`)
    })
  })
}

module.exports = { initializeSocket }
