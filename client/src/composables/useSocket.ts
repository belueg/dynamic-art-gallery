import { io } from 'socket.io-client'
import { ref, onMounted, onUnmounted } from 'vue'

const socket = io('http://localhost:3000', {
  transports: ['websocket']
})

export function useSocket() {
  const canvasState = ref({
    themeColor: '',
    images: [],
    annotations: []
  })

  onMounted(() => {
    socket.on('initialize', state => {
      canvasState.value = state
    })

    socket.on('canvasUpdate', canvas => {
      canvasState.value = canvas
      console.log('updateCanvas', canvas)
    })
  })

  socket.on('updateImages', images => {
    canvasState.value.images = images
  })

  socket.on('addAnnotation', annotation => {
    canvasState.value.annotations.push(annotation)
  })

  socket.on('updateAnnotationPosition', ({ id, x, y }) => {
    const annotation = canvasState.value.annotations.find(ann => ann.id === id)
    if (annotation) {
      annotation.x = x
      annotation.y = y
    }

    socket.on('updateAnnotationSize', ({ id, x, y, width, height }) => {
      const annotation = canvasState.value.annotations.find(
        ann => ann.id === id
      )
      if (annotation) {
        annotation.x = x
        annotation.y = y
        annotation.width = width
        annotation.height = height
      }
    })

    socket.on('updateAnnotationText', ({ id, text }) => {
      const annotation = canvasState.value.annotations.find(
        ann => ann.id === id
      )
      if (annotation) {
        annotation.text = text
      }
    })
  })

  socket.on('updateColorTheme', ({ color }) => {
    canvasState.value.themeColor = color
  })

  onUnmounted(() => {
    socket.off('initialize')
    socket.off('updateAnnotationColor')
    socket.off('updateImages')
    socket.off('addAnnotation')
    socket.off('updateAnnotationPosition')
    socket.off('updateAnnotationSize')
    socket.off('updateAnnotationText')
  })

  const emitUpdateColorTheme = color => {
    socket.emit('updateColorTheme', { color })
    console.log('updateColorTheme', { color })
  }

  const emitAddImage = imageData => {
    console.log('emitAddImage', imageData)
    socket.emit('addImage', imageData)
  }

  const emitAddAnnotation = annotation => {
    socket.emit('addAnnotation', annotation)
    console.log('emitAddAnnotation', annotation)
  }

  const emitUpdateAnnotationText = annotation => {
    socket.emit('addAnnotation', annotation)
    console.log('emitAddAnnotation', annotation)
  }

  return {
    canvasState,
    emitUpdateColorTheme,
    emitAddImage,
    emitAddAnnotation,
    emitUpdateAnnotationText
  }
}
