<script setup lang="ts">
import { ref } from 'vue';
import { GetApiUserResponse } from '../../api/generated';
import Contacts from './element/Contacts.vue';
import Favorites from './element/Favorites.vue';
import PersonalData from './element/PersonalData.vue';
const tab = ref(0);
const props = defineProps<{
  dataUser: GetApiUserResponse;
}>();
console.log(props.dataUser.contacts);
</script>
<template>
  <v-col cols="12" md="8" class="profileInfo" style="">
    <v-card style="margin: 0; padding: 0; box-shadow: none">
      <v-tabs v-model="tab" color="#1E88E5">
        <v-tab>Личные данные</v-tab>
        <v-tab>Контакты</v-tab>
        <v-tab>Избранное</v-tab>
      </v-tabs>

      <v-tabs-window v-model="tab">
        <v-tabs-window-item>
          <v-card-text><PersonalData :data="dataUser" /></v-card-text>
        </v-tabs-window-item>

        <v-tabs-window-item>
          <v-card-text><Contacts :contacts="dataUser.contacts" /></v-card-text>
        </v-tabs-window-item>

        <v-tabs-window-item>
          <v-card-text><Favorites /></v-card-text>
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card>
  </v-col>
</template>
<style scoped>
.profileInfo {
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding-top: 10px;
  padding-left: 30px;
}
</style>
