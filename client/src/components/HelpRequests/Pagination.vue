<script setup lang="ts">
import { numberPagesInPagination } from '@/general/constants/numberPagesInPagination';
import { generatePages } from '@/general/generatePages';
import { computed } from 'vue';

const props = defineProps<{
  currentPage: number;
  totalRequests: number;
}>();
const emit = defineEmits<{
  (event: 'changeCurrentPage', page: number): void;
}>();
const totalPages = computed(() => Math.ceil(props.totalRequests / 3));
const movementToRight = computed(() => props.currentPage < totalPages.value);
const movementToLeft = computed(() => props.currentPage > 1);
const arrNumberPagesInPagination = computed(() =>
  generatePages(props.currentPage, totalPages.value, numberPagesInPagination),
);
</script>
<template>
  <div style="display: flex; flex-direction: row; gap: 6px">
    <v-btn
      icon="mdi-chevron-left"
      size="small"
      :class="['paginationArrow', movementToLeft ? 'paginationArrowActiv' : 'paginationArrowNotActiv']"
      @click="
        () => {
          movementToLeft && emit('changeCurrentPage', currentPage - 1);
        }
      "
    />
    <v-btn
      v-for="numberPage in arrNumberPagesInPagination"
      :key="numberPage"
      :class="['paginationPage', numberPage === currentPage ? 'currentPage' : '']"
      @click="
        () => {
          numberPage !== currentPage && emit('changeCurrentPage', numberPage);
        }
      "
    >
      {{ numberPage }}
    </v-btn>
    <v-btn
      icon="mdi-chevron-right"
      size="small"
      :class="['paginationArrow', movementToRight ? 'paginationArrowActiv' : 'paginationArrowNotActiv']"
      @click="
        () => {
          movementToRight && emit('changeCurrentPage', currentPage + 1);
        }
      "
    />
  </div>
</template>
<style scoped>
.v-btn {
  animation: none;
  transition: none;
  box-shadow: none;
  background: none;
  border: none;
  border-radius: 50%;
}
.paginationPage {
  padding: 0;
  margin: 0;
  width: 40px;
  min-width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.87);
  transition: background-color 0.5s ease-out 100ms;
}
/* .paginationPage:focus-visible, */
.paginationPage:hover {
  background-color: rgb(245, 245, 245, 0.5);
  color: rgba(0, 0, 0, 0.87);
  border-radius: 50%;
  border: 0;
}
.paginationPage:active {
  background-color: rgba(30, 136, 229, 0.5);
  transition: background-color 0.5s ease-out 100ms;
}
.currentPage {
  padding: 0;
  margin: 0;
  border-radius: 50%;
  background-color: #1e88e5;
  width: 40px;
  min-width: 40px;
  height: 40px;
  color: #fff;
}
.currentPage:hover {
  pointer-events: none;
  background-color: #1e88e5;
  color: #fff;
}
.paginationArrow {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.paginationArrowActiv {
  color: rgba(0, 0, 0, 0.87);
}
.paginationArrowNotActiv {
  color: rgba(0, 0, 0, 0.27);
  pointer-events: none;
}
</style>
