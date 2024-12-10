<script setup lang="ts">
import { GetApiUserResponse } from '../../../api/generated';
import { dateFormatting } from '../../../general/dateFormatting';
import EducationIteam from './EducationIteam.vue';
import LocationForHelpIteam from './LocationForHelpIteam.vue';
import Row from './Row.vue';
import Section from './Section.vue';

const props = defineProps<{
  data: GetApiUserResponse;
}>();
</script>
<template>
  <div style="display: flex; flex-direction: column; gap: 30px">
    <Section sectionTitle="Профиль">
      <Row title="Фамилия" :description="data.lastName" />
      <Row title="Имя" :description="data.name" />
    </Section>
    <Section sectionTitle="Дата рождения">
      <Row :description="`${dateFormatting(data.birthdate)}`" />
    </Section>
    <Section sectionTitle="Локация для помощи">
      <div class="listIteams">
        <LocationForHelpIteam
          v-for="(baseLocation, index) in data.baseLocations"
          :key="index"
          :city="baseLocation.city"
          :district="baseLocation.district"
        />
      </div>
    </Section>
    <Section sectionTitle="Образование">
      <div class="listIteams">
        <EducationIteam
          v-for="(education, index) in data.educations"
          :key="index"
          :organizationName="education.organizationName"
          :level="education.level"
          :specialization="education.specialization"
          :graduationYear="dateFormatting(education.graduationYear)"
        />
      </div>
    </Section>
    <Section sectionTitle="Обо мне">
      <Row :description="data.additionalInfo" />
    </Section>
  </div>
</template>
<style scoped>
.listIteams {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
