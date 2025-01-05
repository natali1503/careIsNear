<script setup lang="ts">
import { apiMessages } from '@/api/apiMessages';
import { defineEmits, ref } from 'vue';
import { useToast } from 'vue-toastification';
import { useAuthStore } from '../../store/auth';

const authStore = useAuthStore();
const props = defineProps({ login: String, password: String });
const emit = defineEmits(['update:login', 'update:password']);

async function onHandleAuthorization(_) {
  const paramsAuth = { login: props.login, password: props.password };
  try {
    await authStore.authorization(paramsAuth.login, paramsAuth.password);
  } catch (codeError) {
    const toast = useToast();
    if (codeError === 500) toast.error(apiMessages.auth.error[codeError]);
    else if (codeError === 400) toast.error(apiMessages.auth.error[codeError]);
    else toast.error('Что-то еще');
  }
}

const isShowPassword = ref(false);
function handleClickShowPassword() {
  isShowPassword.value = !isShowPassword.value;
}
function updateLogin(event) {
  const target = event.target as HTMLInputElement;
  emit('update:login', event.target.value);
}
function updatePassword(event) {
  const target = event.target as HTMLInputElement;
  emit('update:password', event.target.value);
}
</script>
<template>
  <v-col md="6" style="border-left: 1px solid #e0e0e0; padding-top: 64px; padding-left: 40px">
    <h4 style="padding-bottom: 90px; font-size: 34px; font-weight: 400">Авторизация</h4>
    <v-container>
      <v-container style="padding: 0">
        <p style="padding-bottom: 35px; font-size: 24px">Вход</p>
        <v-text-field
          type="text"
          label="Логин"
          variant="outlined"
          placeholder="Введите e-mail"
          :model-value="login"
          @input="updateLogin"
          class="input"
          persistent-placeholder
        />
        <v-text-field
          label="Пароль"
          variant="outlined"
          placeholder="Введите пароль"
          class="input"
          persistent-placeholder
          :model-value="password"
          @input="updatePassword"
          :type="isShowPassword ? 'text' : 'password'"
          :append-inner-icon="isShowPassword ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append-inner="handleClickShowPassword"
        />
      </v-container>
      <v-btn type="button" @click="onHandleAuthorization" variant="elevated" color="primary" class="btn">Войти</v-btn>
    </v-container>
  </v-col>
</template>
<style scoped>
.btn {
  width: 100%;
}
</style>
