<script setup lang="ts"></script>
<template>
  <div style="display: flex; height: 100%; align-items: center; width: 100%; justify-content: center">
    <v-progress-circular indeterminate :size="75" :width="7" color="#1E88E5"></v-progress-circular>
  </div>
</template>
<style scoped>
.v-progress-circular--indeterminate,
.v-progress-circular__overlay {
  animation:
    progress-circular-dash 3.4s ease-in-out infinite,
    progress-circular-rotate 5.4s linear infinite;
}
</style>
