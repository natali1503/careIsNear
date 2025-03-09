<script setup lang="ts">
defineProps<{ isVerified: boolean }>();
</script>
<template>
  <div style="display: flex; flex-direction: row; align-items: center; gap: 4px">
    <div style="display: flex">
      <v-icon size="small" :icon="'mdi-check-decagram'" :color="isVerified ? '#1E88E5' : '#e0e0e0'"></v-icon>
    </div>
    <div>
      <p style="font-size: 12px">{{ isVerified ? 'Организация проверена' : 'Организация не проверена' }}</p>
    </div>
  </div>
</template>
<style scoped></style>
