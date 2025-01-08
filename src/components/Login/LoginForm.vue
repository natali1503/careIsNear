<script setup lang="ts">
import { apiMessages } from '@/api/apiMessages';
import { defineEmits, ref } from 'vue';
import { useToast } from 'vue-toastification';
import { useDisplay } from 'vuetify/lib/framework.mjs';
import { useAuthStore } from '../../store/auth';

const authStore = useAuthStore();
const props = defineProps({ login: String, password: String });
const emit = defineEmits(['update:login', 'update:password']);
const display = useDisplay();
async function onHandleAuthorization(_) {
  const paramsAuth = { login: props.login, password: props.password };
  try {
    await authStore.authorization(paramsAuth.login, paramsAuth.password);
  } catch (codeError) {
    const toast = useToast();
    if (codeError === 500) toast.error(apiMessages.auth.error[codeError]);
    else if (codeError === 400) toast.error(apiMessages.auth.error[codeError]);
    else if (codeError === 403) {
      authStore.logout();
      toast.error(apiMessages.sessionTime);
    } else toast.error('Что-то еще');
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
  <v-col md="6" :class="display.mobile.value ? 'authorizationSm' : 'authorization'">
    <div>
      <h4 style="font-size: 34px; font-weight: 400" :style="{ paddingBottom: display.mobile.value ? '40px' : '90px' }">
        Авторизация
      </h4>
    </div>

    <div style="min-width: 300px">
      <div style="padding: 0">
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
          style="max-width: 485px"
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
          style="max-width: 485px"
        />
      </div>
      <v-btn
        type="button"
        @click="onHandleAuthorization"
        variant="elevated"
        color="primary"
        style="max-width: 485px"
        class="btn"
        >Войти</v-btn
      >
    </div>
  </v-col>
</template>
<style scoped>
.authorization {
  border-left: 1px solid #e0e0e0;
  padding-top: 64px;
  padding-left: 40px;
}
.authorizationSm {
  padding: 0;
  padding: 30px 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.btn {
  width: 100%;
}
</style>
