<template>
  <Sketch
    class="top-[100%] left-[50%] z-10 sketch"
    v-model="colors"
    @update:modelValue="updateColor"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Sketch } from '@ckpack/vue-color'
import { useCanvasEvents } from '@/composables/useCanvasEvents'

const colors = ref({ hex: '#000000', rgba: { r: 0, g: 0, b: 0, a: 1 } })

const { emitUpdateColorTheme } = useCanvasEvents()

const updateColor = () => {
  if (colors.value.hex) {
    emitUpdateColorTheme(colors.value.hex)
  }
}
</script>

<style>
.sketch {
  position: absolute !important;
}
</style>
