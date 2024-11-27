<script setup lang="ts">
import { dataAuthUser } from '../../api/dataAuthUser';
import UserIteam from './UserIteam.vue';
const emit = defineEmits(['dataAuth']);

function handleClickDataAuth(id: number) {
  const dataAuth = dataAuthUser.filter((el) => el.id === id);
  emit('dataAuth', dataAuth[0]);
}
</script>
<template>
  <v-col
    md="6"
    style="border-left: 1px solid #e0e0e0; border-right: 1px solid #e0e0e0; padding-top: 64px; padding-left: 40px"
  >
    <h4 style="padding-bottom: 90px; font-size: 34px; font-weight: 400">Тестовые профили</h4>
    <div
      v-for="dataAuth in dataAuthUser"
      :key="dataAuth.id"
      class="dataAuthUserIteam"
      @click="handleClickDataAuth(dataAuth.id)"
    >
      <v-col cols="8" style="padding: 0">
        <UserIteam :dataAuth="dataAuth" />
      </v-col>
    </div>
  </v-col>
</template>
<style scoped>
.dataAuthUserIteam {
  margin-bottom: 30px;
}
</style>
