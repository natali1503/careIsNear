<script setup lang="ts">
import Wrapper from './components/Wrapper.vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from './store/auth';
import { routesName } from './router';
import { watch } from 'vue';

const authStore = useAuthStore();
const router = useRouter();

watch(
  () => authStore.isAuth,
  (newValue, oldValue) => {
    if (!authStore.isLoading) {
      if (!authStore.isAuth) router.push('/');
    }
  }
);
</script>

<template>
  <Wrapper>
    <RouterView />
  </Wrapper>
</template>

<style scoped></style>
