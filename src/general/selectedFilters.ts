import { ref } from 'vue';

export type SingleObject = { [key: string]: string[] };
export type NestedObject = { [key: string]: SingleObject };

export const selectedFilters = ref<SingleObject | NestedObject>({});
