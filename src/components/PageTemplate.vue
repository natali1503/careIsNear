<script setup lang="ts">
const props = defineProps({ title: String });
</script>
<template>
  <v-container
    style="
      width: 100%;
      height: 100%;
      padding-top: 30px;
      padding-left: 40px;
      padding-right: 40px;
      background-color: #f5f5f5;
      border-left: 1px solid #e0e0e0;
      border-right: 1px solid #e0e0e0;
    "
  >
    <v-row style="margin: 0; padding-bottom: 20px">
      <h4 class="title">{{ title }}</h4>
    </v-row>
    <v-row style="margin: 0; justify-content: space-between">
      <slot></slot>
    </v-row>
  </v-container>
</template>
<style scoped>
.title {
  font-size: 34px;
  font-weight: 400;
}
</style>
