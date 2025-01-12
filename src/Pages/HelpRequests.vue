<script setup lang="ts">
import PageTemplate from '@/components/PageTemplate.vue';
import clonedeep from 'lodash.clonedeep';

import { apiMessages } from '@/api/apiMessages';
import FilterPanel from '@/components/HelpRequests/Filter/FilterPanel.vue';
import SearchBar from '@/components/HelpRequests/SearchBar/SearchBar.vue';
import SearchFilterResults from '@/components/HelpRequests/SearchFilterResults.vue';
import { filterForParams } from '@/general/filter/filterForParams';
import { filterOptionsInit } from '@/general/filterOptions';
import { selectedFilters } from '@/general/selectedFilters';
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
const filterPanelStatus = ref(clonedeep(filterOptionsInit));

const dataToDisplay = computed(() => {
  let tempData = helpRequests.data;
  if (!searchQuery.value && !Object.keys(selectedFilters.value).length) return helpRequests.data;
  else {
    tempData = handleSearchQueryChange(tempData);
    tempData = filterForParams(tempData, selectedFilters.value);
  }
  return tempData;
});
function handleSearchQueryChange(data) {
  let searchData = [...data];
  const currentQuery = { ...router.currentRoute.value.query };
  if (searchQuery.value === '' || searchQuery.value === undefined) {
    delete currentQuery.search;
    router.replace({ query: { ...currentQuery } });
  } else {
    router.replace({ query: { ...currentQuery, search: searchQuery.value } });
    searchData = searchData.filter((helpRequest) => {
      if (
        helpRequest.title.toLocaleLowerCase().includes((searchQuery.value as string).toLowerCase()) ||
        helpRequest.organization.title.toLocaleLowerCase().includes((searchQuery.value as string).toLowerCase())
      )
        return helpRequest;
    });
  }
  return searchData;
}

function resetFilter() {
  selectedFilters.value = {};
  filterPanelStatus.value = clonedeep(filterOptionsInit);
}

function handleFilterOptionsChange(newFilter) {
  for (const [newKeyFilter, newValueFilter] of Object.entries(newFilter)) {
    if (Object.hasOwn(selectedFilters.value, newKeyFilter)) {
      if (typeof newValueFilter === 'string') {
        const cuurentFilter = selectedFilters.value[newKeyFilter] as string[];
        if (cuurentFilter.includes(newValueFilter)) {
          const updateFilter = cuurentFilter.filter((filter) => filter !== newValueFilter);
          if (updateFilter.length === 0) {
            delete selectedFilters.value[newKeyFilter];
          } else {
            selectedFilters.value[newKeyFilter] = updateFilter;
          }
        } else {
          cuurentFilter.push(newValueFilter);
        }
      } else {
        const key = Object.keys(newValueFilter)[0];
        if (Object.hasOwn(selectedFilters.value[newKeyFilter], key)) {
          const cerrentFilter = selectedFilters.value[newKeyFilter][key] as string[];
          if (cerrentFilter.includes(newValueFilter[key])) {
            const updateFilter = cerrentFilter.filter((filter) => filter !== newValueFilter[key]);
            if (updateFilter.length !== 0) {
              selectedFilters.value[newKeyFilter] = {
                ...selectedFilters.value[newKeyFilter],
                [key]: updateFilter,
              };
            } else {
              delete selectedFilters.value[newKeyFilter][key];
              if (Object.keys(selectedFilters.value[newKeyFilter]).length !== 0) {
                console.log(selectedFilters.value[newKeyFilter]);
              } else {
                delete selectedFilters.value[newKeyFilter];
              }
            }
          } else selectedFilters.value[newKeyFilter][key].push(newValueFilter[key]);
        } else {
          selectedFilters.value[newKeyFilter] = {
            ...selectedFilters.value[newKeyFilter],
            [key]: [newValueFilter[key]],
          };
        }
      }
    } else {
      if (typeof newValueFilter === 'string') {
        selectedFilters.value[newKeyFilter] = [newValueFilter];
      } else {
        const key = Object.keys(newValueFilter)[0];
        selectedFilters.value[newKeyFilter] = { [key]: [newValueFilter[key]] };
      }
    }
  }
}

watch(
  () => router.currentRoute.value.query.search,
  (newData) => {
    searchQuery.value = newData;
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
        @resetFilter="resetFilter()"
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
