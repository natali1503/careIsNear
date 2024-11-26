<script setup lang="ts">
import { dataAuthUser } from '../api/dataAuthUser';
import { useAuthStore } from '../store/auth';
import { ref, watch } from 'vue';
import UserIteam from './Login/UserIteam.vue';
import { useRouter } from 'vue-router';
import { routesName } from '../router';

const authStore = useAuthStore();
const login = ref('');
const password = ref('');
const isShowPassword = ref(false);
const router = useRouter();

function onHandleAuthorization() {
  const paramsAuth = { login: login.value.trim(), password: password.value.trim() };
  authStore.authorization(paramsAuth.login, paramsAuth.password);
}
watch(
  () => authStore.isAuth,
  (isAuth, oldValue) => {
    if (isAuth) {
      router.push(routesName.helpRequests);
    }
  }
);
function handleClickDataAuth(id: number) {
  const dataAuth = dataAuthUser.filter((el) => el.id === id);
  login.value = dataAuth[0].login;
  password.value = dataAuth[0].password;
}
function handleClickShowPassword() {
  isShowPassword.value = !isShowPassword.value;
}
</script>

<template>
  <div class="main">
    <v-container style="width: 100%; padding: 0">
      <v-row style="flex-wrap: nowrap; height: 100%; margin: 0">
        <v-col md="6" style="border-left: 1px solid #e0e0e0; padding-top: 64px; padding-left: 40px">
          <v-col md="10">
            <p style="padding-bottom: 90px">Авторизация</p>
            <v-container>
              <v-container style="padding: 0">
                <p style="padding-bottom: 35px">Вход</p>
                <v-text-field
                  type="text"
                  label="Логин"
                  variant="outlined"
                  placeholder="Введите e-mail"
                  v-model="login"
                  class="input"
                  persistent-placeholder
                />
                <v-text-field
                  label="Пароль"
                  variant="outlined"
                  placeholder="Введите пароль"
                  v-model="password"
                  class="input"
                  persistent-placeholder
                  :type="isShowPassword ? 'text' : 'password'"
                  :append-inner-icon="isShowPassword ? 'mdi-eye-off' : 'mdi-eye'"
                  @click:append-inner="handleClickShowPassword"
                />
              </v-container>
              <v-btn type="button" @click="onHandleAuthorization" variant="elevated" color="primary" class="btn"
                >Войти</v-btn
              >
            </v-container>
          </v-col>
        </v-col>

        <v-col
          md="6"
          style="border-left: 1px solid #e0e0e0; border-right: 1px solid #e0e0e0; padding-top: 64px; padding-left: 40px"
        >
          <p style="margin-bottom: 90px">Тестовые профили</p>
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
      </v-row>
    </v-container>
    <!-- <button type="button" @click="authSore.logout">Выйти</button> -->
    <div v-if="authStore.isError" class="error">Error</div>
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
