<script setup lang="ts">
import Pagination from '@/components/HelpRequests/Pagination.vue';
import ViewRequests from '@/components/HelpRequests/ViewRequests.vue';
import { useFavouritesRequestsHelp } from '@/store/favouritesRequestsHelp';
import { useHelpRequests } from '@/store/helpRequests';
import { computed, onBeforeMount, ref } from 'vue';

const props = defineProps<{ selectedViewMode: number }>();
const favouritesRequestsHelp = useFavouritesRequestsHelp();
const helpRequests = useHelpRequests();

onBeforeMount(() => {
  helpRequests.getHelpRequests();
  favouritesRequestsHelp.getFavouritesRequestsHelp();
});
const currentPage = ref(1);
const isError = computed(() => helpRequests.isError || favouritesRequestsHelp.isError);
const helpRequestData = computed(() => {
  return favouritesRequestsHelp.favouritesId.map((id) => {
    return helpRequests.data.filter((request) => request.id === id)[0];
  });
});
function onHandleChengeCurrentPage(newCurrentPage) {
  currentPage.value = newCurrentPage;
}
const helpRequestDataForPage = computed(() =>
  helpRequestData.value.slice(currentPage.value - 1, currentPage.value + 2),
);
</script>
<template>
  <ViewRequests :selectedViewMode="selectedViewMode" :helpRequestDataForPage="helpRequestDataForPage" />
  <v-row style="margin: 0; padding: 30px 0; flex-direction: row; align-items: center; justify-content: center">
    <Pagination
      :currentPage="currentPage"
      :totalRequests="helpRequestDataForPage.length"
      @changeCurrentPage="onHandleChengeCurrentPage"
      v-if="!isError"
    />
  </v-row>
</template>
<style scoped></style>
