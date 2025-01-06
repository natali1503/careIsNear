<script setup lang="ts">
import { ref } from 'vue';
import { dataAuthUser } from '../../api/dataAuthUser';
import UserIteam from './UserIteam.vue';
const emit = defineEmits(['dataAuth']);

function handleClickDataAuth(id: number) {
  const dataAuth = dataAuthUser.filter((el) => el.id === id);
  emit('dataAuth', dataAuth[0]);
}

let currentUserIteam = ref(1);
let offset = ref(0);
let arrow = ref('');

function onHandleClickSlider(arrowT: 'previous' | 'next', step: number = 1) {
  if (arrowT === 'next') {
    offset.value = offset.value + step * 330;
    currentUserIteam.value = currentUserIteam.value + step * 1;
    arrow.value = 'next';
  } else {
    offset.value = offset.value - step * 330;
    currentUserIteam.value = currentUserIteam.value - step * 1;
    arrow.value = 'prev';
  }
}
</script>
<template>
  <v-col md="6" class="testProfiles">
    <div>
      <h4 style="font-size: 34px; font-weight: 400; padding-bottom: 40px">Тестовые профили</h4>
    </div>
    <div class="dataAuthUser">
      <v-btn
        class="arrowBtn"
        @click="onHandleClickSlider('previous')"
        :class="[currentUserIteam === 1 ? 'notActiveBtn' : 'activeBtn']"
      >
        <v-icon color="primary" icon="mdi-chevron-left" size="large" />
      </v-btn>
      <div style="width: 300px; height: 100px">
        <div style="position: relative">
          <div
            class="slider"
            style="position: absolute; display: flex; gap: 30px; left: 0; top: 0"
            :style="{
              transform: `translate(-${offset}px, 0px)`,
            }"
          >
            <div
              v-for="dataAuth in dataAuthUser"
              :key="dataAuth.id"
              class="dataAuthUserIteam"
              :class="[currentUserIteam === dataAuth.id ? 'currentUserIteam' : 'notCurrentUserIteam']"
              @click="handleClickDataAuth(dataAuth.id)"
              style="width: 300px"
            >
              <UserIteam :dataAuth="dataAuth" />
            </div>
          </div>
        </div>
      </div>

      <v-btn
        class="arrowBtn"
        @click="onHandleClickSlider('next')"
        :class="[currentUserIteam === dataAuthUser.length ? 'notActiveBtn' : 'activeBtn']"
      >
        <v-icon color="primary" icon="mdi-chevron-right" size="large" />
      </v-btn>
    </div>
  </v-col>
</template>
<style scoped>
.slider {
  transition: transform 1s ease-in-out;
}
.testProfiles {
  padding: 0;
  padding: 30px 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.dataAuthUser {
  display: flex;
  flex-direction: row;
  gap: 30px;
  align-items: center;
}
.urrentUserIteam {
  opacity: 1;
  scale: 1;
  transition: all 1s ease-in-out;
}
.notCurrentUserIteam {
  opacity: 0.2;
  scale: 0.8;
  transition: all 1s ease-in-out;
}
.arrowBtn {
  z-index: 1;
  padding: 5px;
  box-shadow: none;
  min-width: max-content;
  background-color: transparent !important;
  transition: none !important;
}

::v-deep(.arrowBtn.v-btn--disabled .v-btn__overlay) {
  background-color: transparent !important;
}
.activeBtn {
  opacity: 1;
  transition: all 1s ease-in-out;
}
.notActiveBtn {
  opacity: 0.2;
  transition: all 1s ease-in-out;
  pointer-events: none;
}
</style>
