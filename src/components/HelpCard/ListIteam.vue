<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { dateFormatting } from '../../general/dateFormatting';
import { useDetailedHelpRequests } from '../../store/detailedHelpRequests';
import DataCell from '../DataCell.vue';

const detailedHelpRequests = useDetailedHelpRequests();
onBeforeMount(() => {
  detailedHelpRequests.getRequestDetails('f2f48ea4-9172-4434-b55f-a94862c1529c');
});
const requestGoalCurrentValueFormat = new Intl.NumberFormat('ru-RU', { style: 'decimal' })
  .format(detailedHelpRequests.data.requestGoalCurrentValue)
  .concat(' руб');

const requestGoalFormat = new Intl.NumberFormat('ru-RU', { style: 'decimal' })
  .format(detailedHelpRequests.data.requestGoal)
  .concat(' руб');

const contributorsCountFormat = new Intl.NumberFormat('ru-RU', { style: 'decimal' }).format(
  detailedHelpRequests.data.contributorsCount,
);
const percentageOfAssistance =
  Math.round(detailedHelpRequests.data.requestGoalCurrentValue / detailedHelpRequests.data.requestGoal) * 100;
</script>
<template>
  <v-container
    style="width: 100%; padding: 0; height: max-content; border-bottom: 1px solid rgba(0, 0, 0, 0.12)"
    v-if="detailedHelpRequests.isData"
  >
    <v-row style="margin: 0; padding: 20px 50px">
      <v-col style="padding: 0">
        <h5 class="title">{{ detailedHelpRequests.data.title.split(' ').slice(1).join(' ') }}</h5>
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
      </v-col>
      <v-col style="padding: 0">
        <DataCell title="Организатор" :data="[{ description: detailedHelpRequests.data.organization.title }]" />
        <DataCell title="Завершение" :data="[{ description: dateFormatting(detailedHelpRequests.data.endingDate) }]" />
      </v-col>
      <v-col style="padding: 0">
        <DataCell
          title="Локация"
          :data="[
            { subtitle: 'Область: ', description: detailedHelpRequests.data.location.district },
            { subtitle: 'Насленный пункт: ', description: detailedHelpRequests.data.location.city },
          ]"
          type="column"
        />
        <DataCell title="Цель сбора" :data="[{ description: detailedHelpRequests.data.goalDescription }]" />
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped>
.title {
  font-size: 24px;
  font-weight: 400;
}
</style>
