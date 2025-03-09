<script setup lang="ts">
import NotFoundResult from '../../public/img/notFoundResult.svg';
defineProps<{ text: string }>();
</script>
<template>
  <v-col>
    <div style="display: flex; align-items: center; flex-direction: column; gap: 20px">
      <NotFoundResult style="max-width: 362px" />
      <p style="font-size: 24px">{{ text }}</p>
    </div>
  </v-col>
</template>
<style scoped></style>
