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
  <v-col class="cardProfile" cols="12" md="3" style="padding: 0; height: min-content">
    <v-col style="margin: 0; padding: 0; justify-content: center">
      <UserImg />
    </v-col>
    <v-col cols="8" sm="12" class="briefInformation">
      <v-col cols="12" class="name">
        <h6 style="font-size: 20px; font-weight: 500">{{ name }} {{ lastname }}</h6>
      </v-col>
      <v-col cols="12" class="status">
        <p style="font-size: 14px">Статус: {{ status }}</p>
      </v-col>
      <v-col cols="12" class="btnConteiner">
        <v-btn class="btn" type="button" @click="onHandleLogout">Выйти из аккаунта</v-btn>
      </v-col>
    </v-col>
  </v-col>
</template>
<style scoped>
.cardProfile {
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
}
.briefInformation {
  border-top: 1px solid #e0e0e0;
  margin: 0;
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
.btnConteiner {
  padding-bottom: 20px;
  margin: 0;
  justify-content: center;
  display: flex;
}
.btn {
  border: 1px solid #000;
  padding: 0 12px;
  min-width: min-content;
}

@media (max-width: 1280px) {
  .btn {
    font-size: 12px;
  }
}
@media (max-width: 960px) {
  .cardProfile {
    flex-wrap: nowrap;
  }
  .briefInformation {
    border-top: 0;
    border-left: 1px solid #e0e0e0;
  }
  .btnConteiner {
    justify-content: flex-start;
  }
  .btn {
    font-size: 14px;
  }
  .name {
    padding-bottom: 0;
  }
  .status {
    margin-bottom: 20px;
    padding-bottom: 0;
  }
}
</style>
