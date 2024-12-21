import { defineStore } from 'pinia';

import { api } from '../api/api';
import { GetApiRequestResponse } from '../api/generated/types.gen';
import { keyForLocalStorage } from '../general/constants/keyForLocalStorage';
import { getLocalStorage } from '../general/localStorage/getLocalStorage';

export const useHelpRequests = defineStore('helpRequests', {
  state: () => ({
    isLoading: false,
    isError: false,
    data: <GetApiRequestResponse>[],
    isData: false,
  }),
  getters: {},
  actions: {
    async getHelpRequests() {
      try {
        if (this.data.length !== 0) return;
        this.isLoading = true;
        const token = getLocalStorage(keyForLocalStorage.tokenAuth);
        if (token === null) return;
        const data = await api.getRequests(token);
        this.data = data;
        this.isData = true;
      } catch (e) {
        this.isError = true;
        this.isData = false;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
