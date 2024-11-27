<script setup lang="ts">
import { IDataAuthUser } from '@/api/dataAuthUser';
import { defineProps } from 'vue';
const props = defineProps<{ dataAuth: IDataAuthUser }>();
</script>
<template>
  <v-container class="userIteam">
    <v-row style="margin: 0">
      <v-col cols="2" style="padding: 0px; padding-right: 12px">
        <v-icon color="info" icon="mdi-information-outline" size="small" />
      </v-col>
      <v-col cols="10" style="padding: 0px">
        <v-row style="margin: 0; margin-bottom: 4px">
          <p>{{ props.dataAuth.title }}</p>
        </v-row>
        <v-row style="margin: 0">
          <p>Логин: {{ props.dataAuth.login }}</p>
        </v-row>
        <v-row style="margin: 0">
          <p>Пароль: {{ props.dataAuth.password }}</p>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped>
.userIteam {
  cursor: pointer;
  border: 1px solid #0288d1;
  border-radius: 4px;
  padding: 6px 16px;
}
.userIteam:hover {
  background-color: rgba(245, 245, 245, 0.4);
  box-shadow: 0px 2px 4px -1px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)),
    0px 4px 5px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)),
    0px 1px 10px 0px var(--v-shadow-key-ambient-opacity, rgba(0, 0, 0, 0.12));
}
</style>
