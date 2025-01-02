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
import { ref, defineExpose } from 'vue'
import { useSocket } from '@/composables/useSocket'
const { emitAddImage } = useSocket()

const fileInput = ref<HTMLInputElement | null>(null)

const openFilePicker = () => {
  fileInput.value?.click()
}
defineExpose({ openFilePicker })

const handleFileUpload = (event: Event) => {
  console.log('handleFileUpload ~ event:', event)
  const files = (event.target as HTMLInputElement).files

  console.log('handleFileUpload ~ files:', files)

  if (files) {
    Array.from(files).forEach(file => {
      const reader = new FileReader()
      reader.onload = () => {
        const img = new Image()
        img.onload = () => {
          const id = Date.now().toString()
          const width = 50
          const height = 50
          console.log(
            'Array.from ~ { id, src: reader.result as string, width, height }:',
            {
              id,
              src: reader.result as string,
              width,
              height
            }
          )
          emitAddImage({ id, src: reader.result as string, width, height })
        }
        img.src = reader.result as string
      }
      reader.readAsDataURL(file)
    })
    if (fileInput.value) fileInput.value.value = ''
  }
}
</script>
