<script setup lang="ts">
import { temp } from "./temp";
import { useAuthStore } from "../store/auth";
import { ref } from "vue";

const authSore = useAuthStore();
const login = ref("testUser15@test.com");
const password = ref("password15");

function onHandleAuthorization() {
  const paramsAuth = { login: login.value.trim(), password: password.value.trim() };
  authSore.authorization(paramsAuth.login, paramsAuth.password);
}
</script>

<template>
  <div class="card">
    <input type="text" placeholder="Логин" v-model="login" />
    <input type="text" placeholder="Пароль" v-model="password" />
    <button type="button" @click="onHandleAuthorization">Войти</button>
    <!-- <button type="button" @click="authSore.logout">Выйти</button> -->
  </div>
</template>

<style scoped></style>
