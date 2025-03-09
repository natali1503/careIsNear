<script setup lang="ts">
import type { ViewModeKey } from '@/general/constants/viewModes';
import { ref } from 'vue';
import type { GetApiUserResponse } from '../../api/generated';
import ViewSwitchPanel from '../HelpRequests/ViewSwitchPanel.vue';
import Contacts from './element/Contacts.vue';
import Favorites from './element/Favorites.vue';
import PersonalData from './element/PersonalData.vue';
const tab = ref(0);
defineProps<{
  dataUser: GetApiUserResponse;
}>();
const selectedViewMode = ref(1);

function onHandleUpdateViewMode(updateViewMode: ViewModeKey) {
  selectedViewMode.value = updateViewMode;
}
</script>
<template>
  <v-col cols="12" md="9" class="profileInfoPadding">
    <v-card class="profileInfo">
      <v-row style="margin: 0; padding: 0; justify-content: space-between; margin-bottom: 30px">
        <v-tabs v-model="tab" color="#1E88E5" style="border-bottom: 1px solid rgba(0, 0, 0, 0.12)">
          <v-tab>Личные данные</v-tab>
          <v-tab>Контакты</v-tab>
          <v-tab>Избранное</v-tab>
        </v-tabs>
        <ViewSwitchPanel v-if="tab === 2" @updateViewMode="onHandleUpdateViewMode" />
      </v-row>

      <v-tabs-window v-model="tab">
        <v-tabs-window-item>
          <v-card-text><PersonalData :data="dataUser" /></v-card-text>
        </v-tabs-window-item>

        <v-tabs-window-item>
          <v-card-text><Contacts :contacts="dataUser.contacts" /></v-card-text>
        </v-tabs-window-item>

        <v-tabs-window-item>
          <v-card-text><Favorites :selectedViewMode="selectedViewMode as ViewModeKey" /></v-card-text>
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card>
  </v-col>
</template>
<style scoped>
.profileInfo {
  margin: 0;
  padding: 0;
  box-shadow: none;
  min-height: 75vh;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding-top: 10px;
  padding-left: 30px;
  padding-right: 30px;
}
.v-card-text {
  margin: 0;
  padding: 0;
}
.profileInfoPadding {
  padding: 0 0 0 20px;
}
@media (max-width: 960px) {
  .profileInfoPadding {
    padding: 20px 0 0 0;
  }
  .profileInfo {
    padding-left: 10px;
    padding-right: 10px;
  }
}
</style>
