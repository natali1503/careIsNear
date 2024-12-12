<script setup lang="ts">
import { computed, onBeforeMount } from 'vue';
import PageTemplate from '../components/PageTemplate.vue';
import CardProfile from '../components/Profile/CardProfile.vue';
import ProfileInfo from '../components/Profile/ProfileInfo.vue';
import { useProfileInfo } from '../store/profileInfo';

const profileInfoStore = useProfileInfo();
onBeforeMount(() => {
  profileInfoStore.getProfileInfo();
});
const isLoading = computed(() => profileInfoStore.isLoading);
const isError = computed(() => profileInfoStore.isError);
const isData = computed(() => profileInfoStore.isData || false);
const data = computed(() => profileInfoStore.data || {});
</script>
<template>
  <div style="width: 100%; padding: 0; height: 100%">
    <PageTemplate title="Мой профиль">
      <CardProfile v-if="isData" :name="data.name" :lastname="data.lastName" :status="data.status" />
      <ProfileInfo v-if="isData" :dataUser="data" />
    </PageTemplate>
  </div>
</template>
<style scoped></style>
