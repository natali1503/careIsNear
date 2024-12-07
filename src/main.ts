import '@mdi/font/css/materialdesignicons.css';
import { createPinia } from 'pinia';
import { createApp } from 'vue';

import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import './style.css';

const pinia = createPinia();
createApp(App).use(pinia).use(router).use(vuetify).mount('#app');
