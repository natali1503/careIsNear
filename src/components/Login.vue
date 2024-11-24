<script setup lang="ts">
import { dataAuthUser } from "../api/dataAuthUser";
import { useAuthStore } from "../store/auth";
import { ref } from "vue";
import UserIteam from "./UserIteam.vue";

const authSore = useAuthStore();
const login = ref("testUser15@test.com");
const password = ref("password15");

function onHandleAuthorization() {
  const paramsAuth = { login: login.value.trim(), password: password.value.trim() };
  authSore.authorization(paramsAuth.login, paramsAuth.password);
}
</script>

<template>
  <div class="main">
    <v-container style="width: 100%; padding: 0">
      <v-row style="flex-wrap: nowrap; height: 100%; margin: 0">
        <v-col md="6" style="border-left: 1px solid #e0e0e0; padding-top: 64px; padding-left: 40px">
          <p style="padding-bottom: 90px">Авторизация</p>
          <v-container>
            <v-container style="padding: 0">
              <p>Вход</p>
              <v-text-field type="text" label="Логин" variant="outlined" placeholder="Введите e-mail" v-model="login" class="input" />
              <v-text-field type="text" label="Пароль" variant="outlined" placeholder="Введите пароль" v-model="password" class="input" />
            </v-container>
            <v-btn type="button" @click="onHandleAuthorization" variant="elevated" color="primary" class="btn">Войти</v-btn>
          </v-container>
        </v-col>

        <v-col md="6" style="border-left: 1px solid #e0e0e0; border-right: 1px solid #e0e0e0; padding-top: 64px; padding-left: 40px">
          <p style="margin-bottom: 90px">Тестовые профили</p>
          <div v-for="dataAuth in dataAuthUser" :key="dataAuth.id" class="dataAuthUserIteam">
            <v-col cols="10" style="padding: 0">
              <UserIteam :dataAuth="dataAuth" />
            </v-col>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <!-- <button type="button" @click="authSore.logout">Выйти</button> -->
    <div v-if="authSore.isError" class="error">Error</div>
  </div>
</template>

<style scoped>
.main {
  display: flex;
  min-height: 100%;
}
.input {
}
.btn {
  width: 100%;
}
.dataAuthUserIteam {
  margin-bottom: 30px;
}
</style>
