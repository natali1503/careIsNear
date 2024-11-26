<script setup lang="ts">
import Logo from './Logo.vue';
import HeaderMenu from './HeaderMenu.vue';
</script>
<template>
  <v-container style="padding: 0">
    <v-row style="justify-content: center; max-height: 84px; margin: 0; height: 100%; align-items: center">
      <v-col md="4"><Logo /></v-col>
      <v-col md="4" style="display: flex; justify-content: center"> Запросы о помощи </v-col>
      <v-col md="4" style="display: flex; justify-content: flex-end">
        <HeaderMenu />
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped></style>
