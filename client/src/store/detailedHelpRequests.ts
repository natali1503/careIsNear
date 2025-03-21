import { defineStore } from 'pinia';

import { api } from '../api/api';
import type { HelpRequestData } from '../api/generated';
import { keyForLocalStorage } from '../general/constants/keyForLocalStorage';
import { getLocalStorage } from '../general/localStorage/getLocalStorage';

export const useDetailedHelpRequests = defineStore('detailedHelpRequests', {
  state: () => ({
    data: <HelpRequestData>{},
    isLoading: false,
    isError: false,
    isData: false,
  }),
  actions: {
    async getRequestDetails(id: string) {
      if (this.isData) return;
      try {
        this.isLoading = true;
        const token = getLocalStorage(keyForLocalStorage.tokenAuth);
        if (!token) return;
        const data = await api.getRequestDetails(id, token);
        this.data = data;
        this.isData = true;
        this.isError = false;
      } catch (e) {
        this.isError = true;
        this.isData = false;
        throw e;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
