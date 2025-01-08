<script setup lang="ts">
import PageTemplate from '@/components/PageTemplate.vue';

import { apiMessages } from '@/api/apiMessages';
import { GetApiRequestResponse } from '@/api/generated';
import FilterPanel from '@/components/HelpRequests/Filter/FilterPanel.vue';
import SearchBar from '@/components/HelpRequests/SearchBar/SearchBar.vue';
import SearchFilterResults from '@/components/HelpRequests/SearchFilterResults.vue';
import { filterOptionsInit, IFilterOptions } from '@/general/filterOptions';
import { getDifferences } from '@/general/getDifferences';
import { selectedFilters } from '@/general/selectedFilters';
import { useSearchAndFilterData } from '@/general/useSearchAndFilterData';
import { useAuthStore } from '@/store/auth';
import { useFavouritesRequestsHelp } from '@/store/favouritesRequestsHelp';
import { computed, onBeforeMount, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
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
const router = useRouter();
const searchQuery = ref(route.query.search || '');
const filterPanelStatus = ref(filterOptionsInit);
const dataToDisplay = ref(helpRequests.data);

function handleSearchQueryChange() {
  const currentQuery = { ...router.currentRoute.value.query };
  if (searchQuery.value === '' || searchQuery.value === undefined) {
    delete currentQuery.search;
    router.replace({ query: { ...currentQuery } });
    return (dataToDisplay.value = helpRequests.data);
  } else {
    router.replace({ query: { ...currentQuery, search: searchQuery.value } });
    dataToDisplay.value = helpRequests.data.filter((helpRequest) => {
      if (
        helpRequest.title.toLocaleLowerCase().includes((searchQuery.value as string).toLowerCase()) ||
        helpRequest.organization.title.toLocaleLowerCase().includes((searchQuery.value as string).toLowerCase())
      )
        return helpRequest;
    });
  }
}

function handleFilterOptionsChange(newFilter) {
  for (const [key, value] of Object.entries(newFilter)) {
    if (Object.hasOwn(selectedFilters.value, key)) {
      if (selectedFilters.value[key].includes(value)) {
        const currntFilter = selectedFilters.value[key];
        selectedFilters.value[key] = currntFilter.filter((filter) => filter !== value);
        if (selectedFilters.value[key].length === 0) delete selectedFilters.value[key];
      } else selectedFilters.value[key].push(value);
    } else {
      selectedFilters.value[key] = [value];
    }
  }
}

watch(
  () => router.currentRoute.value.query.search,
  (newData) => {
    searchQuery.value = newData;
  },
);

watch(
  () => searchQuery.value,
  (newData) => {
    handleSearchQueryChange();
  },
);
watch(
  () => selectedFilters.value,
  () => {
    const temp = [];
    for (const [key, values] of Object.entries(selectedFilters.value)) {
      const filter = helpRequests.data.filter((data) => {
        if (Object.hasOwn(data, key) && values.includes(data[key])) {
          return data;
        }
      });
      temp.push(...filter);
    }
    console.log(temp);
    dataToDisplay.value = temp;
    //   console.log(selectedFilters.value);
    // const key = Object.keys(selectedFilters.value);
    // console.log(dataToDisplay.value[0]);
    // console.log(key[0]);
    // console.log(dataToDisplay.value[0][key[0]]);
  },
  { deep: true },
);
watch(
  () => helpRequests.data,
  (newData) => {
    if (searchQuery.value) handleSearchQueryChange();
    else dataToDisplay.value = newData;
  },
);

const isError = computed(() => helpRequests.isError || favouritesRequestsHelp.isError);
</script>
<template>
  <PageTemplate title="Запросы о помощи">
    <v-col cols="12" md="2" style="margin: 0; padding: 0; padding-right: 20px">
      <FilterPanel
        :filterPanelStatus="filterPanelStatus"
        @updateFilter="(newFilter) => handleFilterOptionsChange(newFilter)"
      />
    </v-col>
    <v-col style="margin: 0; padding: 0">
      <v-row style="margin: 0; padding: 0; margin-bottom: 30px">
        <SearchBar v-model="searchQuery as string" />
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
