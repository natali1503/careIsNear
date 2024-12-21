<script setup lang="ts">
import { GetApiRequestResponse } from '@/api/generated/types.gen';
import { VIEW_MODES } from '@/general/constants/viewModes';
import { computed, ref } from 'vue';
import GridItem from './HelpCard/GridItem.vue';
import ListItem from './HelpCard/ListItem.vue';
import MapHelpRequests from './HelpCard/MapHelpRequests.vue';
import Pagination from './Pagination.vue';
import ViewSwitchPanel from './ViewSwitchPanel.vue';

const props = defineProps<{ totalRequests: number; helpRequestData: GetApiRequestResponse; favouritesId: string[] }>();
const selectedViewMode = ref(1);
const currentPage = ref(1);
function onHandleUpdateViewMode(updateViewMode) {
  selectedViewMode.value = updateViewMode;
}
function onHandleChengeCurrentPage(newCurrentPage) {
  currentPage.value = newCurrentPage;
}
const helpRequestDataForPage = computed(() => props.helpRequestData.slice(currentPage.value, currentPage.value + 3));
</script>
<template>
  <div style="background-color: #fff; border-radius: 4px; border: 1px solid #e0e0e0; width: 100%; padding: 10px 30px">
    <v-row style="margin: 0; padding: 0; justify-content: space-between; margin-bottom: 20px">
      <p>Найдено: {{ new Intl.NumberFormat('ru-RU', { style: 'decimal' }).format(totalRequests) }}</p>
      <ViewSwitchPanel @updateViewMode="onHandleUpdateViewMode" />
    </v-row>
    <v-row style="margin: 0; padding: 0">
      <GridItem v-if="VIEW_MODES[selectedViewMode] === VIEW_MODES[0]" />

      <ListItem
        v-for="helpRequestDataIteam in helpRequestDataForPage"
        v-if="VIEW_MODES[selectedViewMode] === VIEW_MODES[1]"
        :helpRequestDataIteam="helpRequestDataIteam"
        :isFavourites="favouritesId.includes(helpRequestDataIteam.id)"
      />
      <MapHelpRequests v-if="VIEW_MODES[selectedViewMode] === VIEW_MODES[2]" />
    </v-row>
    <v-row style="margin: 0; padding: 30px 0; flex-direction: row; align-items: center; justify-content: center">
      <Pagination
        :currentPage="currentPage"
        :totalRequests="totalRequests"
        @changeCurrentPage="onHandleChengeCurrentPage"
      />
    </v-row>
  </div>
</template>
<style scoped></style>
