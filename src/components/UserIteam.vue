<script setup lang="ts">
import { IDataAuthUser } from "@/api/dataAuthUser";
import { defineProps } from "vue";
const props = defineProps<{ dataAuth: IDataAuthUser }>();
</script>
<template>
  <v-container style="border: 1px solid #0288d1; border-radius: 4px; padding: 6px 16px">
    <v-row style="margin: 0">
      <v-col cols="0" style="padding: 0px; padding-right: 12px">
        <v-icon color="info" icon="mdi-information" size="small"></v-icon>
      </v-col>
      <v-col cols="8" style="padding: 0px">
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
<style scoped></style>
