<script setup lang="ts">
import { useDisplay } from 'vuetify';

const props = defineProps<{
  type?: 'row' | 'column';
  title?: string;
  data: { subtitle?: string; description?: string }[];
}>();
const display = useDisplay();
</script>
<template>
  <div style="display: flex; flex-direction: column; gap: 10px">
    <div v-if="title" class="blockTitle">
      <h6 class="title" :style="{ fontSize: display.mobile.value ? '18px' : '20px' }">{{ title }}</h6>
    </div>
    <div :style="{ display: 'flex', flexDirection: type, gap: '4px', 'justify-content': 'space-between' }">
      <div
        v-for="dataIteam in props.data"
        :style="{ display: 'flex', flexDirection: type === 'row' ? 'column' : 'row', gap: '4px' }"
      >
        <div v-if="dataIteam.subtitle">
          <p class="subtitle">{{ dataIteam.subtitle }}</p>
        </div>
        <div v-if="dataIteam.description">
          <p class="description">{{ dataIteam.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.title {
  font-weight: 500;
}
.subtitle {
  font-size: 14px;
  font-weight: 500;
}
.description {
  font-size: 14px;
}
</style>
