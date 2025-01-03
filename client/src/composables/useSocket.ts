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

  onUnmounted(() => {
    socket.off('initialize')
    socket.off('canvasUpdate')
  })

  const emitUpdateColorTheme = color => {
    socket.emit('updateColorTheme', { color })
    console.log('updateColorTheme', { color })
  }

  const emitAddOrUpdateImage = imageData => {
    console.log('emitAddOrUpdateImage', imageData)
    socket.emit('addOrUpdateImage', imageData)
  }

  const emitAddOrUpdateAnnotation = annotation => {
    socket.emit('addOrUpdateAnnotationText', annotation)
    console.log('addOrUpdateAnnotationText', annotation)
  }

  return {
    canvasState,
    emitUpdateColorTheme,
    emitAddOrUpdateImage,
    emitAddOrUpdateAnnotation
  }
}
