import { defineStore } from 'pinia';
import { api } from '../api/api';
import { addLocalStorage } from '../general/localStorage/addLocalStorage';
import { deleteLocalStorage } from '../general/localStorage/deleteLocalStorage';
import { getLocalStorage } from '../general/localStorage/getLocalStorage';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoading: false,
    isAuth: false,
    isError: false,
  }),
  getters: {},
  actions: {
    async authorization(login: string, password: string) {
      if (this.isAuth) return;
      try {
        this.isLoading = true;
        const token = await api.auth({ login, password });
        if (token) {
          addLocalStorage('tokenAuth', token);
          this.isAuth = true;
          this.isError = false;
        }
      } catch (e) {
        this.isAuth = false;
        this.isError = true;
      } finally {
        this.isLoading = false;
      }
    },
    logout() {
      deleteLocalStorage('tokenAuth');
      this.isAuth = false;
    },
    setIsAuth() {
      if (getLocalStorage('tokenAuth')) this.isAuth = true;
      else this.isAuth = false;
    },
  },
});
