<script setup lang="ts">
const props = defineProps<{ actionsSchedule: { stepLabel?: string; isDone?: boolean }[] }>();
</script>
<template>
  <div class="actionsSchedule">
    <span class="title">План действий</span>
    <div v-for="action in actionsSchedule">
      <div class="actionSchedule">
        <div style="display: flex">
          <v-icon
            size="small"
            :icon="'mdi-check-circle-outline'"
            :color="action.isDone ? 'success' : '#e0e0e0'"
          ></v-icon>
        </div>
        <div>
          <p style="font-size: 12px">{{ action.stepLabel }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.actionsSchedule {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.title {
  font-size: 20px;
  font-weight: 500;
}
.actionSchedule {
  display: flex;
  flex-direction: row;
  gap: 4px;
}
</style>
