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
      if (this.isData) return;
      try {
        this.isLoading = true;
        if (this.favouritesId.length > 0) return;
        const token = getLocalStorage(keyForLocalStorage.tokenAuth);
        if (!token) return;
        const data = await api.getUserFavourites(token);
        this.favouritesId = data;
        this.isData = true;
        this.isError = false;
      } catch (e) {
        this.isData = false;
        this.isError = true;
        throw e;
      } finally {
        this.isLoading = false;
      }
    },
    async addRequestHelp(id: string) {
      try {
        if (this.favouritesId.includes(id)) return;
        const token = getLocalStorage(keyForLocalStorage.tokenAuth);
        if (!token) return;
        await api.addToFavourites(id, token);
        this.favouritesId.push(id);
      } catch (e) {
        throw e;
      } finally {
      }
    },
    async removeRequestHelp(id: string) {
      try {
        const token = getLocalStorage(keyForLocalStorage.tokenAuth);
        if (!token) return;
        await api.removeFromFavourites(id, token);
        this.favouritesId = this.favouritesId.filter((idRequest) => idRequest !== id);
      } catch (e) {
        throw e;
      } finally {
      }
    },
  },
});
