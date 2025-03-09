<script setup lang="ts">
import type { DefineComponent } from 'vue';

defineProps<{ name: String; link: String; logo: DefineComponent<{}, {}, any> }>();
</script>
<template>
  <div style="display: flex; flex-direction: row; gap: 32px">
    <component :is="logo" />
    <a href="link" class="link" :aria-label="`Ссылка на ${name}`" target="_blank">{{ name }}</a>
  </div>
</template>
<style scoped>
.link {
  text-decoration: none;
  color: #000;
}
.link:hover {
  color: #000;
  text-decoration: underline;
}
</style>
