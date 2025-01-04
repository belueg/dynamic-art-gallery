<template>
  <VueDraggableResizable
    :x="image.x"
    :y="image.y"
    :w="image.width"
    :h="image.height"
    :parent="true"
    @dragging="debouncedUpdatePosition"
    @resizing="debouncedUpdateSize"
    @click.stop
  >
    <img
      :src="image.src"
      class="h-full w-full object-fit border-2"
      :style="{ borderColor: props.color }"
    />
  </VueDraggableResizable>
</template>

<script setup lang="ts">
import { useCanvasEvents } from '@/composables/useCanvasEvents'
import { debounce } from 'lodash'

const { emitAddOrUpdateImage } = useCanvasEvents()
const props = defineProps<{ image: Image; color: string }>()

const updatePosition = (left: number, top: number) => {
  emitAddOrUpdateImage({ ...props.image, x: left, y: top })
}

const updateSize = (
  left: number,
  top: number,
  width: number,
  height: number
) => {
  emitAddOrUpdateImage({ ...props.image, x: left, y: top, width, height })
}

const debouncedUpdatePosition = debounce(updatePosition, 100)
const debouncedUpdateSize = debounce(updateSize, 100)
</script>
