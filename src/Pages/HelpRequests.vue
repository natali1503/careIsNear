<script setup lang="ts">
import FilterPanel from '@/components/Filter/FilterPanel.vue';
import PageTemplate from '@/components/PageTemplate.vue';
import SearchBar from '@/components/SearchBar/SearchBar.vue';
import SearchFilterResults from '@/components/SearchFilterResults.vue';
import { onBeforeMount } from 'vue';
import { useDetailedHelpRequests } from '../store/detailedHelpRequests';
import { useHelpRequests } from '../store/helpRequests';
import DetailedHelpCard from './DetailedHelpCard.vue';

const helpRequests = useHelpRequests();
// const detailedHelpRequests = useDetailedHelpRequests();

onBeforeMount(() => {
  helpRequests.getHelpRequests();
  // detailedHelpRequests.getRequestDetails('f2f48ea4-9172-4434-b55f-a94862c1529c');
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
        />
      </v-row>
    </v-col>
  </PageTemplate>
</template>
<style scoped></style>
