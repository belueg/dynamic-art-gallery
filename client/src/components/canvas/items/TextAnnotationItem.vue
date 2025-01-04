<template>
  <VueDraggableResizable
    :x="annotation.x"
    :y="annotation.y"
    :w="annotation.width"
    :h="annotation.height"
    :parent="true"
    @dragging="updatePosition"
    @resizing="updateSize"
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
import { useCanvasEvents } from '@/composables/useCanvasEvents'
const { emitAddOrUpdateAnnotation } = useCanvasEvents()

const props = defineProps<{
  annotation: Annotation
  color: string
}>()

const editMode = ref(false)
const localText = ref(props.annotation.text)

const saveText = () => {
  const newAnnotation = {
    ...props.annotation,
    text: localText.value
  }
  emitAddOrUpdateAnnotation(newAnnotation)
  editMode.value = false
}

const updatePosition = (x: number, y: number) => {
  emitAddOrUpdateAnnotation({
    ...props.annotation,
    text: localText.value,
    x,
    y
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
    text: localText.value,
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
