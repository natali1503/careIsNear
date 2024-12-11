<script setup lang="ts">
const props = defineProps<{ empty: boolean; type: 'withText' | 'withoutTest'; operation: 'add' | 'delete' }>();
</script>
<template>
  <button
    style="
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      gap: 8px;
      max-width: max-content;
      padding: 4px 10px;
      align-items: center;
      max-height: max-content;
    "
  >
    <div>
      <v-icon :icon="empty ? 'mdi-star-outline' : 'mdi-star'" style="color: rgba(0, 0, 0, 0.5)"></v-icon>
    </div>
    <div v-if="type === 'withText'">
      <p style="font-size: 14px; font-weight: 400; white-space: nowrap">
        {{ operation === 'add' ? ' В избранное' : 'Удалить' }}
      </p>
    </div>
  </button>
</template>
<style scoped></style>
