<script setup lang="ts">
import { onBeforeMount, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import LoginForm from '../components/Login/LoginForm.vue';
import TestProfiles from '../components/Login/TestProfiles.vue';
import { routesName } from '../router';
import { useAuthStore } from '../store/auth';

const authStore = useAuthStore();
const login = ref('');
const password = ref('');

const router = useRouter();
onBeforeMount(() => {});
watch(
  () => authStore.isAuth,
  (isAuth, oldValue) => {
    if (isAuth) {
      router.push(routesName.helpRequests);
    }
  },
);
function handleClickDataAuth(dataAuth: { login: string; password: string }) {
  if (!dataAuth.login || !dataAuth.password) return;
  login.value = dataAuth.login;
  password.value = dataAuth.password;
}
</script>

<template>
  <div class="main">
    <v-container style="width: 100%; padding: 0">
      <v-row style="flex-wrap: nowrap; height: 100%; margin: 0">
        <LoginForm v-model:login="login" v-model:password="password" />
        <TestProfiles @dataAuth="handleClickDataAuth" />
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
.main {
  display: flex;
  min-height: 100%;
}
</style>
