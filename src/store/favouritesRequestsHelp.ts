import { defineStore } from 'pinia';

import { api } from '../api/api';
import { keyForLocalStorage } from '../general/constants/keyForLocalStorage';
import { getLocalStorage } from '../general/localStorage/getLocalStorage';

export const useFavouritesRequestsHelp = defineStore('favouritesRequestsHelp', {
  state: () => ({
    isLoading: false,
    isData: false,
    isError: false,
    favouritesId: <string[]>[],
  }),
  actions: {
    async getFavouritesRequestsHelp() {
      if (this.favouritesId.length > 0) return;
      const token = getLocalStorage(keyForLocalStorage.tokenAuth);
      if (!token) return;
      const data = await api.getUserFavourites(token);
      this.favouritesId = data;
    },
  },
});
