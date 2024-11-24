import "vuetify/lib/styles/main.css";
// Импорт стилей
import { createVuetify } from "vuetify"; // Создание экземпляра Vuetify
import { mdi } from "vuetify/iconsets/mdi"; // Иконки Material Design Icons
const customTheme = {
  dark: false, // Укажите `true` для темной темы
  colors: {
    primary: "#1E88E5", // Основной цвет
    secondary: "#FFC107", // Вторичный цвет
    accent: "#82B1FF", // Акцентный цвет
    error: "#FF5252", // Цвет ошибок
    info: "#1E88E5", // Информационный цвет
    success: "#4CAF50", // Цвет успеха
    warning: "#FFC107", // Цвет предупреждений
  },
};

const vuetify = createVuetify({
  theme: {
    defaultTheme: "customTheme",
    themes: {
      customTheme,
    },
  },
  icons: {
    defaultSet: "mdi",

    sets: {
      mdi,
    },
  },
});

export default vuetify;
