<script setup lang="ts">
defineProps<{ modelValue: string }>();
const emit = defineEmits(['update:modelValue', 'resetSearchQuery']);

function handleInputChange(event: Event) {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
}
</script>
<template>
  <div
    style="
      display: flex;
      flex-direction: column;
      gap: 10px;
      background-color: #fff;
      border-radius: 4px;
      border: 1px solid #e0e0e0;
      padding: 20px 30px;
      width: 100%;
    "
  >
    <div>
      <p class="title">Найти запрос</p>
    </div>
    <div>
      <v-text-field
        type="text"
        class="input"
        placeholder="Введите название задачи или организации"
        variant="underlined"
        :prepend-inner-icon="'mdi-magnify'"
        :model-value="modelValue"
        @input="handleInputChange"
        :append-inner-icon="modelValue && 'mdi-close-circle'"
        @click:append-inner="
          () => {
            emit('update:modelValue', '');
            emit('resetSearchQuery');
          }
        "
      />
    </div>
  </div>
</template>
<style scoped>
.title {
  font-weight: 500;
  font-size: 20px;
  line-height: 32px;
}
</style>
