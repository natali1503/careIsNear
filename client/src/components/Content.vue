<script setup lang="ts">
import { useDisplay } from 'vuetify';

const display = useDisplay();
</script>
<template>
  <div
    :style="{ margin: display.mobile.value ? 0 : '0 50px', display: 'flex', width: '100%', justifyContent: 'center' }"
  >
    <div style="display: flex; width: 100%; justify-content: center">
      <slot></slot>
    </div>
  </div>
</template>
<style scoped></style>
