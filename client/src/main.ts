import './assets/index.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueDraggableResizable from 'vue-draggable-resizable'
import Vue3TouchEvents from 'vue3-touch-events'
import App from './App.vue'
import router from './router'
import { useSocket } from '@/composables/useSocket'

const app = createApp(App)

app.component('VueDraggableResizable', VueDraggableResizable)
app.use(createPinia())
app.use(router)
app.use(Vue3TouchEvents, {
  disableClick: false
})

app.mount('#app')

