<script setup lang="ts">
const props = defineProps<{ title: string; options: { label: string; prop: string }[] }>();
</script>
<template>
  <div>
    <p>{{ title }}</p>
    <div style="display: flex; flex-direction: column">
      <v-checkbox v-for="option in options" :label="option.label"></v-checkbox>
    </div>
  </div>
</template>
<style scoped>
::v-deep(.v-input--density-default) {
  height: 42px;
}
</style>
