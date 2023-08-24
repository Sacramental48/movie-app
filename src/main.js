import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import { createPinia } from 'pinia'
import './assets/css/main.css'

const pinia = createPinia();

createApp(App).use(pinia).use(router).mount('#app')
