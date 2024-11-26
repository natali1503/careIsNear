<script setup lang="ts">
import { useRouter } from 'vue-router';
import { routesName } from '../../router';
import { useAuthStore } from '../../store/auth';

const router = useRouter();
const authStore = useAuthStore();
function onHandleProfile() {
  router.push(routesName.profile);
}
function onHandleLogout() {
  authStore.logout();
}
</script>
<template>
  <v-btn
    style="right: 0; border-radius: 4px; border: 1px solid #000"
    @click="router.push(routesName.profile)"
    v-if="!authStore.isAuth"
  >
    <p style="margin-right: 8px">Войти</p>
    <v-icon>mdi-chevron-right</v-icon>
  </v-btn>

  <v-menu v-if="authStore.isAuth">
    <template v-slot:activator="{ props: menuActivator }">
      <v-btn
        color="#BDBDBD"
        v-bind="menuActivator"
        style="border-radius: 50%; min-width: 40px; height: 40px; padding: 0"
      >
        <v-icon color="#fff" icon="mdi-account" size="x-large" />
      </v-btn>
    </template>
    <v-list>
      <v-list-item>
        <v-list-item-title style="margin-bottom: 6px">
          <div class="menuIteam" @click="onHandleProfile">
            <v-icon color="" icon="mdi-account" size="small" />
            <p>Мой профиль</p>
          </div>
        </v-list-item-title>
        <v-list-item-title>
          <div class="menuIteam" @click="onHandleLogout">
            <v-icon color="" icon="mdi-logout" size="small" />
            <p>Выйти</p>
          </div>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<style scoped>
.menuIteam {
  display: flex;
  gap: 16px;
  flex-wrap: nowrap;
  align-items: center;
  cursor: pointer;
}
</style>
