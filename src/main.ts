import '@mdi/font/css/materialdesignicons.css';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

import App from './App.vue';
import { optionsToastification } from './plugins/toastification';
import vuetify from './plugins/vuetify';
import router from './router';
import './style.css';

const pinia = createPinia();

createApp(App).use(pinia).use(router).use(vuetify).use(Toast, optionsToastification).mount('#app');
