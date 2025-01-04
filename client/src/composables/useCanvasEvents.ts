import { useSocketConnection } from './useSocketConnection'

export function useCanvasEvents() {
  const { socket } = useSocketConnection()

  const emitUpdateColorTheme = (color: string) => {
    socket.emit('updateColorTheme', { color })
  }

  const emitAddOrUpdateImage = (imageData: Image) => {
    socket.emit('addOrUpdateImage', imageData)
  }

  const emitAddOrUpdateAnnotation = (annotation: Annotation) => {
    socket.emit('addOrUpdateAnnotationText', annotation)
  }

  return {
    emitUpdateColorTheme,
    emitAddOrUpdateImage,
    emitAddOrUpdateAnnotation
  }
}