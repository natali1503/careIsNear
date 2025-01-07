<script setup lang="ts">
import { Iteam } from '@/general/filterOptions';
import CheckListItem from './CheckListItem.vue';

const props = defineProps<{ accordionTitle: string; items: Iteam[] }>();
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
            <CheckListItem v-if="item.type === 'checkList'" :title="item.title" :options="item.options" />
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
