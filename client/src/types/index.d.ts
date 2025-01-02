interface Image {
  id: string
  src: string
  x: number
  y: number
  width: number
  height: number
}

interface NewImage {
  id: string
  src: string
}

interface UpdateImagePosition {
  id: string
  x: number
  y: number
  width: number
  height: number
}

type Mode = 'text' | 'image' | 'color' | ''
