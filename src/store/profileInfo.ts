import { defineStore } from 'pinia';

import { api } from '../api/api';
import type { GetApiUserResponse } from '../api/generated';
import { keyForLocalStorage } from '../general/constants/keyForLocalStorage';
import { getLocalStorage } from '../general/localStorage/getLocalStorage';

import { useAuthStore } from './auth';

export const useProfileInfo = defineStore('profileInfo', {
  state: () => ({
    isLoading: false,
    isData: false,
    isError: false,
    data: <GetApiUserResponse>{},
  }),
  actions: {
    async getProfileInfo() {
      if (this.isData) return;
      try {
        const token = getLocalStorage(keyForLocalStorage.tokenAuth);
        if (token === null) return;
        const data = await api.getUserInfo(token);
        this.data = data;
        this.isData = true;
        this.isError = false;
      } catch (e) {
        this.isError = true;
        this.isData = false;
        if (e === 403) {
          const authStore = useAuthStore();
          authStore.logout();
        } else if (e === 500) {
          throw e;
        }
      } finally {
        this.isLoading = false;
      }
    },
  },
});
