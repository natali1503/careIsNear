<script setup lang="ts">
const props = defineProps<{ selectedDate: Date | null }>();
const emit = defineEmits(['update:selectedDate', 'updateDateFilter']);

function updateDateFilter(newSelectedDate: Date | null) {
  emit('update:selectedDate', newSelectedDate);
  emit('updateDateFilter', { endingDate: newSelectedDate ? newSelectedDate : null });
}
</script>
<template>
  <div style="display: flex; flex-direction: column; gap: 10px">
    <p>Помощь актуальна до:</p>
    <v-date-input
      clearable
      label="Выберете дату"
      v-model="selectedDate as Date"
      @update:modelValue="
        (value) => {
          if (value) updateDateFilter(new Date(value));
          else updateDateFilter(null);
        }
      "
      @click:clear="() => updateDateFilter(null)"
    >
    </v-date-input>
  </div>
</template>
<style scoped></style>
