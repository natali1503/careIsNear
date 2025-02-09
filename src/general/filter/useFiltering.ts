import clonedeep from 'lodash.clonedeep';
import { nextTick, ref, watch } from 'vue';
import { LocationQueryRaw, LocationQueryValueRaw, useRouter } from 'vue-router';

import { HelpRequestData } from '../../api/generated';

import { selectedFiltersInit } from './Filter';
import { FilterOptions, TypeKeyFilterOptions } from './FilterOptions';
import { FilterPanelStatusNoChoice, TypeFilterPanelStatus } from './FilterOptionsInit';
import { FlatFilter, TypeFlatFilter, TypeKeyFlatFilter } from './FlatFilter';
import { HelperRequirements, TypeHelperRequirements, TypeKeyHelperRequirements } from './HelperRequirements';
import { TypeSelectedFilters } from './SelectedFilters';

export function useFiltering() {
  const router = useRouter();
  const flatFilteringOptionsFromUrl = () => {
    const currentQuery = { ...router.currentRoute.value.query };
    const flatCurrentFilter: TypeFlatFilter = {};
    Object.values(FlatFilter).forEach((keyFilter) => {
      if (keyFilter in currentQuery) {
        const currentQueryValue = currentQuery[keyFilter];
        if (typeof currentQueryValue === 'string') {
          if (keyFilter === FlatFilter.endingDate) {
            flatCurrentFilter[keyFilter] = new Date(Number(currentQueryValue));
          } else flatCurrentFilter[keyFilter] = [currentQueryValue];
        } else if (typeof currentQueryValue === 'number') flatCurrentFilter[keyFilter] = [Boolean(currentQueryValue)];
        else if (Array.isArray(currentQueryValue)) {
          if (currentQueryValue.every((el) => typeof el === 'number')) {
            flatCurrentFilter[keyFilter] = currentQueryValue.map((el) => Boolean(el)) as boolean[];
          } else {
            flatCurrentFilter[keyFilter] = currentQueryValue as string[];
          }
        }
      }
    });
    return flatCurrentFilter;
  };
  const selectedFilters = ref(selectedFiltersInit);
  selectedFilters.value.init(flatFilteringOptionsFromUrl());

  const filterPanelStatusInit = () => {
    const filterPanelStatusInit = clonedeep(FilterPanelStatusNoChoice);
    const currentFilter = selectedFilters.value;

    for (const [keyFilter, value] of Object.entries(FilterPanelStatusNoChoice) as [
      TypeKeyFilterOptions,
      TypeFilterPanelStatus[keyof TypeFilterPanelStatus],
    ][]) {
      if (currentFilter.hasKeyFilter(keyFilter)) {
        const valueCurrentFilter = currentFilter.getValueByKeyFilter(keyFilter);

        if (valueCurrentFilter instanceof Date && keyFilter === FilterOptions.endingDate)
          filterPanelStatusInit[keyFilter] = valueCurrentFilter;
        else if (
          Array.isArray(valueCurrentFilter) &&
          (keyFilter === FilterOptions.helpType || keyFilter === FilterOptions.requesterType)
        ) {
          Object.keys(value as object).forEach((keyNested) => {
            filterPanelStatusInit[keyFilter][keyNested] = valueCurrentFilter.includes(keyNested);
          });
        } else if (
          !(valueCurrentFilter instanceof Date) &&
          valueCurrentFilter !== null &&
          typeof valueCurrentFilter === 'object' &&
          !Array.isArray(valueCurrentFilter)
        ) {
          for (const [keyNested, valueNested] of Object.entries(value as object)) {
            if (keyNested === HelperRequirements.isOnline) {
              if (valueCurrentFilter[keyNested]) {
                if (valueCurrentFilter[keyNested].includes(true))
                  filterPanelStatusInit[keyFilter][keyNested].online = true;
                if (valueCurrentFilter[keyNested].includes(false))
                  filterPanelStatusInit[keyFilter][keyNested].offline = true;
              } else {
                filterPanelStatusInit[keyFilter][keyNested].online = false;
                filterPanelStatusInit[keyFilter][keyNested].offline = false;
              }
            } else {
              Object.keys(valueNested).forEach((value) => {
                filterPanelStatusInit[keyFilter][keyNested][value] = valueCurrentFilter[keyNested]?.includes(value);
              });
            }
          }
        }
      }
    }
    return filterPanelStatusInit;
  };
  const filterPanelStatus = ref<TypeFilterPanelStatus>(filterPanelStatusInit());

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
              if (nestedValueRequestHelp === undefined) return false;
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
    filterPanelStatus.value = clonedeep(FilterPanelStatusNoChoice);
  }

  function updateSelectedFilters(keyFilter: TypeKeyFilterOptions, newValue: string | TypeHelperRequirements | Date) {
    selectedFilters.value.updateFilter(keyFilter, newValue);
  }

  async function updateQueryRouter() {
    await nextTick();
    const currentQuery = { ...router.currentRoute.value.query };

    const newQuery: LocationQueryRaw = {};
    const flatCurrentFilter: TypeFlatFilter = selectedFiltersInit.getFlatFilter();
    Object.values(FlatFilter).forEach((keyFilter) => {
      if (keyFilter in currentQuery) delete currentQuery[keyFilter];
    });

    for (const [key, value] of Object.entries(flatCurrentFilter)) {
      if (value instanceof Date) newQuery[key] = String(value.getTime());
      if (Array.isArray(value)) {
        value.forEach((filter) => {
          if (key in newQuery) {
            const temp = newQuery[key] as LocationQueryValueRaw[];
            if (typeof filter === 'string') newQuery[key] = [...temp, filter];
            else newQuery[key] = [...temp, Number(filter)];
          } else {
            if (typeof filter === 'string') newQuery[key] = [filter];
            else newQuery[key] = [Number(filter)];
          }
        });
      }
    }
    router.replace({ query: { ...currentQuery, ...newQuery } });
  }

  watch(
    () => selectedFilters.value,
    async () => {
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
