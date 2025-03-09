<script setup lang="ts">
import { useRouter } from 'vue-router';
import { routesName } from '../../router';
import HeaderMenu from './HeaderMenu.vue';
import Logo from './Logo.vue';

const router = useRouter();
</script>
<template>
  <v-row style="justify-content: center; max-height: 84px; margin: 0; height: 100%; align-items: center">
    <v-col style="padding: 0"><Logo /></v-col>
    <v-col style="display: flex; justify-content: center; padding: 0; width: 100%">
      <button
        @click="
          () => {
            router.push({ name: routesName.helpRequests, query: { page: 1 } });
          }
        "
      >
        Запросы о помощи
      </button>
    </v-col>
    <v-col style="display: flex; justify-content: flex-end; padding: 0">
      <HeaderMenu />
    </v-col>
  </v-row>
</template>
<style scoped></style>
