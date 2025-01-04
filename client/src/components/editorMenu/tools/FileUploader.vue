<template>
  <div>
    <input
      ref="fileInput"
      type="file"
      multiple
      accept="image/*"
      class="hidden"
      @change="handleFileUpload"
      id="file-upload"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCanvasEvents } from '@/composables/useCanvasEvents'

const { emitAddOrUpdateImage } = useCanvasEvents()

const fileInput = ref<HTMLInputElement | null>(null)

const openFilePicker = () => {
  fileInput.value?.click()
}

defineExpose({ openFilePicker })

const handleFileUpload = (event: Event) => {
  const files = (event.target as HTMLInputElement).files

  if (files) {
    Array.from(files).forEach(file => {
      const reader = new FileReader()
      reader.onload = () => {
        const img = new Image()
        img.onload = () => {
          const id = Date.now().toString()
          const width = 50
          const height = 50

          emitAddOrUpdateImage({
            id,
            src: reader.result as string,
            width,
            height
          })
        }
        img.src = reader.result as string
      }
      reader.readAsDataURL(file)
    })
    if (fileInput.value) fileInput.value.value = ''
  }
}
</script>
