import { defineStore } from "pinia";
import { api } from "../api/api";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isLoading: false,
    isAuth: false,
  }),
  getters: {},
  actions: {
    async authorization(login: string, password: string) {
      // "testUser15@test.com", "password15"
      try {
        await api.auth({ login, password });
      } catch (e) {
        console.log(2432);
      } finally {
      }
    },
  },
});
