<template>
  <div :style="{ position: 'absolute', left: `${x}px`, top: `${y}px` }" class="annotation-editor p-4 bg-white border border-border rounded shadow-lg">
    <textarea v-model="text" @blur="save" @keydown.enter.prevent="save" class="w-full h-20 p-2 border border-gray-300 rounded resize-none"></textarea>
    <div class="flex justify-end mt-2">
      <button @click="save" class="bg-blue-500 text-white px-4 py-2 mr-4 rounded">Save</button>
      <button @click="emit('close')" class="bg-white text-black px-4 py-2 mr-4 rounded border border-gray-300">Cancel</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'

defineProps<{ x: number; y: number }>()
const emit = defineEmits(['save', 'close'])

const text = ref('')

const save = () => {
  if (!text.value) return
  emit('save', text.value)
  text.value = ''
}
</script>

<style scoped>
.annotation-editor {
  z-index: 1000;
}
</style>