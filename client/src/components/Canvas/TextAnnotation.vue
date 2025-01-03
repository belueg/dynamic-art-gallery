<template>
  <VueDraggableResizable
    :x="annotation.x"
    :y="annotation.y"
    :w="annotation.width"
    :h="annotation.height"
    :parent="true"
    @dragging="(left, top) => updatePosition(left, top)"
    @resizing="
      (left, top, width, height) => updateSize(left, top, width, height)
    "
    @click.stop
  >
    <div
      @dblclick="editMode = true"
      v-if="!editMode"
      :style="{ color: props.color }"
      class="annotation-text border w-full h-full border-border rounded bg-white overflow-hidden"
    >
      {{ annotation.text }}
    </div>

    <textarea
      v-else
      v-model="localText"
      @keydown.enter.prevent="saveText"
      class="annotation-textarea w-full h-full p-2 border border-gray-300 rounded resize-none"
    ></textarea>
  </VueDraggableResizable>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useSocket } from '@/composables/useSocket'
const { emitAddOrUpdateAnnotation } = useSocket()

const props = defineProps<{
  annotation: {
    id: string
    text: string
    x: number
    y: number
    width: number
    height: number
  }
  color: string
}>()

const editMode = ref(false)
const localText = ref(props.annotation.text)

const saveText = () => {
  const newAnnotation = {
    id: props.annotation.id,
    text: localText.value,
    x: props.annotation.x,
    y: props.annotation.y,
    width: props.annotation.width,
    height: props.annotation.height
  }
  emitAddOrUpdateAnnotation(newAnnotation)
  editMode.value = false
}

const updatePosition = (x: number, y: number) => {
  emitAddOrUpdateAnnotation({
    id: props.annotation.id,
    text: localText.value,
    x,
    y,
    width: props.annotation.width,
    height: props.annotation.height
  })
}

const updateSize = (
  left: number,
  top: number,
  width: number,
  height: number
) => {
  emitAddOrUpdateAnnotation({
    id: props.annotation.id,
    x: left,
    y: top,
    width,
    height
  })
}
</script>

<style scoped>
.annotation-text {
  @apply text-secondary bg-white border border-border p-2 rounded;
}

.annotation-textarea {
  @apply w-full h-full p-2 border border-gray-300 rounded resize-none;
}
</style>
