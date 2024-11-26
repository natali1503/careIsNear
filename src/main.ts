import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './style.css';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import '@mdi/font/css/materialdesignicons.css';
import router from './router';

const pinia = createPinia();
createApp(App).use(pinia).use(router).use(vuetify).mount('#app');
