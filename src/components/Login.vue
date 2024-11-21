<script setup lang="ts">
import { useAuthStore } from "../store/auth";
import { ref } from "vue";

const authSore = useAuthStore();
const login = ref("");
const password = ref("");

function onHandleAuthorization() {
  const paramsAuth = { login: login.value.trim(), password: password.value.trim() };
  password;
  authSore.authorization(paramsAuth.login, paramsAuth.password);
}
</script>

<template>
  <div class="card">
    <input type="text" placeholder="Логин" v-model="login" />
    <input type="text" placeholder="Пароль" v-model="password" />
    <button type="button" @click="onHandleAuthorization">Войти</button>
  </div>
</template>

<style scoped></style>
