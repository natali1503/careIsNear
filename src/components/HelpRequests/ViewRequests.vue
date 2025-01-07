<script setup lang="ts">
import { VIEW_MODES } from '@/general/constants/viewModes';
import { useFavouritesRequestsHelp } from '@/store/favouritesRequestsHelp';
import { useHelpRequests } from '@/store/helpRequests';
import { computed } from 'vue';
import Loading from '../Loading.vue';
import NoDataError from '../NoDataError.vue';
import NotFoundResult from '../NotFoundResult.vue';
import GridItem from './HelpCard/GridItem.vue';
import ListItem from './HelpCard/ListItem.vue';
import MapHelpRequests from './HelpCard/MapHelpRequests.vue';

const props = defineProps<{
  selectedViewMode;
  helpRequestDataForPage;
}>();
const helpRequests = useHelpRequests();
const favouritesRequestsHelp = useFavouritesRequestsHelp();
const isLoading = computed(() => helpRequests.isLoading || favouritesRequestsHelp.isLoading);
const isError = computed(() => helpRequests.isError || favouritesRequestsHelp.isError);
const totalRequests = computed(() => (helpRequests.isData ? props.helpRequestDataForPage.length : 0));
</script>
<template>
  <v-row style="margin: 0; padding: 0">
    <Loading v-if="isLoading" />
    <NoDataError v-if="!isLoading && isError" text="Ошибка! Не удалось загрузить информацию" />
    <NotFoundResult v-if="totalRequests === 0 && !isError && !isLoading" text="Запросы не найдены" />
    <div v-if="helpRequests.isData && favouritesRequestsHelp.isData">
      <GridItem v-if="VIEW_MODES[selectedViewMode] === VIEW_MODES[0]" />

      <ListItem
        v-for="helpRequestDataIteam in helpRequestDataForPage"
        v-if="VIEW_MODES[selectedViewMode] === VIEW_MODES[1]"
        :helpRequestDataIteam="helpRequestDataIteam"
        :isFavourites="favouritesRequestsHelp.favouritesId.includes(helpRequestDataIteam.id)"
      />

      <MapHelpRequests v-if="VIEW_MODES[selectedViewMode] === VIEW_MODES[2]" />
    </div>
  </v-row>
</template>
<style scoped></style>
