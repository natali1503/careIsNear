<script setup lang="ts">
defineProps<{ statusFilter: string; isFilter: boolean; mobile: boolean }>();
const emit = defineEmits(['changeStatusFilter', 'resetFilter']);
const StatusFilter = { open: 'open', close: 'close' };
</script>
<template>
  <div class="titleFilter">
    <div class="title">
      <v-btn
        text="Фильтрация"
        @click="() => emit('changeStatusFilter')"
        class="btnFilter"
        :append-icon="mobile ? (statusFilter === StatusFilter.close ? 'mdi-chevron-down' : 'mdi-chevron-up') : ''"
        size="large"
      />
    </div>
    <v-btn
      density="default"
      :disabled="!isFilter"
      @click="() => emit('resetFilter')"
      icon="mdi mdi-filter-variant-remove"
      size="small"
      class="iconBtn"
      :style="{ display: mobile ? 'flex' : 'none' }"
    />
  </div>
</template>
<style scoped>
.titleFilter {
  display: flex;
  flex-direction: row;
  gap: 5px;
}
.title {
  flex: 1;
  display: flex;
  flex-direction: row;
}
.iconBtn {
  box-shadow: none;
  justify-content: center;
}
.iconBtn ::v-deep(.v-btn__overlay) {
  background-color: transparent;
}
.iconBtn:hover {
  background-color: rgba(0, 0, 0, 0.05);
}
.btnFilter {
  width: 100%;
  padding: 0;
  text-transform: none;
  box-shadow: none;
  font-size: 20px;
  font-weight: 500;
  line-height: 32px;
  display: flex;
  justify-content: space-between;
}
</style>
