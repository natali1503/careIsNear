<script setup lang="ts">
import { useFavouritesRequestsHelp } from '@/store/favouritesRequestsHelp';
import { onBeforeMount } from 'vue';
import { VIEW_MODES } from '../../../general/constants/viewModes';
import GridIteam from './../../HelpCard/GridIteam.vue';
import ListIteam from './../../HelpCard/ListIteam.vue';

const props = defineProps<{ selectedViewMode: number }>();
const favouritesRequestsHelp = useFavouritesRequestsHelp();
onBeforeMount(() => favouritesRequestsHelp.getFavouritesRequestsHelp());
</script>
<template>
  <!-- <GridIteam v-if="VIEW_MODES[selectedViewMode] === VIEW_MODES[0]" />
  <ListIteam v-if="VIEW_MODES[selectedViewMode] === VIEW_MODES[1]" /> -->
</template>
<style scoped></style>
