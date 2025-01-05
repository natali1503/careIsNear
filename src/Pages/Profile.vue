<script setup lang="ts">
import { computed, onBeforeMount } from 'vue';
import PageTemplate from '../components/PageTemplate.vue';
import CardProfile from '../components/Profile/CardProfile.vue';
import ProfileInfo from '../components/Profile/ProfileInfo.vue';

import { apiMessages } from '@/api/apiMessages';
import Loading from '@/components/Loading.vue';
import NoDataError from '@/components/NoDataError.vue';
import { useToast } from 'vue-toastification';
import { useProfileInfo } from '../store/profileInfo';

const profileInfoStore = useProfileInfo();

onBeforeMount(async () => {
  try {
    await profileInfoStore.getProfileInfo();
  } catch (codeError) {
    const toast = useToast();
    if (codeError === 500) toast.error(apiMessages.generalError);
    else toast.error('Что-то еще');
  }
});
const isLoading = computed(() => profileInfoStore.isLoading);
const isError = computed(() => profileInfoStore.isError);
const isData = computed(() => profileInfoStore.isData || false);
const data = computed(() => profileInfoStore.data || {});
</script>
<template>
  <div style="width: 100%; padding: 0; height: 100%">
    <PageTemplate title="Мой профиль">
      <NoDataError v-if="isError" text="Ошибка! Не удалось загрузить информацию" />
      <Loading v-if="isLoading" />
      <CardProfile v-if="isData" :name="data.name" :lastname="data.lastName" :status="data.status" />
      <ProfileInfo v-if="isData" :dataUser="data" />
    </PageTemplate>
  </div>
</template>
<style scoped></style>
