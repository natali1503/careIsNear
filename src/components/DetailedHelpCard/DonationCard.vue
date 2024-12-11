<script setup lang="ts">
import { dateFormatting } from '../../general/dateFormatting';

const props = defineProps<{ donationData }>();
const requestGoalCurrentValueFormat = new Intl.NumberFormat('ru-RU', { style: 'decimal' })
  .format(props.donationData.requestGoalCurrentValue)
  .concat(' руб');

const requestGoalFormat = new Intl.NumberFormat('ru-RU', { style: 'decimal' })
  .format(props.donationData.requestGoal)
  .concat(' руб');

const contributorsCountFormat = new Intl.NumberFormat('ru-RU', { style: 'decimal' }).format(
  props.donationData.contributorsCount,
);
const percentageOfAssistance =
  Math.round(props.donationData.requestGoalCurrentValue / props.donationData.requestGoal) * 100;
</script>
<template>
  <v-col cols="4" md="12">
    <div style="display: flex; flex-direction: column; gap: 20px">
      <h6 class="mainTitle">Вместе для добрых дел</h6>
      <div class="blockDetailed">
        <span class="title">Цель сбора</span>
        <span class="description">{{ props.donationData.goalDescription }}</span>
      </div>
      <div class="blockDetailed">
        <span class="title">Завершение</span>
        <span class="description">{{ dateFormatting(props.donationData.endingDate) }}</span>
      </div>
    </div>
  </v-col>
  <v-col cols="8" md="12">
    <div style="display: flex; flex-direction: column; gap: 40px">
      <div style="display: flex; flex-direction: column; gap: 4px">
        <span class="title">Мы собрали</span>
        <div>
          <v-progress-linear
            :model-value="percentageOfAssistance"
            :height="4"
            color="primary"
            style="border-radius: 16px"
          ></v-progress-linear>
        </div>
        <div style="display: flex; flex-direction: row; justify-content: space-between">
          <div style="color: rgba(0, 0, 0, 0.6)">
            {{ requestGoalCurrentValueFormat }}
          </div>
          <div style="color: rgba(0, 0, 0, 0.6)">{{ requestGoalFormat }}</div>
        </div>
      </div>
      <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px">
        <span style="color: rgba(0, 0, 0, 0.6)">Нас уже: {{ contributorsCountFormat }}</span>
        <div>
          <v-btn style="width: 100%" color="primary">Помочь</v-btn>
        </div>
      </div>
    </div>
  </v-col>
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
contributorsCount requestGoalCurrentValue requestGoal
