import { defineStore } from 'pinia';

import { api } from '../api/api';
import { GetApiUserResponse } from '../api/generated';

export const useProfileInfo = defineStore('profileInfo', {
  state: () => ({
    isLoading: false,
    isData: false,
    data: <GetApiUserResponse>{},
  }),
  actions: {
    async getProfileInfo() {
      try {
        const data = await api.getUserInfo();
      } catch (e) {
        console.log(e);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
