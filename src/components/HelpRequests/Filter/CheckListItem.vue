<script setup lang="ts">
import { TypeFilterOptionsInitItem } from '@/general/filter/FilterOptionsInit';
import { IFilterOptions } from '@/general/filterOptions';
import { selectedFilters } from '@/general/selectedFilters';
import { watch } from 'vue';

const prop = defineProps<{
  title: string;
  titleId: string;
  options: { label: string; id: string }[];
  filterPanelStatus: TypeFilterOptionsInitItem;
}>();
const emit = defineEmits(['checkbox']);
function onChange() {
  // option.id;
}
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
