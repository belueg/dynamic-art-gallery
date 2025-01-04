import { ref, onMounted, onUnmounted } from 'vue'
import { useSocketConnection } from './useSocketConnection'

interface CanvasState {
  themeColor: string
  images: Image[]
  annotations: Annotation[]
}

export function useCanvasState() {
  const { socket } = useSocketConnection()
  const canvasState = ref<CanvasState>({
    themeColor: '',
    images: [],
    annotations: []
  })

  onMounted(() => {
    socket.on('initialize', (state: CanvasState) => {
      canvasState.value = state
    })

    socket.on('canvasUpdate', (canvas: CanvasState) => {
      canvasState.value = canvas
    })
  })

  onUnmounted(() => {
    socket.off('initialize')
    socket.off('canvasUpdate')
  })

  return {
    canvasState
  }
}