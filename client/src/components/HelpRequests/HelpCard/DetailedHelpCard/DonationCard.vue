<script setup lang="ts">
import { dateFormatting } from '@/general/dateFormatting';
import DonationStatusCard from './element/DonationStatusCard.vue';

interface IDonationData {
  goalDescription: string | undefined;
  endingDate: string | undefined;
  contributorsCount: number | undefined;
  requestGoalCurrentValue: number | undefined;
  requestGoal: number | undefined;
}

defineProps<{ donationData: IDonationData }>();
</script>
<template>
  <v-row style="margin: 0; padding: 0; padding: 0 20px"> <h6 class="mainTitle">Вместе для добрых дел</h6></v-row>
  <v-row style="margin: 0; padding: 0; padding: 0 20px">
    <v-col cols="5" md="12" style="margin: 0; padding: 0">
      <div style="display: flex; flex-direction: column; gap: 20px">
        <div class="blockDetailed">
          <span class="title">Цель сбора</span>
          <span class="description">{{ donationData.goalDescription }}</span>
        </div>
        <div class="blockDetailed" style="padding-bottom: 10px">
          <span class="title">Завершение</span>
          <span class="description">{{
            donationData.endingDate ? dateFormatting(donationData.endingDate) : 'Дата не указана'
          }}</span>
        </div>
      </div>
    </v-col>
    <v-col cols="7" md="12" style="margin: 0; padding: 0">
      <DonationStatusCard
        :requestGoalCurrentValue="donationData.requestGoalCurrentValue ?? 0"
        :requestGoal="donationData.requestGoal ?? 0"
        :contributorsCount="donationData.contributorsCount ?? 0"
      /> </v-col
  ></v-row>
</template>
<style scoped>
.mainTitle {
  font-size: 20px;
  font-weight: 500;
  padding-top: 20px;
  padding-bottom: 10px;
}
.title {
  font-size: 14px;
  font-weight: 500;
}
.blockDetailed {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.description {
  font-size: 14px;
}
</style>
