<template>
  <div class="paddingImg">
    <div style="width: calc(240px + 0.11 * (100vw - 1920px))">
      <Profile />
    </div>
  </div>
</template>

<script setup lang="ts">
import Profile from '../../../../public/img/profile.svg';
</script>
<style scoped>
.paddingImg {
  padding: 20px;
  display: flex;
  justify-content: center;
}
@media (max-width: 960px) {
  .paddingImg {
    /* padding: 10px; */
  }
}
</style>
