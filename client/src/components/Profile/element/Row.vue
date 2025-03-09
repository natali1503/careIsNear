<script setup lang="ts">
defineProps<{ title?: String; description: String }>();
</script>
<template>
  <div>
    <span v-if="title" style="font-size: 14; font-weight: 500">{{ title }}: </span>
    <span style="font-size: 14; font-weight: 400"> {{ description }}</span>
  </div>
</template>
<style scoped></style>
