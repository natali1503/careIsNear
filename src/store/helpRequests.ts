import { defineStore } from "pinia";

export const useHelpRequests = defineStore("helpRequests", {
  state: () => ({
    isLoading: false,
    isError: false,
    data: [],
  }),
  getters: {},
  actions: {},
});
