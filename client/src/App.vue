<script setup lang="ts">
import { watch } from 'vue';
import { useRouter } from 'vue-router';
import Wrapper from './components/Wrapper.vue';

import { useAuthStore } from './store/auth';

const authStore = useAuthStore();
const router = useRouter();
authStore.restoreState();
watch(
  () => authStore.isAuth,
  () => {
    if (!authStore.isLoading) {
      if (!authStore.isAuth) router.push('/');
    }
  },
);
</script>

<template>
  <Wrapper> <RouterView /> </Wrapper>
</template>

<style scoped></style>
