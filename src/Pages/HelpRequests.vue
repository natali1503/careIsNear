<script setup lang="ts">
import PageTemplate from '@/components/PageTemplate.vue';

import FilterPanel from '@/components/HelpRequests/Filter/FilterPanel.vue';
import SearchBar from '@/components/HelpRequests/SearchBar/SearchBar.vue';
import SearchFilterResults from '@/components/HelpRequests/SearchFilterResults.vue';
import { useFavouritesRequestsHelp } from '@/store/favouritesRequestsHelp';
import { computed, onBeforeMount } from 'vue';
import { useHelpRequests } from '../store/helpRequests';

const helpRequests = useHelpRequests();
const favouritesRequestsHelp = useFavouritesRequestsHelp();

onBeforeMount(() => {
  helpRequests.getHelpRequests();
  favouritesRequestsHelp.getFavouritesRequestsHelp();
});
const isError = computed(() => helpRequests.isError || favouritesRequestsHelp.isError);
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
          :helpRequestData="helpRequests.data"
          :totalRequests="helpRequests.isData ? helpRequests.data.length : 0"
          :favouritesId="favouritesRequestsHelp.favouritesId"
          :isError="isError"
        />
      </v-row>
    </v-col>
  </PageTemplate>
</template>
<style scoped></style>
