<script setup lang="ts">
const props = defineProps({ sectionTitle: String });
</script>
<template>
  <div>
    <div style="padding-bottom: 10px">
      <h6 class="sectionTitle">{{ sectionTitle }}</h6>
    </div>
    <div style="display: flex; flex-direction: column; gap: 4px">
      <slot></slot>
    </div>
  </div>
</template>
<style scoped>
.sectionTitle {
  font-size: 20px;
  font-weight: 500;
}
</style>
