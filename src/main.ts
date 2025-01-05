import '@mdi/font/css/materialdesignicons.css';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import Toast, { PluginOptions, POSITION } from 'vue-toastification';
import 'vue-toastification/dist/index.css';

import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import './style.css';

const pinia = createPinia();
const options: PluginOptions = {
  position: POSITION.BOTTOM_RIGHT,
  timeout: 2984,
  closeOnClick: true,
  pauseOnFocusLoss: false,
  pauseOnHover: false,
  draggable: false,
  draggablePercent: 1.78,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: 'button',
  icon: true,
  rtl: false,
};
createApp(App).use(pinia).use(router).use(vuetify).use(Toast, options).mount('#app');
