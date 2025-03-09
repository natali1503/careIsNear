<script setup lang="ts">
import { computed, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';

import { apiMessages } from '@/api/apiMessages';
import DetailedHelp from '@/components/HelpRequests/HelpCard/DetailedHelpCard/DetailedHelp.vue';
import DonationCard from '@/components/HelpRequests/HelpCard/DetailedHelpCard/DonationCard.vue';
import NoDataError from '@/components/NoDataError.vue';
import { useAuthStore } from '@/store/auth';
import { useDetailedHelpRequests } from '@/store/detailedHelpRequests';
import { useFavouritesRequestsHelp } from '@/store/favouritesRequestsHelp';
import { useToast } from 'vue-toastification';

import { useDisplay } from 'vuetify';
import PageTemplate from '../components/PageTemplate.vue';

const favouritesRequestsHelp = useFavouritesRequestsHelp();
const detailedHelpRequests = useDetailedHelpRequests();
const route = useRoute();
const id = route.params.id;
onBeforeMount(async () => {
  try {
    if (typeof id === 'string') await detailedHelpRequests.getRequestDetails(id);
    if (!favouritesRequestsHelp.isData) await favouritesRequestsHelp.getFavouritesRequestsHelp();
  } catch (codeError) {
    const toast = useToast();
    if (codeError === 500) toast.error(apiMessages.generalError);
    else if (codeError === 403) {
      const authStore = useAuthStore();
      authStore.logout();
      toast.error(apiMessages.sessionTime);
    } else toast.error('Что-то еще');
  }
});
const isError = computed(() => detailedHelpRequests.isError || favouritesRequestsHelp.isError);
const isData = computed(() => detailedHelpRequests.isData && favouritesRequestsHelp.isData);
const data = computed(() => detailedHelpRequests.data || {});
const donationData = computed(() => ({
  goalDescription: data.value.goalDescription,
  endingDate: data.value.endingDate,
  contributorsCount: data.value.contributorsCount,
  requestGoalCurrentValue: data.value.requestGoalCurrentValue,
  requestGoal: data.value.requestGoal,
}));
const display = useDisplay();
const isFavourites = computed(() => {
  if (favouritesRequestsHelp.isData) {
    if (typeof id === 'string') return favouritesRequestsHelp.favouritesId.includes(id) ? true : false;
  }
});
console.log(display.sm);
</script>
<template>
  <PageTemplate title="Запрос о помощи">
    <NoDataError v-if="isError" text="Ошибка! Не удалось загрузить информацию" />
    <v-col class="card detailedHelp" cols="12" md="7" v-if="isData" :style="{ order: display.mobile.value ? 1 : 0 }">
      <DetailedHelp :dataDetailedHelp="data" :isFavourites="isFavourites ?? false" />
    </v-col>
    <v-col class="card donationCard" cols="12" md="4" v-if="isData" :style="{ order: display.mobile.value ? 0 : 1 }">
      <DonationCard :donationData="donationData" />
    </v-col>
  </PageTemplate>
</template>
<style scoped>
.card {
  border-radius: 4px;
  background-color: #fff;
  margin: 0;
  padding: 0;
  height: min-content;
}
</style>
