<script setup lang="ts">
import { VIEW_MODES } from '../../../general/constants/viewModes';
import GridIteam from './../../HelpCard/GridIteam.vue';
import ListIteam from './../../HelpCard/ListIteam.vue';

const props = defineProps<{ selectedViewMode: number }>();
</script>
<template>
  <GridIteam v-if="VIEW_MODES[selectedViewMode] === VIEW_MODES[0]" />
  <ListIteam v-if="VIEW_MODES[selectedViewMode] === VIEW_MODES[1]" />
</template>
<style scoped></style>
