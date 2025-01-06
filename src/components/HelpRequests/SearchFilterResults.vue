<script setup lang="ts">
import { GetApiRequestResponse } from '@/api/generated/types.gen';
import { computed, ref } from 'vue';
import Pagination from './Pagination.vue';
import ViewRequests from './ViewRequests.vue';
import ViewSwitchPanel from './ViewSwitchPanel.vue';

const props = defineProps<{
  totalRequests: number;
  helpRequestData: GetApiRequestResponse;
  isError: boolean;
}>();
const selectedViewMode = ref(1);
const currentPage = ref(1);
function onHandleUpdateViewMode(updateViewMode) {
  selectedViewMode.value = updateViewMode;
}
function onHandleChengeCurrentPage(newCurrentPage) {
  currentPage.value = newCurrentPage;
}
const helpRequestDataForPage = computed(() =>
  props.helpRequestData.slice(currentPage.value - 1, currentPage.value + 2),
);
</script>
<template>
  <div style="background-color: #fff; border-radius: 4px; border: 1px solid #e0e0e0; width: 100%; padding: 10px 30px">
    <v-row style="margin: 0; padding: 0; justify-content: space-between; margin-bottom: 20px">
      <p style="font-size: 20px; font-weight: 500">
        Найдено: {{ new Intl.NumberFormat('ru-RU', { style: 'decimal' }).format(totalRequests) }}
      </p>
      <ViewSwitchPanel @updateViewMode="onHandleUpdateViewMode" />
    </v-row>
    <ViewRequests :selectedViewMode="selectedViewMode" :helpRequestDataForPage="helpRequestDataForPage" />
    <v-row style="margin: 0; padding: 30px 0; flex-direction: row; align-items: center; justify-content: center">
      <Pagination
        :currentPage="currentPage"
        :totalRequests="totalRequests"
        @changeCurrentPage="onHandleChengeCurrentPage"
        v-if="!isError"
      />
    </v-row>
  </div>
</template>
<style scoped></style>
