<script setup lang="ts">
import Row from './Row.vue';
defineProps<{ city: string; district: string }>();
</script>
<template>
  <div>
    <Row title="Область" :description="district" />
    <Row title="Насленный пункт" :description="city" />
  </div>
</template>
<style scoped></style>
