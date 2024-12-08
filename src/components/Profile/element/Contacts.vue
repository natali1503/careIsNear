<script setup lang="ts">
import { DefineComponent } from 'vue';
import ItemSocial from './ItemSocial.vue';
import Row from './Row.vue';
import Section from './Section.vue';
import Telegram from './Telegram.vue';
import Vkontakte from './Vkontakte.vue';
import Whatsapp from './Whatsapp.vue';

const props = defineProps<{
  contacts: {
    email: string;
    phone: string;
    social: {
      vk: string;
      telegram: string;
      whatsapp: string;
    };
  };
}>();
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 30px">
    <Section sectionTitle="E-mail">
      <Row :description="contacts.email" />
    </Section>

    <Section sectionTitle="Телефон">
      <Row :description="contacts.phone" />
    </Section>

    <Section sectionTitle="Социальные сети">
      <ItemSocial name="Vkontakte" :link="`https://vk.com/${contacts.social.vk}`" :logo="Vkontakte" />
      <ItemSocial name="Telegram" :link="`https://t.me/${contacts.social.telegram}`" :logo="Telegram" />
      <ItemSocial name="Whatsapp" :link="`https://wa.me/${contacts.social.whatsapp}`" :logo="Whatsapp" />
    </Section>
  </div>
</template>

<style scoped></style>
