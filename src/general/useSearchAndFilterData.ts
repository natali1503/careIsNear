import { ref, watch } from 'vue';

export function useSearchAndFilterData(data) {
  const searchQuery = ref(''); // Строка поиска
  const dataToDisplay = ref([]); // Отфильтрованные данные

  // Наблюдаем за изменением данных или строки поиска
  watch(
    [() => data.value, searchQuery],
    ([newData, query]) => {
      if (newData) {
        dataToDisplay.value = newData.filter((helpRequest) =>
          helpRequest.title?.toLowerCase().includes(query.toLowerCase()),
        );
      }
    },
    { immediate: true }, // Выполняем сразу
  );

  return { searchQuery, dataToDisplay };
}
