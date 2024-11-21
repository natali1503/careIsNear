<script setup lang="ts">
import { useCounterStore } from "../store/counter";
import { storeToRefs } from "pinia";
import { api } from "../api/api";
import { useAuthStore } from "../store/auth";
import { ref } from "vue";
const store = useCounterStore();
const { count, isPositiv } = storeToRefs(store);
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
    <button type="button" @click="store.increment">count is {{ count }}</button>
    <input type="text" placeholder="Логин" v-model="login" />
    <input type="text" placeholder="Пароль" v-model="password" />
    <button type="button" @click="onHandleAuthorization">Войти</button>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
