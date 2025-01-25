<script setup lang="ts">
import { filterOptions, IFilterOptions } from '@/general/filterOptions';
import Accordion from './Accordion.vue';
import CheckListItem from './CheckListItem.vue';

const prop = defineProps<{ filterPanelStatus: IFilterOptions }>();
const emit = defineEmits(['updateFilter', 'resetFilter']);
</script>
<template>
  <div
    style="
      display: flex;
      flex-direction: column;
      gap: 10px;
      background-color: #fff;
      border-radius: 4px;
      border: 1px solid #e0e0e0;
      padding: 20px 20px;
      width: 100%;
      height: max-content;
    "
  >
    <v-expansion-panels style="width: 100%; padding: 0">
      <v-expansion-panel>
        <v-expansion-panel-title class="title">
          Фильтрация
          <!-- <template v-slot:actions>
            <v-icon icon="mdi-filter-remove-outline" style="color: rgba(0, 0, 0, 0.6)"> </v-icon>
          </template> -->
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <div style="display: flex; flex-direction: column; gap: 40px">
            <div style="display: flex; flex-direction: column; gap: 20px">
              <div v-for="filterOption in filterOptions" class="filter">
                <CheckListItem
                  v-if="filterOption.type === 'checkList'"
                  :title="filterOption.title"
                  :titleId="filterOption.id"
                  :options="filterOption.options"
                  :filterPanelStatus="filterPanelStatus[filterOption.id]"
                  @checkbox="
                    (value) => {
                      emit('updateFilter', { [filterOption.id]: value });
                    }
                  "
                />
                <Accordion
                  v-if="filterOption.type === 'accordionList'"
                  :accordionTitle="filterOption.accordion.accordionTitle"
                  :items="filterOption.accordion.items"
                  :filterPanelStatus="filterPanelStatus"
                  @checkboxAccordion="
                    (value) => {
                      emit('updateFilter', value);
                    }
                  "
                />
              </div>

              <div style="display: flex; flex-direction: column; gap: 10px">
                <p>Помощь актуальна до:</p>
                <v-date-input label="Выберете дату"></v-date-input>
              </div>
            </div>
            <v-btn class="btn" @click="emit('resetFilter')">Сбросить</v-btn>
          </div>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
    <div></div>
  </div>
</template>
<style scoped>
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
