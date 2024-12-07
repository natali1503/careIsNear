<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useProfileInfo } from '../store/profileInfo';
const profileInfoStore = useProfileInfo();

onBeforeMount(() => {
  profileInfoStore.getProfileInfo();
});
</script>
<template>profile</template>
<style scoped></style>
