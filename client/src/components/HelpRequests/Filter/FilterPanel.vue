<script setup lang="ts">
import { ref, watch } from 'vue';

import type { TypeFilterOptionsInit } from '@/general/filter/FilterOptionsInit';
import BodyFilter from './BodyFilter.vue';
import TitleFilter from './TitleFilter.vue';

const props = defineProps<{ filterPanelStatus: TypeFilterOptionsInit; isFilter: boolean; mobile: boolean }>();
const emit = defineEmits(['updateFilter', 'resetFilter']);

const StatusFilter = { open: 'open', close: 'close' };
const statusFilter = ref(props.mobile ? StatusFilter.close : StatusFilter.open);

function handleChangeStatusFilter() {
  const currentValue = statusFilter.value;
  const newValue = currentValue === StatusFilter.open ? StatusFilter.close : StatusFilter.open;
  statusFilter.value = newValue;
}

watch(
  () => props.mobile,
  () => {
    statusFilter.value = props.mobile ? StatusFilter.close : StatusFilter.open;
  },
);
</script>
<template>
  <div class="filterPanel">
    <TitleFilter
      :statusFilter="statusFilter"
      :isFilter="isFilter"
      :mobile="mobile"
      @changeStatusFilter="handleChangeStatusFilter"
      @resetFilter="() => emit('resetFilter')"
    />
    <BodyFilter
      :isFilter="isFilter"
      :filterPanelStatus="filterPanelStatus"
      @updateFilter="(value) => emit('updateFilter', value)"
      @resetFilter="() => emit('resetFilter')"
      v-if="statusFilter === StatusFilter.open"
    />
  </div>
</template>
<style scoped>
.filterPanel {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #e0e0e0;
  padding: 20px 20px;
  width: 100%;
  height: max-content;
}
.headerFilter {
  display: flex;
  flex-direction: row;
  gap: 5px;
}
.title {
  font-weight: 500;
  font-size: 20px;
  line-height: 32px;
  flex: 1;
}

.iconBtn {
  box-shadow: none;
}
.iconBtn ::v-deep(.v-btn__overlay) {
  background-color: transparent;
}
.iconBtn:hover {
  background-color: rgba(0, 0, 0, 0.05);
}
.btnFilter {
  width: 100%;
  box-shadow: none;
  justify-content: space-between;
}
</style>
