<script setup lang="ts">
import { getLocalStorage } from '@/general/localStorage/getLocalStorage';
import { watch } from 'vue';
import { useRouter } from 'vue-router';
import Wrapper from './components/Wrapper.vue';
import { routesName } from './router';
import { useAuthStore } from './store/auth';

const authStore = useAuthStore();
const router = useRouter();
authStore.restoreState();
watch(
  () => authStore.isAuth,
  (newValue, oldValue) => {
    if (!authStore.isLoading) {
      if (!authStore.isAuth) router.push('/');
    }
  },
);
</script>

<template>
  <Wrapper>
    <RouterView />
  </Wrapper>
</template>

<style scoped></style>
