<script setup lang="ts">
import { sendDonation } from '@/general/sendDonation';
import { useRoute } from 'vue-router';

const props = defineProps<{
  requestGoalCurrentValue: number;
  requestGoal: number;
  contributorsCount: number;
}>();
const route = useRoute();
const requestGoalCurrentValueFormat = new Intl.NumberFormat('ru-RU', { style: 'decimal' })
  .format(props.requestGoalCurrentValue)
  .concat(' руб');
const requestGoalFormat = new Intl.NumberFormat('ru-RU', { style: 'decimal' }).format(props.requestGoal).concat(' руб');
const contributorsCountFormat = new Intl.NumberFormat('ru-RU', { style: 'decimal' }).format(props.contributorsCount);
const percentageOfAssistance = Math.round(props.requestGoalCurrentValue / props.requestGoal) * 100;

function onHandleClick() {
  const id = route.params.id;
  if (typeof id === 'string') sendDonation(id);
}
</script>
<template>
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
        <v-btn style="width: 100%" color="primary" @click="onHandleClick">Помочь</v-btn>
      </div>
    </div>
  </div>
</template>
<style scoped>
.title {
  font-size: 14px;
  font-weight: 500;
}
</style>
