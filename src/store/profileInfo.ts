import { defineStore } from 'pinia';

import { api } from '../api/api';
import { GetApiUserResponse } from '../api/generated';
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
      try {
        if (this.isData) return;
        const token = getLocalStorage(keyForLocalStorage.tokenAuth);
        if (token === null) return;
        const data = await api.getUserInfo(token);
        this.data = data;
        this.isData = true;
      } catch (e) {
        if (e === 403) {
          const authStore = useAuthStore();
          authStore.logout();
        }
        this.isData = false;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
