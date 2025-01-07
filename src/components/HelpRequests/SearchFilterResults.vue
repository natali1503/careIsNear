<script setup lang="ts">
import { GetApiRequestResponse } from '@/api/generated/types.gen';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Pagination from './Pagination.vue';
import ViewRequests from './ViewRequests.vue';
import ViewSwitchPanel from './ViewSwitchPanel.vue';

const props = defineProps<{
  totalRequests: number;
  helpRequestData: GetApiRequestResponse;
  isError: boolean;
}>();
const route = useRoute();
const selectedViewMode = ref(1);
const router = useRouter();
const currentPage = ref(Number(route.query.page) || 1);
function onHandleUpdateViewMode(updateViewMode) {
  selectedViewMode.value = updateViewMode;
}

function onHandleChengeCurrentPage(newCurrentPage) {
  currentPage.value = newCurrentPage;
  const currentQuery = { ...router.currentRoute.value.query };
  router.replace({ query: { ...currentQuery, page: String(newCurrentPage) } });
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
        v-if="!isError && helpRequestDataForPage.length > 0"
      />
    </v-row>
  </div>
</template>
<style scoped></style>
