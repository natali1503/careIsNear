<script setup lang="ts">
import Row from './Row.vue';
const props = defineProps({ city: String, district: String });
</script>
<template>
  <div>
    <Row title="Область" :description="district" />
    <Row title="Насленный пункт" :description="city" />
  </div>
</template>
<style scoped></style>
