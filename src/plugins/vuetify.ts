import 'vuetify/lib/styles/main.css';
// Импорт стилей
import { createVuetify } from 'vuetify'; // Создание экземпляра Vuetify
import { mdi } from 'vuetify/lib/iconsets/mdi.mjs';
// Иконки Material Design Icons
const customTheme = {
  dark: false, // Укажите `true` для темной темы
  colors: {
    primary: '#1E88E5', // Основной цвет
    secondary: '#FFC107', // Вторичный цвет
    accent: '#82B1FF', // Акцентный цвет
    error: '#FF5252', // Цвет ошибок
    info: '#1E88E5', // Информационный цвет
    success: '#4CAF50', // Цвет успеха
    warning: '#FFC107', // Цвет предупреждений
  },
};

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'customTheme',
    themes: {
      customTheme,
      // variables: {
      //   "font-size-root": "16px",
      //   "font-size-h1": "24px",
      //   "font-size-h2": "20px",
      //   "font-size-h3": "18px",
      //   "font-size-body-1": "16px",
      //   "font-size-body-2": "14px",
      // },
    },
  },

  display: {
    mobileBreakpoint: 'md',
  },
  icons: {
    defaultSet: 'mdi',

    sets: {
      mdi,
    },
  },
});

export default vuetify;
