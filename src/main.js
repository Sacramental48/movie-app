import App from './App.vue';
import router from './router/index';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import VuePlyr from 'vue-plyr'
import VueLazyLoad from 'vue3-lazyload';

// import './vue-plyr/dist/vue-plyr.css'
import './assets/css/main.css'

library.add(fas)

const pinia = createPinia();

createApp(App)
    .component("font-awesome-icon", FontAwesomeIcon)
    .use(VuePlyr, {plyr: {}})
    .use(VueLazyLoad)
    .use(pinia)
    .use(router)
    .mount('#app');
