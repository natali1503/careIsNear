import { PluginOptions, POSITION } from 'vue-toastification';

export const optionsToastification: PluginOptions = {
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
