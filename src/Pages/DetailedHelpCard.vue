<script setup lang="ts">
import { computed, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';

import DetailedHelp from '@/components/HelpRequests/HelpCard/DetailedHelpCard/DetailedHelp.vue';
import DonationCard from '@/components/HelpRequests/HelpCard/DetailedHelpCard/DonationCard.vue';
import NoDataError from '@/components/NoDataError.vue';
import { useDetailedHelpRequests } from '@/store/detailedHelpRequests';
import { useFavouritesRequestsHelp } from '@/store/favouritesRequestsHelp';
import PageTemplate from '../components/PageTemplate.vue';

const favouritesRequestsHelp = useFavouritesRequestsHelp();
const detailedHelpRequests = useDetailedHelpRequests();
const route = useRoute();
const id = route.params.id;
onBeforeMount(() => {
  if (typeof id === 'string') detailedHelpRequests.getRequestDetails(id);
  if (!favouritesRequestsHelp.isData) favouritesRequestsHelp.getFavouritesRequestsHelp();
});
const isLoading = computed(() => detailedHelpRequests.isLoading);
const isError = computed(() => detailedHelpRequests.isError || favouritesRequestsHelp.isError);
const isData = computed(() => detailedHelpRequests.isData || false);
const data = computed(() => detailedHelpRequests.data || {});
const donationData = computed(() => ({
  goalDescription: data.value.goalDescription,
  endingDate: data.value.endingDate,
  contributorsCount: data.value.contributorsCount,
  requestGoalCurrentValue: data.value.requestGoalCurrentValue,
  requestGoal: data.value.requestGoal,
}));

const isFavourites = computed(() => {
  if (favouritesRequestsHelp.isData) {
    if (typeof id === 'string') return favouritesRequestsHelp.favouritesId.includes(id) ? true : false;
  }
});
</script>
<template>
  <PageTemplate title="Запрос о помощи">
    <NoDataError v-if="isError" text="Ошибка! Не удалось загрузить информацию" />
    <v-col class="card" cols="12" md="7" style="order: 0" v-if="isData">
      <DetailedHelp :dataDetailedHelp="data" :isFavourites="isFavourites" />
    </v-col>
    <v-col class="card" cols="12" md="4" v-if="isData">
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
