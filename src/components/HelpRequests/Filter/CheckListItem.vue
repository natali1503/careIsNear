<script setup lang="ts">
import { IFilterOptions } from '@/general/filterOptions';
import { selectedFilters } from '@/general/selectedFilters';
import { watch } from 'vue';

const prop = defineProps<{
  title: string;
  titleId: string;
  options: { label: string; id: string }[];
  filterPanelStatus: IFilterOptions;
}>();
const emit = defineEmits(['checkbox']);
function onChange() {
  // option.id;
}

watch(
  () => selectedFilters.value,
  () => {
    console.log(selectedFilters.value);
  },
  { deep: true },
);
</script>
<template>
  <div>
    <p>{{ title }}</p>
    <div style="display: flex; flex-direction: column">
      <v-checkbox
        v-for="option in options"
        :label="option.label"
        v-model="filterPanelStatus[option.id]"
        @change="
          () => {
            emit('checkbox', option.id);
          }
        "
      ></v-checkbox>
    </div>
  </div>
</template>
<style scoped>
::v-deep(.v-input--density-default) {
  height: 42px;
}
</style>
