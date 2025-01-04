import { io } from 'socket.io-client'
import { ref, onMounted, onUnmounted } from 'vue'

const socket = io('http://localhost:3000', {
  transports: ['websocket']
})

export function useSocketConnection() {
  const isConnected = ref(false)

  onMounted(() => {
    socket.on('connect', () => {
      isConnected.value = true
    })

    socket.on('disconnect', () => {
      isConnected.value = false
    })
  })

  onUnmounted(() => {
    socket.off('connect')
    socket.off('disconnect')
  })

  return {
    socket,
    isConnected
  }
}