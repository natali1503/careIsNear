<script setup lang="ts">
import { useDisplay } from 'vuetify/lib/framework.mjs';
import Content from './Content.vue';
import Footer from './Footer.vue';
import Header from './Header/Header.vue';

const display = useDisplay();
</script>
<template>
  <v-container
    fluid
    style="min-height: 100vh; display: flex; flex-direction: column; justify-content: center; padding: 0"
  >
    <v-row
      class="header"
      :style="{
        padding: display.mobile.value ? '11px 10px' : '11px 50px',
      }"
    >
      <Header />
    </v-row>
    <v-row cols="12" style="flex-grow: 1; margin: 0">
      <Content>
        <slot></slot>
      </Content>
    </v-row>
    <v-row
      class="footer"
      :style="{
        padding: display.mobile.value ? '60px 10px' : '60px 50px',
      }"
    >
      <Footer />
    </v-row>
  </v-container>
</template>
<style scoped>
.header {
  justify-content: center;
  align-items: center;
  max-height: 84px;
  border-bottom: 1px solid #e0e0e0;
  margin: 0;
  z-index: 1;
  box-shadow:
    0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14),
    0px 1px 10px 0px rgba(0, 0, 0, 0.12);
}
.footer {
  bottom: 0;
  justify-content: center;
  max-height: 152px;
  margin-top: auto;
  border-top: 1px solid #e0e0e0;
  margin: 0;
}
</style>
