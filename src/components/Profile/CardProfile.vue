<script setup lang="ts">
import { useAuthStore } from '../../store/auth';
import UserImg from './element/UserImg.vue';

const props = defineProps({ name: String, lastname: String, status: String });
const authStore = useAuthStore();
function onHandleLogout() {
  authStore.logout();
}
</script>
<template>
  <v-col class="cardProfile" cols="12" md="4" style="padding: 0; height: min-content">
    <v-row style="margin: 0; justify-content: center">
      <UserImg />
    </v-row>
    <v-row style="border-top: 1px solid #e0e0e0; margin: 0">
      <v-row class="name">
        <h6 style="font-size: 20px; font-weight: 500">{{ name }} {{ lastname }}</h6>
      </v-row>
      <v-row class="status">
        <p style="font-size: 14px">Статус: {{ status }}</p>
      </v-row>
      <v-row style="padding-left: 20px; padding-right: 20px; padding-bottom: 20px; margin: 0">
        <v-btn class="btn" type="button" @click="onHandleLogout" style="width: 100%">Выйти из аккаунта</v-btn>
      </v-row>
    </v-row>
  </v-col>
</template>
<style scoped>
.cardProfile {
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 4;
}
.name {
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
  margin: 0;
  margin-bottom: 10px;
}
.status {
  margin: 0;
  padding-left: 20px;
  padding-right: 20px;
  margin-bottom: 50px;
}
.btn {
  border: 1px solid #000;
}
</style>
