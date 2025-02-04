import clonedeep from 'lodash.clonedeep';
import { nextTick, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

import { HelpRequestData } from '../../api/generated';

import { selectedFiltersInit } from './Filter';
import { TypeKeyFilterOptions } from './FilterOptions';
import { FilterOptionsInit, TypeFilterOptionsInit } from './FilterOptionsInit';
import { FlatFilter, TypeFlatFilter } from './FlatFilter';
import { TypeHelperRequirements, TypeKeyHelperRequirements } from './HelperRequirements';
import { TypeSelectedFilters } from './SelectedFilters';

export function useFiltering() {
  const selectedFilters = ref(selectedFiltersInit);
  const filterPanelStatus = ref<TypeFilterOptionsInit>(clonedeep(FilterOptionsInit));
  const router = useRouter();

  function filteringDataByParams(dataToFiltering: HelpRequestData[]) {
    return dataToFiltering.filter((requestHelp) => {
      return Object.entries(selectedFilters.value.getFilter()).every(([key, values]) => {
        const typedKey = key as TypeKeyFilterOptions;
        const typedValues = values as TypeSelectedFilters[keyof TypeSelectedFilters];
        if (!typedValues) return false;
        if (Array.isArray(typedValues)) {
          const valueRequestHelp = requestHelp[typedKey];
          return valueRequestHelp && typedValues.includes(valueRequestHelp as string);
        } else if (typedValues instanceof Date) {
          const dateMsFilter = typedValues.getTime();
          const dateRequestHelp = requestHelp.endingDate;
          if (!dateRequestHelp) return;
          const dateMsRequestHelp = new Date(dateRequestHelp).getTime();
          if (dateMsFilter - dateMsRequestHelp > 0) return true;
        } else {
          return Object.entries(typedValues).every(([nestedKey, nestedValues]) => {
            const typedNestedKey = nestedKey as TypeKeyHelperRequirements;
            const helperRequirementsRequestHelp = requestHelp[typedKey];
            if (typeof helperRequirementsRequestHelp === 'object' && typedNestedKey in helperRequirementsRequestHelp) {
              const nestedValueRequestHelp = helperRequirementsRequestHelp[typedNestedKey];
              if (!nestedValueRequestHelp) return false;
              if (typeof nestedValueRequestHelp === 'string')
                return (nestedValues as string[]).includes(nestedValueRequestHelp);
              if (typeof nestedValueRequestHelp === 'boolean')
                return (nestedValues as boolean[]).includes(nestedValueRequestHelp);
            }

            return false;
          });
        }

        return false;
      });
    });
  }

  async function resetSelectedFilters(): Promise<void> {
    selectedFilters.value.resetFilter();
    filterPanelStatus.value = clonedeep(FilterOptionsInit);
  }

  function updateSelectedFilters(keyFilter: TypeKeyFilterOptions, newValue: string | TypeHelperRequirements | Date) {
    selectedFilters.value.updateFilter(keyFilter, newValue);
  }

  async function updateQueryRouter() {
    await nextTick();
    const currentQuery = { ...router.currentRoute.value.query };
    const newQuery: { [key: string]: string } = {};
    const flatCurrentFilter: TypeFlatFilter = selectedFiltersInit.getFlatFilter();
    Object.values(FlatFilter).forEach((keyFilter) => {
      if (keyFilter in currentQuery) delete currentQuery[keyFilter];
    });
    for (const [key, value] of Object.entries(flatCurrentFilter)) {
      if (Array.isArray(value)) {
        newQuery[key] = value.join(',');
      } else if (value instanceof Date) newQuery[key] = String(value.getTime());
    }
    router.replace({ query: { ...currentQuery, ...newQuery } });
  }

  watch(
    () => selectedFilters.value,
    async () => {
      console.log(79);
      updateQueryRouter();
    },
    { deep: true },
  );

  return {
    filterPanelStatus,
    selectedFilters,
    filteringDataByParams,
    resetSelectedFilters,
    updateSelectedFilters,
  };
}
