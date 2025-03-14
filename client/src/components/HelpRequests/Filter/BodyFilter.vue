<script setup lang="ts">
import type { TypeKeyFilterOptions } from '@/general/filter/FilterOptions';
import type { TypeFilterOptionsInit } from '@/general/filter/FilterOptionsInit';
import type { TypeHelperRequirements } from '@/general/filter/HelperRequirements';
import { filterOptions } from '@/general/filterOptions';
import Accordion from './Accordion.vue';
import CheckListItem from './CheckListItem.vue';
import DateFilter from './DateFilter.vue';

defineProps<{ isFilter: boolean; filterPanelStatus: TypeFilterOptionsInit }>();
const emit = defineEmits(['updateFilter', 'resetFilter']);
type EndingDate = { endingDate: Date | null };
</script>
<template>
  <div>
    <div style="display: flex; flex-direction: column; gap: 40px; flex: 1">
      <div style="display: flex; flex-direction: column; gap: 20px">
        <div v-for="filterOption in filterOptions" class="filter">
          <CheckListItem
            v-if="filterOption.type === 'checkList'"
            :title="filterOption.title ?? ''"
            :titleId="filterOption.id ?? ''"
            :options="filterOption.options ?? []"
            :filterPanelStatus="filterPanelStatus[filterOption.id as TypeKeyFilterOptions]"
            @checkbox="
              (value: string) => {
                const typedId = filterOption.id as TypeKeyFilterOptions;
                emit('updateFilter', { [typedId]: value });
              }
            "
          />
          <Accordion
            v-if="filterOption.type === 'accordionList'"
            :accordionTitle="filterOption.accordion?.accordionTitle ?? ''"
            :items="filterOption.accordion?.items ?? []"
            :filterPanelStatus="filterPanelStatus"
            @checkboxAccordion="
              (value: TypeHelperRequirements) => {
                emit('updateFilter', value);
              }
            "
          />
        </div>
        <DateFilter
          v-model:selectedDate="filterPanelStatus.endingDate as Date"
          @updateDateFilter="(value: EndingDate) => emit('updateFilter', value)"
        />
      </div>
      <v-btn class="btn" @click="emit('resetFilter')" :disabled="!isFilter">Сбросить</v-btn>
    </div>
  </div>
</template>
<style scoped></style>
