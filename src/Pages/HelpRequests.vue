<script setup lang="ts">
import PageTemplate from '@/components/PageTemplate.vue';

import { apiMessages } from '@/api/apiMessages';
import FilterPanel from '@/components/HelpRequests/Filter/FilterPanel.vue';
import SearchBar from '@/components/HelpRequests/SearchBar/SearchBar.vue';
import SearchFilterResults from '@/components/HelpRequests/SearchFilterResults.vue';

import { TypeKeyFilterOptions } from '@/general/filter/FilterOptions';
import { FilterValue } from '@/general/filter/SelectedFilters';
import { useFiltering } from '@/general/filter/useFiltering';
import { useSearch } from '@/general/filter/useSearch';
import { useAuthStore } from '@/store/auth';
import { useFavouritesRequestsHelp } from '@/store/favouritesRequestsHelp';
import { computed, onBeforeMount, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useToast } from 'vue-toastification';
import { useDisplay } from 'vuetify/lib/framework.mjs';
import { useHelpRequests } from '../store/helpRequests';

const helpRequests = useHelpRequests();
const favouritesRequestsHelp = useFavouritesRequestsHelp();
onBeforeMount(async () => {
  try {
    await helpRequests.getHelpRequests();
    await favouritesRequestsHelp.getFavouritesRequestsHelp();
  } catch (codeError) {
    const toast = useToast();
    if (codeError === 500) {
      toast.error(apiMessages.generalError);
    } else if (codeError === 403) {
      const authStore = useAuthStore();
      authStore.logout();
      toast.error(apiMessages.sessionTime);
    } else toast.error('Что-то еще');
  }
});

const route = useRoute();

const { searchQuery, handleSearchQueryChange, resetSearchQuery } = useSearch(route.query.search as string);
const { filterPanelStatus, selectedFilters, filteringDataByParams, resetSelectedFilters, updateSelectedFilters } =
  useFiltering();

const dataToDisplay = computed(() => {
  let tempData = helpRequests.data;
  if (!searchQuery.value && !Object.keys(selectedFilters.value).length) return helpRequests.data;
  else {
    tempData = handleSearchQueryChange(tempData);
    tempData = filteringDataByParams(tempData);
  }

  return tempData;
});

function handleSelectedFiltersChange(newFilter: { [key in TypeKeyFilterOptions]: FilterValue }) {
  const key = Object.keys(newFilter)[0] as TypeKeyFilterOptions;
  const value = Object.values(newFilter)[0] as FilterValue;
  updateSelectedFilters(key, value);
}

const display = useDisplay();
const isError = computed(() => helpRequests.isError || favouritesRequestsHelp.isError);
const isFilter = computed(() => Object.keys(selectedFilters.value).length > 0);
</script>
<template>
  <PageTemplate title="Запросы о помощи">
    <v-col
      cols="12"
      md="3"
      style="margin: 0; padding: 0; height: max-content"
      :style="{ paddingRight: display.mobile.value ? 0 : '20px' }"
    >
      <FilterPanel
        :filterPanelStatus="filterPanelStatus"
        :isFilter="isFilter"
        :mobile="display.mobile.value"
        @updateFilter="(newFilter) => handleSelectedFiltersChange(newFilter)"
        @resetFilter="resetSelectedFilters()"
      />
    </v-col>
    <v-col style="margin: 0; padding: 0">
      <v-row style="margin: 0; padding: 0; margin-bottom: 30px">
        <SearchBar v-model="searchQuery as string" @resetSearchQuery="resetSearchQuery" />
      </v-row>
      <v-row style="margin: 0; padding: 0">
        <SearchFilterResults
          :helpRequestData="dataToDisplay"
          :totalRequests="dataToDisplay.length"
          :favouritesId="favouritesRequestsHelp.favouritesId"
          :isError="isError"
        />
      </v-row>
    </v-col>
  </PageTemplate>
</template>
<style scoped></style>
