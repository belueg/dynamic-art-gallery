<template>
  <EditorMenu @updateMode="updateMode" />
  <p class="text-lg mb-2">
    To edit an annotation, click on the desired text and press enter to save
    when you are done.
  </p>
  <p
    :style="{ visibility: mode === 'text' ? 'visible' : 'hidden' }"
    class="text-lg text-blue-600 mb-2"
  >
    Click on the canvas to insert text
  </p>

  <div
    class="relative border border-gray-300 bg-gray-100 h-[44rem] w-full"
    @click="handleCanvasClick"
  >
    <ImageItem
      v-for="image in canvasState.images"
      :color="canvasState.themeColor"
      :key="image.id"
      :image="image"
      @update-position="emitAddOrUpdateImage"
      @click.stop
    />
    <TextAnnotationItem
      v-for="annotation in canvasState.annotations"
      :key="annotation.id"
      :color="canvasState.themeColor"
      :annotation="annotation"
      @click.stop
    />
    <AnnotationEditor
      v-if="showEditor && mode === 'text'"
      :x="editorX"
      :y="editorY"
      @save="saveAnnotation"
      @close="closeEditor"
      @click.stop
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ImageItem from './items/ImageItem.vue'
import TextAnnotationItem from './items/TextAnnotationItem.vue'
import AnnotationEditor from '../editorMenu/tools/AnnotationEditor.vue'
import EditorMenu from '../editorMenu/EditorMenu.vue'
import { useCanvasState } from '@/composables/useCanvasState'
import { useCanvasEvents } from '@/composables/useCanvasEvents'

const showEditor = ref(false)
const editorX = ref(0)
const editorY = ref(0)
const mode = ref('')

const { canvasState } = useCanvasState()
const { emitAddOrUpdateAnnotation, emitAddOrUpdateImage } = useCanvasEvents()

const updateMode = (newMode: string) => (mode.value = newMode)

const handleCanvasClick = (event: MouseEvent) => {
  if (mode.value === 'text') {
    editorX.value = event.offsetX
    editorY.value = event.offsetY
    showEditor.value = true
  }
}

const saveAnnotation = (text: string) => {
  const id = Date.now()
  if (!text) return
  emitAddOrUpdateAnnotation({
    id,
    text,
    x: editorX.value,
    y: editorY.value,
    width: 100,
    height: 50
  })
  showEditor.value = false
}

const closeEditor = () => {
  showEditor.value = false
}
</script>

<style>
@import 'vue-draggable-resizable/style.css';
</style>
