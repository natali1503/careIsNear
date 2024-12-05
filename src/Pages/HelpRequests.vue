<script setup lang="ts">
import { useHelpRequests } from '../store/helpRequests';
import { onBeforeMount } from 'vue';

const helpRequests = useHelpRequests();

onBeforeMount(() => {
  helpRequests.getHelpRequests();
});
</script>
<template>HelpRequests</template>
<style scoped></style>
