import clonedeep from 'lodash.clonedeep';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

import { HelpRequestData } from '../../api/generated';
import { filterOptionsInit } from '../filterOptions';

export function useFiltering() {
  const selectedFilters = ref<SingleObject | NestedObject>({});
  const filterPanelStatus = ref(clonedeep(filterOptionsInit));
  const router = useRouter();

  function handleFilterOptionsChange(newFilter: SingleObject | NestedObject) {
    for (const [newKeyFilter, newValueFilter] of Object.entries(newFilter)) {
      if (selectedFilters.value.hasOwnProperty(newKeyFilter)) {
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
          if (selectedFilters.value[newKeyFilter].hasOwnProperty(key)) {
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
        addNewFilter(newKeyFilter, newValueFilter);
      }
    }
    const currentQuery = { ...router.currentRoute.value.query };
    const newQuery: { [key: string]: string } = {};
    for (const [key, value] of Object.entries(selectedFilters.value)) {
      if (typeof key === 'string') {
        newQuery[key] = value.join(',');
      }
    }
    const test = { ...currentQuery, ...newQuery };
    console.log(test);
    router.replace({ query: {} });
    console.log(router.currentRoute.value.query);
  }

  function addNewFilter(newKeyFilter: string, newValueFilter: string | { [key: string]: string }) {
    if (typeof newValueFilter === 'string') {
      selectedFilters.value[newKeyFilter] = [newValueFilter];
    } else {
      const key = Object.keys(newValueFilter)[0];
      selectedFilters.value[newKeyFilter] = { [key]: [newValueFilter[key]] };
    }
  }

  function filteringDataByParams(dataToFiltering: HelpRequestData[]) {
    return dataToFiltering.filter((requestHelp) => {
      return Object.entries(selectedFilters.value).every(([key, values]) => {
        if (Array.isArray(values)) {
          if (key in requestHelp) {
            return values.includes(requestHelp[key]);
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

  function resetSelectedFilters(): void {
    selectedFilters.value = {};
    filterPanelStatus.value = clonedeep(filterOptionsInit);
  }
  //www.lamoda.ru/c/15/shoes-women/?sitelink=topmenuW&l=4&upper_materials=36014,35259
  watch(
    () => selectedFilters.value,
    () => {
      console.log(123);
      // router.replace({ query: { test: 'test' } });
      // const currentQuery = { ...router.currentRoute.value.query };
      // const newQuery: { [key: string]: string } = {};
      // for (const [key, value] of Object.entries(selectedFilters.value)) {
      //   if (typeof key === 'string') {
      //     newQuery[key] = value.join(',');
      //   }
      // }
      // router.replace({ query: { ...currentQuery, ...newQuery } });
      // console.log(router.currentRoute.value.query);
    },
    { deep: true },
  );

  return { filterPanelStatus, selectedFilters, handleFilterOptionsChange, filteringDataByParams, resetSelectedFilters };
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

// interface SingleObject {
//   [key: string]: string | string[];
// }

// interface NestedObject {
//   [key: string]: Record<string, string[]>;
// }

// type SelectedFilters = {
//   [key: string]: string[] | Record<string, string[]>;
// };

// const selectedFilters = {
//   value: {} as SelectedFilters,
// };

// function handleFilterOptionsChange(newFilter: SingleObject | NestedObject) {
//   for (const [newKeyFilter, newValueFilter] of Object.entries(newFilter)) {
//     // Проверяем, есть ли ключ в selectedFilters
//     if (selectedFilters.value.hasOwnProperty(newKeyFilter)) {
//       handleExistingFilter(newKeyFilter, newValueFilter);
//     } else {
//       // Если ключа нет, добавляем новый фильтр
//       addNewFilter(newKeyFilter, newValueFilter);
//     }
//   }
// }

// // Обработка существующего фильтра
// function handleExistingFilter(newKeyFilter: string, newValueFilter: string | Record<string, string[]>) {
//   if (typeof newValueFilter === 'string') {
//     updateStringFilter(newKeyFilter, newValueFilter);
//   } else {
//     updateNestedFilter(newKeyFilter, newValueFilter);
//   }
// }

// // Обработка строкового фильтра
// function updateStringFilter(newKeyFilter: string, newValueFilter: string) {
//   const currentFilter = selectedFilters.value[newKeyFilter] as string[];

//   if (currentFilter.includes(newValueFilter)) {
//     const updatedFilter = currentFilter.filter((filter) => filter !== newValueFilter);
//     if (updatedFilter.length === 0) {
//       delete selectedFilters.value[newKeyFilter];
//     } else {
//       selectedFilters.value[newKeyFilter] = updatedFilter;
//     }
//   } else {
//     currentFilter.push(newValueFilter);
//   }
// }

// // Обработка вложенного фильтра
// function updateNestedFilter(newKeyFilter: string, newValueFilter: Record<string, string[]>) {
//   const key = Object.keys(newValueFilter)[0];
//   if (selectedFilters.value[newKeyFilter]?.hasOwnProperty(key)) {
//     const currentFilter = selectedFilters.value[newKeyFilter][key] as string[];

//     if (currentFilter.includes(newValueFilter[key])) {
//       const updatedFilter = currentFilter.filter((filter) => filter !== newValueFilter[key]);
//       if (updatedFilter.length !== 0) {
//         selectedFilters.value[newKeyFilter] = {
//           ...selectedFilters.value[newKeyFilter],
//           [key]: updatedFilter,
//         };
//       } else {
//         delete selectedFilters.value[newKeyFilter][key];
//         if (Object.keys(selectedFilters.value[newKeyFilter]).length === 0) {
//           delete selectedFilters.value[newKeyFilter];
//         }
//       }
//     } else {
//       selectedFilters.value[newKeyFilter][key].push(newValueFilter[key]);
//     }
//   } else {
//     selectedFilters.value[newKeyFilter] = { [key]: [newValueFilter[key]] };
//   }
// }
