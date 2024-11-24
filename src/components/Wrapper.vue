<script setup lang="ts">
import Footer from "./Footer.vue";
import Header from "./Header.vue";
import Content from "./Content.vue";
</script>
<template>
  <v-container fluid style="min-height: 100vh; display: flex; flex-direction: column; justify-content: center; padding: 0">
    <v-row style="justify-content: center; max-height: 84px; border-bottom: 1px solid #e0e0e0; margin: 0">
      <Header />
    </v-row>
    <v-row cols="12" style="flex-grow: 1; margin: 0">
      <Content>
        <slot></slot>
      </Content>
    </v-row>
    <v-row style="bottom: 0; justify-content: center; max-height: 152px; margin-top: auto; border-top: 1px solid #e0e0e0; margin: 0">
      <Footer />
    </v-row>
  </v-container>
</template>
<style scoped></style>
