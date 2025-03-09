<script setup lang="ts">
import type { TypeFilterOptionsInit } from '@/general/filter/FilterOptionsInit';
import { type Iteam } from '@/general/filterOptions';
import CheckListItem from './CheckListItem.vue';

defineProps<{ accordionTitle: string; items: Iteam[]; filterPanelStatus: TypeFilterOptionsInit }>();
const emit = defineEmits(['checkboxAccordion']);
</script>
<template>
  <v-expansion-panels style="width: 100%; padding: 0">
    <v-expansion-panel>
      <v-expansion-panel-title class="title" style="border: 1px solid rgba(0, 0, 0, 0.12)">
        {{ accordionTitle }}
      </v-expansion-panel-title>
      <v-expansion-panel-text style="background-color: rgba(245, 245, 245, 1)">
        <div style="display: flex; flex-direction: column; gap: 20px">
          <div v-for="item in items" class="filter">
            <CheckListItem
              v-if="item.type === 'checkList'"
              :title="item.title"
              :options="item.options"
              :titleId="item.id"
              :filterPanelStatus="{
                [item.id]: ((filterPanelStatus.helperRequirements as Record<string, boolean>) ?? {})[item.id] ?? false,
              }"
              @checkbox="
                (value) => {
                  const key = item.id;
                  if (key === 'isOnline') {
                    const test = { helperRequirements: { [item.id]: value === 'online' ? true : false } };
                    emit('checkboxAccordion', test);
                  } else {
                    const test = { helperRequirements: { [item.id]: value } };
                    emit('checkboxAccordion', test);
                  }
                }
              "
            />
          </div>
        </div>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<style scoped>
::v-deep(.v-expansion-panel__shadow) {
  box-shadow: none;
}
</style>

const str='' console.log(str=='') console.log(str=='')
