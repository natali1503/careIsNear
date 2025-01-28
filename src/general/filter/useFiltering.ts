import clonedeep from 'lodash.clonedeep';
import { nextTick, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

import { HelpRequestData } from '../../api/generated';

import { FilterOptions, TypeKeyFilterOptions } from './FilterOptions';
import { FilterOptionsInit, TypeFilterOptionsInit } from './FilterOptionsInit';
import { HelperRequirements, TypeHelperRequirements } from './HelperRequirements';
import { selectedFiltersInit, TypeSelectedFilters } from './SelectedFilters';

export function useFiltering() {
  const selectedFilters = ref<TypeSelectedFilters>(clonedeep(selectedFiltersInit));
  const filterPanelStatus = ref<TypeFilterOptionsInit>(clonedeep(FilterOptionsInit));
  const router = useRouter();

  function filteringDataByParams(dataToFiltering: HelpRequestData[]) {
    return dataToFiltering.filter((requestHelp) => {
      return Object.entries(selectedFilters.value).every(([key, values]) => {
        if (Array.isArray(values)) {
          if (key in requestHelp) {
            if (key === 'endingDate') {
              const dateMsFilter = Number(values[0]);
              const dateMsRequestHelp = new Date(requestHelp?.endingDate).getTime();
              if (dateMsFilter - dateMsRequestHelp > 0) return true;
            } else return values.includes(requestHelp[key]);
          }
          return false;
        } else {
          if (key in requestHelp) {
            return Object.entries(values).every(([keyNew, valuesNew]) => {
              if (Array.isArray(valuesNew) && keyNew in requestHelp[key]) {
                return valuesNew.includes(requestHelp[key][keyNew]);
              }
              return false;
            });
          }
          return false;
        }
      });
    });
  }

  // async function updateQueryRouter() {
  //   await nextTick();
  //   const currentQuery = { ...router.currentRoute.value.query };
  //   const newQuery: { [key: string]: string } = {};
  //   const flatCurrentFilter: { [key: string]: string[] | boolean[] } = {};
  //   for (const [key, value] of Object.entries(selectedFilters.value)) {
  //     if (Array.isArray(value)) flatCurrentFilter[key] = value;
  //     else {
  //       for (const [keyNested, valueNested] of Object.entries(value)) {
  //         if (Array.isArray(valueNested)) flatCurrentFilter[keyNested] = valueNested;
  //       }
  //     }
  //   }
  //   for (let filter) {
  //     if (filter in flatCurrentFilter) {
  //       newQuery[filter] = flatCurrentFilter[filter];
  //     } else delete currentQuery[filter];
  //   }

  //   for (const [key, value] of Object.entries(selectedFilters.value)) {
  //     if (Array.isArray(value)) {
  //       newQuery[key] = value.join(',');
  //     } else {
  //       for (const [keyNested, valueNested] of Object.entries(value)) {
  //         if (Array.isArray(valueNested)) {
  //           newQuery[keyNested] = valueNested.join(',');
  //         }
  //       }
  //     }
  //   }
  //   router.replace({ query: { ...currentQuery, ...newQuery } });
  // }

  async function resetSelectedFilters(): Promise<void> {
    selectedFilters.value = {};
    filterPanelStatus.value = clonedeep(filterOptionsInit);
  }
  watch(
    () => selectedFilters.value,
    async () => {
      updateQueryRouter();
    },
    { deep: true },
  );

  function updateSelectedFilters(
    keyFilter: TypeKeyFilterOptions,
    newValue: string | boolean | TypeHelperRequirements | Date,
  ) {
    const currentValue = selectedFilters.value[keyFilter];
    if (
      typeof newValue === 'object' &&
      !Array.isArray(newValue) &&
      typeof currentValue === 'object' &&
      !Array.isArray(currentValue) &&
      !(newValue instanceof Date) &&
      !(currentValue instanceof Date) &&
      currentValue !== null
    ) {
      const nestedKey = Object.keys(newValue)[0] as keyof typeof HelperRequirements;
      const nestedValue = newValue[nestedKey];
      const test = currentValue[nestedKey];
      if (typeof nestedValue === 'string') (test as string[]).push(nestedValue);
      if (typeof nestedValue === 'boolean') (test as boolean[]).push(nestedValue);
    } else if (Array.isArray(currentValue)) {
      if (typeof newValue === 'string' || typeof newValue === 'boolean') {
        (currentValue as Array<string | boolean>).push(newValue);
      }
    }

    if (newValue instanceof Date) {
      selectedFilters.value[FilterOptions.endingDate] = newValue;
    }
    console.log(selectedFilters);
  }

  return {
    filterPanelStatus,
    selectedFilters,
    filteringDataByParams,
    resetSelectedFilters,
    updateSelectedFilters,
  };
}

export type SingleObject = { [key: string]: string[] | boolean[] };
export type NestedObject = { [key: string]: SingleObject };

interface ISelectedFilters {
  helpType?: string[];
  requesterType?: string[];
  helperRequirements?: {
    qualification?: string[];
    helperType?: string[];
    isOnline?: boolean[];
  };
}
export type SingleObjectFilter = { [key: string]: string | boolean };
export type NestedObjectFilter = { [key: string]: SingleObject };

type NestedObj = {
  [key: string]: string[] | boolean[] | NestedObj;
};
function addNewFilterTwo(newParams: SingleObjectFilter | NestedObjectFilter, currentFilter: NestedObj) {
  const key = Object.keys(newParams)[0];
  const valueFilter = Object.values(newParams)[0];
  if (typeof valueFilter === 'string') {
    if (currentFilter.hasOwnProperty(key)) {
      const currentFilterValue = currentFilter[key] as string[];
      currentFilter[key] = [...currentFilterValue, valueFilter];
    } else currentFilter[key] = [valueFilter];
  } else if (typeof valueFilter === 'boolean') {
    if (currentFilter.hasOwnProperty(key)) {
      const currentFilterValue = currentFilter[key] as boolean[];
      currentFilter[key] = [...currentFilterValue, valueFilter];
    } else currentFilter[key] = [valueFilter];
  } else if (typeof valueFilter === 'object' && !Array.isArray(valueFilter)) {
    const nestedCurrentFilter = currentFilter.hasOwnProperty(key) ? (currentFilter[key] as NestedObj) : {};
    const nestedFilter = addNewFilterTwo(valueFilter as SingleObjectFilter, { ...nestedCurrentFilter });
    if (currentFilter.hasOwnProperty(key)) {
      const currentFilterValue = currentFilter[key];

      currentFilter[key] = { ...currentFilterValue, ...nestedFilter };
    } else currentFilter[key] = nestedFilter;
  }
  return currentFilter;
}
function deleteFilterTwo(paramsToDelete: SingleObjectFilter | NestedObjectFilter, currentFilter: NestedObj) {
  const key = Object.keys(paramsToDelete)[0];
  const valueToDelete = Object.values(paramsToDelete)[0];

  if (typeof valueToDelete === 'string') {
    const cuurentFilterForKey = currentFilter[key] as string[];
    const updateFilter = cuurentFilterForKey.filter((value) => value !== valueToDelete);

    if (updateFilter.length === 0) {
      delete currentFilter[key];
    } else {
      currentFilter[key] = updateFilter;
    }
  } else if (typeof valueToDelete === 'boolean') {
    const cuurentFilterForKey = currentFilter[key] as boolean[];
    const updateFilter = cuurentFilterForKey.filter((value) => value !== valueToDelete);

    if (updateFilter.length === 0) {
      delete currentFilter[key];
    } else {
      currentFilter[key] = updateFilter;
    }
  } else if (typeof valueToDelete === 'object') {
    const nestedCurrentFilter = currentFilter.hasOwnProperty(key) ? (currentFilter[key] as NestedObj) : {};
    const nestedFilter = deleteFilterTwo(valueToDelete, { ...nestedCurrentFilter });
    currentFilter[key] = nestedFilter;
  }
  return currentFilter;
}
