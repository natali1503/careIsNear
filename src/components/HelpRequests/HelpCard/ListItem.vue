<script setup lang="ts">
import type { HelpRequestData } from '@/api/generated';
import { routesName } from '@/router';
import { useRouter } from 'vue-router';

import FavoriteButton from '@/components/FavoriteButton.vue';
import { dateFormatting } from '@/general/dateFormatting';

import { useDisplay } from 'vuetify';
import DataCell from '../DataCell.vue';
import DonationStatusCard from './DetailedHelpCard/element/DonationStatusCard.vue';

const props = defineProps<{ helpRequestDataIteam: HelpRequestData; isFavourites: boolean }>();
const router = useRouter();

function handleClick() {
  router.push({ name: routesName.helpRequestDetails, params: { id: props.helpRequestDataIteam.id } });
}
const display = useDisplay();
</script>
<template>
  <v-container @click="handleClick" class="listItem">
    <v-row style="margin: 0; margin-bottom: 30px; margin-top: 20px">
      <!-- padding: 20px 50px -->
      <v-col style="padding: 0">
        <h5 class="title" :style="{ fontSize: display.mobile.value ? '20px' : '24px' }">
          {{ helpRequestDataIteam.title?.split(' ').slice(1).join(' ') }}
        </h5>
      </v-col>
      <v-col style="padding: 0; margin-left: 30px">
        <DataCell title="Организатор" :data="[{ description: helpRequestDataIteam.organization?.title }]" />
      </v-col>
      <v-col style="padding: 0; margin-left: 30px">
        <DataCell
          title="Локация"
          :data="[
            { subtitle: 'Область: ', description: helpRequestDataIteam.location?.district },
            { subtitle: 'Насленный пункт: ', description: helpRequestDataIteam.location?.city },
          ]"
          type="column"
        />
      </v-col>
      <v-col style="padding: 0; display: flex; justify-content: flex-end">
        <FavoriteButton :id="helpRequestDataIteam.id ?? ''" :isFavourites="isFavourites" type="withText" />
      </v-col>
    </v-row>
    <v-row style="margin: 0">
      <v-col style="padding: 0">
        <DonationStatusCard
          :requestGoalCurrentValue="helpRequestDataIteam.requestGoalCurrentValue ?? 0"
          :requestGoal="helpRequestDataIteam.requestGoal ?? 0"
          :contributorsCount="helpRequestDataIteam.contributorsCount ?? 0"
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
  /* font-size: 24px; */
  font-weight: 400;
  min-height: 145px;
}
.listItem {
  width: 100%;
  padding: 0;
  height: max-content;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  cursor: pointer;
}
.listItem:hover {
  background-color: rgb(245, 245, 245, 0.2);
}
</style>
