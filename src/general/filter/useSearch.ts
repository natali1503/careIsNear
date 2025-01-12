import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

import { HelpRequestData } from '../../api/generated';

export function useSearch(initValueSearch: string) {
  const router = useRouter();
  const searchQuery = ref(initValueSearch || '');

  watch(
    () => router.currentRoute.value.query.search,
    (newSearchQuery) => {
      if (typeof newSearchQuery === 'string') searchQuery.value = newSearchQuery;
    },
  );

  function handleSearchQueryChange(dataToSearch: HelpRequestData[]) {
    let searchData = [...dataToSearch];
    const currentQuery = { ...router.currentRoute.value.query };
    if (!searchQuery.value) {
      delete currentQuery.search;

      router.replace({ query: { ...currentQuery } });
    } else {
      router.replace({ query: { ...currentQuery, search: searchQuery.value } });
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
