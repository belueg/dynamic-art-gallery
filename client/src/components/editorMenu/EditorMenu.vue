<template>
  <div
    ref="editorRef"
    class="inline-flex p-0 mb-4 bg-gray-200 border-b border-gray-300"
  >
    <button @click="openFileUploader" :class="[buttonClass('file'), 'btn-edit-option']">
      <PhotoIcon class="w-5 h-5 mr-2" />
      Insert Image
    </button>
    <FileUploader ref="fileUploader" />

    <button
      @click="setMode('color')"
      :class="[buttonClass('color'), 'relative', 'btn-edit-option']"
    >
      <PaintBrushIcon class="w-5 h-5 mr-2" />
      Change Color
      <ColorPicker v-if="mode === 'color'" />
    </button>

    <button @click="setMode('text')" :class="[buttonClass('text'), 'btn-edit-option']">
      <DocumentTextIcon class="w-5 h-5 mr-2" />
      Insert Text
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import FileUploader from './tools/FileUploader.vue'
import ColorPicker from './tools/ColorPicker.vue'
import { PhotoIcon, PaintBrushIcon, DocumentTextIcon } from '@heroicons/vue/24/solid'
const emit = defineEmits(['updateMode'])
const mode = ref<'text' | 'color' | 'file' | null>(null)
const fileUploader = ref<InstanceType<typeof FileUploader> | null>(null)
const editorRef = ref<HTMLElement | null>(null)

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

const handleClickOutside = (event: MouseEvent) => {
  if (editorRef.value && !editorRef.value.contains(event.target as Node)) {
    if (mode.value !== 'text') {
      setMode(null)
    }
  }
}

const setMode = newMode => {
  mode.value = newMode
  emit('updateMode', newMode)
}

const openFileUploader = () => {
  mode.value = 'file'
  emit('updateMode', mode.value)
  fileUploader.value?.openFilePicker()
}

const buttonClass = (buttonMode: string) => {
  return mode.value === buttonMode
    ? 'bg-blue-500 text-white'
    : 'bg-white text-black border border-gray-300'
}
</script>

<style>
.btn-edit-option {
  @apply px-4 py-2 mr-4 rounded flex items-center;
}
</style>
