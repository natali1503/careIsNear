<script setup lang="ts">
import { useDisplay } from 'vuetify';
import { dataAuthUser } from '../../api/dataAuthUser';
import UserIteam from './UserIteam.vue';
const emit = defineEmits(['dataAuth']);

function handleClickDataAuth(id: number) {
  const dataAuth = dataAuthUser.filter((el) => el.id === id);
  emit('dataAuth', dataAuth[0]);
}
const display = useDisplay();
</script>
<template>
  <v-col md="6" :class="display.mobile.value ? 'testProfilesSm' : 'testProfiles'">
    <div>
      <h4 style="font-size: 34px; font-weight: 400" :style="{ paddingBottom: display.mobile.value ? '40px' : '90px' }">
        Тестовые профили
      </h4>
      <div :class="display.mobile.value ? 'dataAuthUserSm' : 'dataAuthUser'">
        <div
          v-for="dataAuth in dataAuthUser"
          :key="dataAuth.id"
          class="dataAuthUserIteam"
          @click="handleClickDataAuth(dataAuth.id)"
        >
          <v-col cols="8" style="padding: 0">
            <UserIteam :dataAuth="dataAuth" />
          </v-col>
        </div>
      </div>
    </div>
  </v-col>
</template>
<style scoped>
.testProfiles {
  border-right: 1px solid #e0e0e0;
  padding-top: 64px;
  padding-left: 40px;
}
.testProfilesSm {
  padding: 0;
  padding: 30px 60px;
  display: flex;
  flex-direction: column;
}
.dataAuthUser {
  display: flex;
  flex-direction: column;
  gap: 30px;
}
.dataAuthUserSm {
  display: flex;
  flex-direction: row;
  gap: 30px;
}
</style>
