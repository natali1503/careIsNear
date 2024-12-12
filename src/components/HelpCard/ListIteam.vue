<script setup lang="ts">
import { HelpRequestData } from '@/api/generated';
import { onBeforeMount } from 'vue';
import { dateFormatting } from '../../general/dateFormatting';
import { useDetailedHelpRequests } from '../../store/detailedHelpRequests';
import DataCell from '../DataCell.vue';
import FavoriteButton from '../FavoriteButton.vue';
import DonationStatusCard from './DetailedHelpCard/element/DonationStatusCard.vue';

const props = defineProps<{ helpRequestDataIteam: HelpRequestData }>();
</script>
<template>
  <v-container style="width: 100%; padding: 0; height: max-content; border-bottom: 1px solid rgba(0, 0, 0, 0.12)">
    <v-row style="margin: 0; margin-bottom: 30px; margin-top: 20px">
      <!-- padding: 20px 50px -->
      <v-col style="padding: 0">
        <h5 class="title">{{ helpRequestDataIteam.title.split(' ').slice(1).join(' ') }}</h5>
      </v-col>
      <v-col style="padding: 0; margin-left: 30px">
        <DataCell title="Организатор" :data="[{ description: helpRequestDataIteam.organization.title }]" />
      </v-col>
      <v-col style="padding: 0; margin-left: 30px">
        <DataCell
          title="Локация"
          :data="[
            { subtitle: 'Область: ', description: helpRequestDataIteam.location.district },
            { subtitle: 'Насленный пункт: ', description: helpRequestDataIteam.location.city },
          ]"
          type="column"
        />
      </v-col>
      <v-col style="padding: 0">
        <FavoriteButton :empty="true" type="withText" operation="add" />
      </v-col>
    </v-row>
    <v-row style="margin: 0">
      <v-col style="padding: 0">
        <DonationStatusCard
          :requestGoalCurrentValue="helpRequestDataIteam.requestGoalCurrentValue"
          :requestGoal="helpRequestDataIteam.requestGoal"
          :contributorsCount="helpRequestDataIteam.contributorsCount"
        />
      </v-col>
      <v-col style="padding: 0; margin-left: 30px">
        <DataCell title="Завершение" :data="[{ description: dateFormatting(helpRequestDataIteam.endingDate) }]"
      /></v-col>
      <v-col style="padding: 0; margin-left: 30px">
        <DataCell title="Цель сбора" :data="[{ description: helpRequestDataIteam.goalDescription }]"
      /></v-col>
      <v-col style="padding: 0"></v-col>
    </v-row>
  </v-container>
</template>
<style scoped>
.title {
  font-size: 24px;
  font-weight: 400;
  min-height: 145px;
}
</style>
