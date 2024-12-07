import { config, mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createVuetify } from 'vuetify';

import { api } from '../../src/api/api';
import Profile from '../../src/Pages/Profile.vue';

describe('Profile', () => {
  const vuetify = createVuetify();
  config.global.plugins = [vuetify];
  beforeEach(() => {
    // Создаём новое хранилище перед каждым тестом
    const pinia = createPinia();
    setActivePinia(pinia);
    vi.clearAllMocks();
    localStorage.clear();
  });
  it('Запрос данных о пользователе', () => {
    api.getUserInfo = vi.fn();
    const wrapper = mount(Profile, {
      global: {
        plugins: [vuetify],
      },
    });
    expect(api.getUserInfo).toHaveBeenCalledTimes(1);
  });
});
