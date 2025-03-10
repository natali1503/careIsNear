import { config, mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createVuetify } from 'vuetify';

import { api } from '../../src/api/api';
import { keyForLocalStorage } from '../../src/general/constants/keyForLocalStorage';
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
  it('Запрос данных о пользователе', async () => {
    localStorage.setItem(keyForLocalStorage.tokenAuth, 'wegwegwe');
    const token = localStorage.getItem(keyForLocalStorage.tokenAuth);
    const getUserInfoMock = vi.fn().mockResolvedValueOnce(token);
    api.getUserInfo = getUserInfoMock;

    const wrapper = mount(Profile, {
      global: {
        plugins: [vuetify],
      },
    });
    expect(getUserInfoMock).toHaveBeenCalledTimes(1);
  });
});
