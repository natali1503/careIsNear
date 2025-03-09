import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

import { type HelpRequestData } from '../../api/generated';

export function useSearch(initValueSearch: string) {
  const router = useRouter();
  const searchQuery = ref(initValueSearch || '');

  watch(
    () => router.currentRoute.value.query.search,
    (routerSearchQuery) => {
      if (typeof routerSearchQuery === 'string') searchQuery.value = routerSearchQuery;
      else searchQuery.value = '';
    },
  );
  watch(
    () => searchQuery.value,
    (newSearchQuery) => {
      if (newSearchQuery === '') {
        removeParamFromCurrentRoute('search');
      } else {
        const currentQuery = { ...router.currentRoute.value.query };
        router.replace({ query: { ...currentQuery, search: searchQuery.value } });
      }
    },
  );
  function removeParamFromCurrentRoute(param: string) {
    const currentQuery = { ...router.currentRoute.value.query };
    if (currentQuery.hasOwnProperty(param)) delete currentQuery.search;
    router.replace({ query: { ...currentQuery } });
  }

  function handleSearchQueryChange(dataToSearch: HelpRequestData[]) {
    let searchData = [...dataToSearch];
    if (searchQuery.value) {
      searchData = searchData.filter((helpRequest) => {
        const lowercasedSearchQuery = searchQuery.value.toLocaleLowerCase();
        if (
          helpRequest?.title?.toLocaleLowerCase().includes(lowercasedSearchQuery) ||
          helpRequest?.organization?.title?.toLocaleLowerCase().includes(lowercasedSearchQuery)
        )
          return helpRequest;
      });
    }
    return searchData;
  }

  function resetSearchQuery(): void {
    searchQuery.value = '';
    const currentQuery = { ...router.currentRoute.value.query };
    delete currentQuery.search;

    router.replace({ query: { ...currentQuery } });
  }
  return { searchQuery, handleSearchQueryChange, resetSearchQuery };
}
