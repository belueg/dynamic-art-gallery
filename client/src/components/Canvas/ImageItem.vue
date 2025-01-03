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
      class="h-full w-full object-cover border-2"
      :style="{ borderColor: props.color }"
    />
  </VueDraggableResizable>
</template>

<script setup lang="ts">
import { useSocket } from '@/composables/useSocket'
import { debounce } from 'lodash'

const { emitAddOrUpdateImage } = useSocket()
const props = defineProps<{ image: Image, color: string }>()

const updatePosition = (left: number, top: number) => {
  emitAddOrUpdateImage({ ...props.image, x: left, y: top })
}

const updateSize = (
  left: number,
  top: number,
  width: number,
  height: number
) => {
  emitAddOrUpdateImage({ id: props.image.id, x: left, y: top, width, height })
}

const debouncedUpdatePosition = debounce(updatePosition, 100)
const debouncedUpdateSize = debounce(updateSize, 100)
</script>
