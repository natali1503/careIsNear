import { ref } from 'vue';

export const selectedFilters = ref<{ [key: string]: string[] } | {}>({});
