import { defineStore } from 'pinia';

import { api } from '../api/api';
import { keyForLocalStorage } from '../general/constants/keyForLocalStorage';
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
          addLocalStorage(keyForLocalStorage.tokenAuth, token);
          this.isAuth = true;
          this.isError = false;
          addLocalStorage(keyForLocalStorage.isAuth, String(this.isAuth));
        }
      } catch (e) {
        this.isAuth = false;
        this.isError = true;
        throw e;
      } finally {
        this.isLoading = false;
      }
    },
    logout() {
      deleteLocalStorage(keyForLocalStorage.tokenAuth);
      this.isAuth = false;
      deleteLocalStorage(keyForLocalStorage.tokenAuth);
    },

    setIsAuth() {
      if (getLocalStorage(keyForLocalStorage.tokenAuth)) this.isAuth = true;
      else this.isAuth = false;
    },
    restoreState() {
      const storedState = localStorage.getItem(keyForLocalStorage.isAuth);
      if (storedState) {
        this.isAuth = JSON.parse(storedState);
      }
    },
  },
});
