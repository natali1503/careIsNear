import { defineStore } from 'pinia';
import { getLocalStorage } from '../general/localStorage/getLocalStorage';
import { api } from '../api/api';
import { GetApiRequestResponse } from '../api/generated/types.gen';

export const useHelpRequests = defineStore('helpRequests', {
  state: () => ({
    isLoading: false,
    isError: false,
    data: <GetApiRequestResponse>[],
  }),
  getters: {},
  actions: {
    async getHelpRequests() {
      try {
        if (this.data.length !== 0) return;
        this.isLoading = true;
        const token = getLocalStorage('tokenAuth');
        if (token === null) return;
        const data = await api.getRequests(token);
        this.data = data;
      } catch (e) {
        this.isError = true;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
