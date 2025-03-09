<script setup lang="ts">
import NoDataError from '../../public/img/noDataError.svg';
defineProps<{ text: string }>();
</script>
<template>
  <v-col
    style="
      padding: 0;
      height: 100%;
      background-color: #fff;
      display: flex;
      justify-content: center;
      flex-direction: column;
    "
  >
    <div style="display: flex; align-items: center; flex-direction: column; gap: 20px">
      <NoDataError style="max-width: 390px" />
      <p style="font-size: 24px">{{ text }}</p>
    </div>
  </v-col>
</template>
<style scoped></style>
