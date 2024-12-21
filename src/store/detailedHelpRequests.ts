import { defineStore } from 'pinia';

import { api } from '../api/api';
import { HelpRequestData } from '../api/generated';
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
      try {
        this.isLoading = true;
        const token = getLocalStorage(keyForLocalStorage.tokenAuth);
        if (!token) return;
        const data = await api.getRequestDetails(id, token);
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
