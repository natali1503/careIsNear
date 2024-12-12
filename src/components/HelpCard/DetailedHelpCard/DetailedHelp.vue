<script setup lang="ts">
import { HelpRequestData } from '../../../api/generated';
import FavoriteButton from '../../../components/FavoriteButton.vue';
import { dateFormatting } from '../../../general/dateFormatting';
import DataCell from '../../DataCell.vue';
import ActionsSchedule from './element/ActionsSchedule.vue';
import VerifiedOrganization from './element/VerifiedOrganization.vue';
const props = defineProps<{ dataDetailedHelp: HelpRequestData }>();
</script>
<template>
  <div class="detailedHelp">
    <div style="display: flex; flex-direction: row; padding-right: 15px; justify-content: space-between">
      <h5 class="title">{{ dataDetailedHelp.title.split(' ').slice(1).join(' ') }}</h5>
      <FavoriteButton :empty="true" type="withText" operation="add" />
    </div>
    <div class="detailedHelpData">
      <div class="organization">
        <DataCell title="Организация" :data="[{ description: dataDetailedHelp.organization.title }]" type="column" />
        <VerifiedOrganization :isVerified="dataDetailedHelp.organization.isVerified" />
      </div>
      <DataCell title="Кому мы помогаем" :data="[{ description: dataDetailedHelp.description }]" type="column" />
      <ActionsSchedule :actionsSchedule="dataDetailedHelp.actionsSchedule" />
      <DataCell title="Цель сбора" :data="[{ description: dataDetailedHelp.goalDescription }]" type="column" />
      <DataCell
        title="Завершение"
        :data="[{ description: dateFormatting(dataDetailedHelp.endingDate) }]"
        type="column"
      />
      <DataCell
        title="Локация"
        :data="[
          { subtitle: 'Область: ', description: dataDetailedHelp.location.district },
          { subtitle: 'Насленный пункт: ', description: dataDetailedHelp.location.city },
        ]"
        type="column"
      />
      <DataCell
        title="Контакты"
        :data="[
          { subtitle: 'Телефон: ', description: dataDetailedHelp.contacts.phone },
          { subtitle: 'E-mail: ', description: dataDetailedHelp.contacts.email },
          { subtitle: 'Сайт: ', description: dataDetailedHelp.contacts.website },
        ]"
        type="row"
      />
    </div>
  </div>
</template>
<style scoped>
.detailedHelp {
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding-left: 30px;
  padding-top: 40px;
  padding-bottom: 60px;
}
.detailedHelpData {
  display: flex;
  flex-direction: column;
  gap: 30px;
  max-width: 80%;
}
.organization {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.title {
  font-size: 24px;
  font-weight: 400;
}
</style>
