<script setup lang="ts">
import { useFavouritesRequestsHelp } from '@/store/favouritesRequestsHelp';

const props = defineProps<{
  isFavourites: boolean;
  type: 'withText' | 'withoutTest';
  id: string;
}>();
const favouritesRequestsHelp = useFavouritesRequestsHelp();
function handleClick(e) {
  e.stopPropagation();
  props.isFavourites
    ? favouritesRequestsHelp.removeRequestHelp(props.id)
    : favouritesRequestsHelp.addRequestHelp(props.id);
}
</script>
<template>
  <v-tooltip :text="isFavourites ? 'Удалить из избранного' : 'Добавить в избранное'">
    <template v-slot:activator="{ props }">
      <button v-bind="type === 'withoutTest' && props" @click="handleClick" class="favoriteButton">
        <div>
          <v-icon :icon="isFavourites ? 'mdi-star-outline' : 'mdi-star'" style="color: rgba(0, 0, 0, 0.5)"></v-icon>
        </div>

        <div v-if="type === 'withText'">
          <p style="font-size: 14px; font-weight: 400; white-space: nowrap">
            {{ isFavourites ? 'Удалить' : ' В избранное' }}
          </p>
        </div>
      </button>
    </template>
  </v-tooltip>
</template>
<style scoped>
.favoriteButton {
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
}
.favoriteButton:hover {
  background-color: rgb(245, 245, 245, 0.5);
}
</style>
