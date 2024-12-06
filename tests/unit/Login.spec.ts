import { mount, config } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import Login from '../../src/Pages/Login.vue';
import { api } from '../../src/api/api';
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../../src/store/auth';
describe('Login', () => {
  const vuetify = createVuetify();
  config.global.plugins = [vuetify];
  beforeEach(() => {
    // Создаём новое хранилище перед каждым тестом
    const pinia = createPinia();
    setActivePinia(pinia);
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('Наличие формы авторизации', () => {
    const wrapper = mount(Login, {
      global: {
        plugins: [vuetify],
      },
    });
    expect(wrapper.find("input[placeholder='Введите e-mail']").exists()).toBe(true);
    expect(wrapper.find("input[placeholder='Введите пароль']").exists()).toBe(true);
    expect(wrapper.find('button').text()).toBe('Войти');
  });
  it('Обновление полей формы', async () => {
    const wrapper = mount(Login);
    const loginInput = wrapper.find("input[placeholder='Введите e-mail']");
    const passwordInput = wrapper.find("input[placeholder='Введите пароль']");
    await loginInput.setValue('testLogin');
    await passwordInput.setValue('testPassword');
    expect((loginInput.element as HTMLInputElement).value).toBe('testLogin');
    expect((passwordInput.element as HTMLInputElement).value).toBe('testPassword');
  });
  // it("Проверка вызова функции входа ", async () => {});

  it('Должен сохранять токен в localStorage при авторизации', async () => {
    const router = createRouter({
      history: createWebHistory(),
      routes: [{ path: '/help-requests', name: 'helpRequests', component: { template: '<div>Help Requests</div>' } }],
    });
    router.push = vi.fn();
    //given
    api.auth = vi.fn().mockResolvedValueOnce('wegwegwe');
    const wrapper = mount(Login, {
      global: {
        plugins: [router],
      },
    });
    const loginInput = wrapper.find("input[placeholder='Введите e-mail']");
    const passwordInput = wrapper.find("input[placeholder='Введите пароль']");

    //when
    await loginInput.setValue('testLogin');
    await passwordInput.setValue('testPassword');
    await wrapper.find('button').trigger('click');

    //then
    expect(api.auth).toHaveBeenCalledTimes(1);
    expect(api.auth).toHaveBeenCalledWith({
      login: 'testLogin',
      password: 'testPassword',
    });
    expect(localStorage.getItem('tokenAuth')).toBe('wegwegwe');
  });

  it('Маршрутизация на helpRequests после успешной авторизации', async () => {
    const router = createRouter({
      history: createWebHistory(),
      routes: [{ path: '/help-requests', name: 'helpRequests', component: { template: '<div>Help Requests</div>' } }],
    });
    router.push = vi.fn();
    //given
    api.auth = vi.fn().mockResolvedValueOnce('wegwegwe');
    const wrapper = mount(Login, {
      global: {
        plugins: [router], // Подключаем роутер
      },
    });
    const loginInput = wrapper.find("input[placeholder='Введите e-mail']");
    const passwordInput = wrapper.find("input[placeholder='Введите пароль']");
    //when
    await loginInput.setValue('testLogin');
    await passwordInput.setValue('testPassword');
    await wrapper.find('button').trigger('click');

    //then
    expect(router.push).toHaveBeenCalledTimes(1);
    expect(router.push).toHaveBeenCalledWith('helpRequests');
  });
  // it('Обратка ошибки', async () => {
  //   //given
  //   api.auth = vi.fn().mockRejectedValueOnce(new Error());
  //   const wrapper = mount(Login);
  //   const loginInput = wrapper.find("input[placeholder='Введите e-mail']");
  //   const passwordInput = wrapper.find("input[placeholder='Введите пароль']");
  //   //when
  //   await loginInput.setValue('testLogin');
  //   await passwordInput.setValue('testPassword');
  //   await wrapper.find('button').trigger('click');
  //   //then
  //   expect(api.auth).toHaveBeenCalledTimes(1);
  //   // const errorDiv = wrapper.find('.error');
  //   // expect(errorDiv.exists()).toBe(true);
  // });
});
