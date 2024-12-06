import { createVuetify } from 'vuetify';
import 'vuetify/styles'; // Подключите стили Vuetify

const vuetify = createVuetify();

global.vuetify = vuetify; // Сделать доступным в глобальной области

import '@testing-library/jest-dom'; // Утилиты для тестирования DOM
