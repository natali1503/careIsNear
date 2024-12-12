<script setup lang="ts">
import { ViewModeKey } from '@/general/constants/viewModes';
import { ref } from 'vue';
const emit = defineEmits<{
  (event: 'updateViewMode', mode: ViewModeKey): void;
}>();
const selectedСard = ref<ViewModeKey>(1);
function onHandleSelectedСard(newSelectedСard: ViewModeKey) {
  console.log(selectedСard.value === newSelectedСard);
  emit('updateViewMode', newSelectedСard);
}
</script>
<template>
  <v-item-group selected-class="selected" v-model="selectedСard" @update:modelValue="onHandleSelectedСard">
    <v-container style="margin: 0; padding: 0">
      <v-row class="rowCell">
        <v-item v-slot="{ isSelected, selectedClass, toggle }">
          <v-card :class="['d-flex align-center cell', selectedClass]" @click="() => !isSelected && toggle()">
            <v-col style="margin: 0; padding: 0">
              <v-icon :icon="'mdi-grid'" class="icon"></v-icon>
            </v-col>
          </v-card>
        </v-item>

        <v-item v-slot="{ isSelected, selectedClass, toggle }">
          <v-card
            :class="['d-flex align-center cell centerCard', selectedClass]"
            @click="() => !isSelected && toggle()"
          >
            <v-col style="margin: 0; padding: 0">
              <v-icon :icon="'mdi-list-box-outline'" class="icon"></v-icon>
            </v-col>
          </v-card>
        </v-item>
        <v-item v-slot="{ isSelected, selectedClass, toggle }">
          <v-card :class="['d-flex align-center cell', selectedClass]" @click="() => !isSelected && toggle()">
            <v-col style="margin: 0; padding: 0">
              <v-icon :icon="'mdi-map-marker'" class="icon"></v-icon>
            </v-col>
          </v-card>
        </v-item>
      </v-row>
    </v-container>
  </v-item-group>
</template>
<style scoped>
.rowCell {
  margin: 0;
  padding: 0;
  border-radius: 4px;
  border: 1px solid #e0e0e0;
}
.cell {
  margin: 0;
  padding: 10px;
  border: none;
  border-radius: 0 !important;
  box-shadow: none;
}
.cell:hover {
  border: none;
  box-shadow: none;
  border-radius: 0 !important;
  border-radius: 0;
}
.icon {
  color: rgba(0, 0, 0, 0.6);
}
.selected {
  background-color: rgba(0, 0, 0, 0.08);
  border: none;
  box-shadow: none;
  border-radius: 0;
}
.selected .icon {
  color: rgba(0, 0, 0, 0.87);
}
.centerCard:hover {
  border-left: 1px solid #e0e0e0;
  border-right: 1px solid #e0e0e0;
}
.centerCard {
  border-left: 1px solid #e0e0e0;
  border-right: 1px solid #e0e0e0;
}
</style>
