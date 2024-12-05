<script setup lang="ts">
import Logo from './Logo.vue';
import HeaderMenu from './HeaderMenu.vue';
import { useRouter } from 'vue-router';
import { routesName } from '../../router';

const router = useRouter();
</script>
<template>
  <v-container style="padding: 0">
    <v-row style="justify-content: center; max-height: 84px; margin: 0; height: 100%; align-items: center">
      <v-col md="4"><Logo /></v-col>
      <v-col md="4" style="display: flex; justify-content: center">
        <button @click="router.push(routesName.helpRequests)">Запросы о помощи</button>
      </v-col>
      <v-col md="4" style="display: flex; justify-content: flex-end">
        <HeaderMenu />
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped></style>
