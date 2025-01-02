<template>
  <div
    ref="editorRef"
    class="inline-flex p-0 mb-8 bg-gray-200 border-b border-gray-300"
  >
    <button @click="openFileUploader" :class="buttonClass('file')">
      Insert Image
    </button>
    <FileUploader ref="fileUploader" />

    <button
      @click="setMode('color')"
      :class="[buttonClass('color'), 'relative']"
    >
      Change Color
      <ColorPicker v-if="mode === 'color'" />
    </button>

    <button @click="setMode('text')" :class="buttonClass('text')">
      Insert Text
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, onMounted, onUnmounted } from 'vue'
import FileUploader from './FileUploader.vue'
import ColorPicker from './ColorPicker.vue'

const emit = defineEmits(['updateMode'])
const mode = ref<'text' | 'color' | 'file' | null>(null)
const fileUploader = ref<InstanceType<typeof FileUploader> | null>(null)
const editorRef = ref<HTMLElement | null>(null)

const handleClickOutside = (event: MouseEvent) => {
  if (editorRef.value && !editorRef.value.contains(event.target as Node)) {
    if (mode.value !== 'text') {
      setMode(null)
    }
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

const setMode = newMode => {
  mode.value = newMode
  console.log('mode', mode.value)
  emit('updateMode', newMode)
}

const openFileUploader = () => {
  mode.value = 'file'
    emit('updateMode', mode.value)
  fileUploader.value?.openFilePicker()
}

const buttonClass = (buttonMode: string) => {
  return mode.value === buttonMode
    ? 'bg-blue-500 text-white px-4 py-2 mr-4 rounded'
    : 'bg-white text-black px-4 py-2 mr-4 rounded border border-gray-300'
}
</script>
