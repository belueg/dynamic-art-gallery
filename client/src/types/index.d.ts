interface Image {
  id: string
  src: string
  x?: number
  y?: number
  width: number
  height: number
}

interface Annotation {
  id: number
  text: string
  x: number
  y: number
  width: number
  height: number
}

type Mode = 'text' | 'image' | 'color' | ''
