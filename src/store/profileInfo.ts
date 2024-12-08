import { defineStore } from 'pinia';

import { api } from '../api/api';
import { GetApiUserResponse } from '../api/generated';
import { getLocalStorage } from '../general/localStorage/getLocalStorage';

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
        const token = getLocalStorage('tokenAuth');
        if (token === null) return;
        const data = await api.getUserInfo(token);
        this.data = data;
        this.isData = true;
      } catch (e) {
        console.log(e);
        this.isData = false;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
