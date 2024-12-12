<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useDetailedHelpRequests } from '../store/detailedHelpRequests';
import { useHelpRequests } from '../store/helpRequests';
import DetailedHelpCard from './DetailedHelpCard.vue';

const helpRequests = useHelpRequests();
const detailedHelpRequests = useDetailedHelpRequests();

onBeforeMount(() => {
  helpRequests.getHelpRequests();
  detailedHelpRequests.getRequestDetails('f2f48ea4-9172-4434-b55f-a94862c1529c');
});
</script>
<template>
  <DetailedHelpCard v-if="detailedHelpRequests.isData" :dataDetailedHelp="detailedHelpRequests.data" />
</template>
<style scoped></style>
