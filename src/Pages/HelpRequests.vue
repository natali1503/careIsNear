<script setup lang="ts">
import FilterPanel from '@/components/Filter/FilterPanel.vue';
import PageTemplate from '@/components/PageTemplate.vue';
import SearchBar from '@/components/SearchBar/SearchBar.vue';
import SearchFilterResults from '@/components/SearchFilterResults.vue';
import { useFavouritesRequestsHelp } from '@/store/favouritesRequestsHelp';
import { onBeforeMount } from 'vue';
import { useHelpRequests } from '../store/helpRequests';

const helpRequests = useHelpRequests();
const favouritesRequestsHelp = useFavouritesRequestsHelp();

onBeforeMount(() => {
  helpRequests.getHelpRequests();
  favouritesRequestsHelp.getFavouritesRequestsHelp();
});
</script>
<template>
  <PageTemplate title="Запросы о помощи">
    <v-col cols="2" style="margin: 0; padding: 0; padding-right: 20px">
      <FilterPanel />
    </v-col>
    <v-col style="margin: 0; padding: 0">
      <v-row style="margin: 0; padding: 0; margin-bottom: 30px">
        <SearchBar />
      </v-row>
      <v-row style="margin: 0; padding: 0">
        <SearchFilterResults
          v-if="helpRequests.isData"
          :helpRequestData="helpRequests.data"
          :totalRequests="helpRequests.isData ? helpRequests.data.length : 0"
          :favouritesId="favouritesRequestsHelp.favouritesId"
        />
      </v-row>
    </v-col>
  </PageTemplate>
</template>
<style scoped></style>
