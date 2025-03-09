<script setup lang="ts">
import { onBeforeMount, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

import TestProfilesMobile from '@/components/Login/TestProfilesMobile.vue';
import { useDisplay } from 'vuetify';
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
  (isAuth) => {
    if (isAuth) {
      router.push({ name: routesName.helpRequests, query: { page: 1 } });
    }
  },
);
function handleClickDataAuth(dataAuth: { login: string; password: string }) {
  if (!dataAuth.login || !dataAuth.password) return;
  login.value = dataAuth.login;
  password.value = dataAuth.password;
}
const display = useDisplay();
console.log(display.thresholds);
</script>

<template>
  <div class="main">
    <v-container style="width: 100%; padding: 0">
      <v-row
        style="flex-wrap: nowrap; height: 100%; margin: 0"
        :style="{ flexDirection: display.mobile.value ? 'column' : 'row' }"
      >
        <LoginForm v-model:login="login" v-model:password="password" />
        <v-divider :vertical="!display.mobile.value"></v-divider>
        <TestProfiles @dataAuth="handleClickDataAuth" v-if="!display.mobile.value" />
        <TestProfilesMobile @dataAuth="handleClickDataAuth" v-if="display.mobile.value" />
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
.main {
  display: flex;
  min-height: 100%;
  width: 100%;
}
</style>
