<script setup lang="ts">
import type { TypeFilterOptionsInitItem } from '@/general/filter/FilterOptionsInit';

defineProps<{
  title: string;
  titleId: string;
  options: { label: string; id: string }[];
  filterPanelStatus: TypeFilterOptionsInitItem;
}>();
const emit = defineEmits(['checkbox']);
</script>
<template>
  <div>
    <p>{{ title }}</p>
    <div style="display: flex; flex-direction: column">
      <v-checkbox
        v-for="option in options"
        :label="option?.label"
        v-model="((filterPanelStatus as Record<string, boolean>) ?? {})[option?.id as string]"
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
