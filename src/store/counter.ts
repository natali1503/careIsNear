import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  getters: {
    isPositiv(state) {
      return state.count > 0 ? true : false;
    },
  },
  actions: {
    increment() {
      this.count++;
    },
  },
});
