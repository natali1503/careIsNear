<script setup lang="ts">
import { HelpRequestData } from '../api/generated';
import DetailedHelp from '../components/DetailedHelpCard/DetailedHelp.vue';
import DonationCard from '../components/DetailedHelpCard/DonationCard.vue';
import PageTemplate from '../components/PageTemplate.vue';

const props = defineProps<{ dataDetailedHelp: HelpRequestData }>();
const donationData = {
  goalDescription: props.dataDetailedHelp.goalDescription,
  endingDate: props.dataDetailedHelp.endingDate,
  contributorsCount: props.dataDetailedHelp.contributorsCount,
  requestGoalCurrentValue: props.dataDetailedHelp.requestGoalCurrentValue,
  requestGoal: props.dataDetailedHelp.requestGoal,
};
</script>
<template>
  <PageTemplate title="Запрос о помощи">
    <v-col class="card" cols="12" md="7" style="order: 0"> <DetailedHelp :dataDetailedHelp="dataDetailedHelp" /></v-col>
    <v-col class="card" cols="12" md="4"><DonationCard :donationData="donationData" /></v-col>
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
