<script setup lang="ts">
import type { TypeKeyFilterOptions } from '@/general/filter/FilterOptions';
import type { TypeFilterOptionsInit } from '@/general/filter/FilterOptionsInit';
import type { TypeHelperRequirements } from '@/general/filter/HelperRequirements';
import { filterOptions } from '@/general/filterOptions';
import Accordion from './Accordion.vue';
import CheckListItem from './CheckListItem.vue';
import DateFilter from './DateFilter.vue';

defineProps<{ filterPanelStatus: TypeFilterOptionsInit; isFilter: boolean; mobile: boolean }>();
const emit = defineEmits(['updateFilter', 'resetFilter']);
</script>
<template>
  <div class="filterPanel">
    <v-expansion-panels style="width: 100%; padding: 0" :model-value="mobile ? null : 0">
      <v-expansion-panel>
        <v-expansion-panel-title class="title">
          Фильтрация
          <!-- <template v-slot:actions> -->
          <!-- <v-icon v-if="isFilter" icon="mdi-filter-remove-outline" style="color: rgba(0, 0, 0, 0.6)"> </v-icon> -->
          <!-- </template> -->
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <div style="display: flex; flex-direction: column; gap: 40px">
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
                @updateDateFilter="(value) => emit('updateFilter', value)"
              />
            </div>
            <v-btn class="btn" @click="emit('resetFilter')" :disabled="!isFilter">Сбросить</v-btn>
          </div>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>
<style scoped>
.filterPanel {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #e0e0e0;
  padding: 20px 20px;
  width: 100%;
  height: max-content;
}
.title {
  font-weight: 500;
  font-size: 20px;
  line-height: 32px;
}
::v-deep(.v-expansion-panel__shadow) {
  box-shadow: none;
}
.btn {
  border: 1px solid rgba(0, 0, 0, 0.87);
  box-shadow: none;
}
</style>
