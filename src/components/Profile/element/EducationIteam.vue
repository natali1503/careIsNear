<script setup lang="ts">
import Row from './Row.vue';

const props = defineProps<{
  organizationName?: string;
  level?: 'Среднее общее' | 'Среднее профессиональное' | 'Высшее';
  specialization?: string;
  graduationYear?: string;
}>();
</script>
<template>
  <div>
    <Row title="Учреждение" :description="organizationName" />
    <Row title="Уровень образования" :description="level" />
    <Row title="Направление" :description="specialization" />
    <Row title="Год окончания" :description="'graduationYear'" />
  </div>
</template>
<style scoped></style>
