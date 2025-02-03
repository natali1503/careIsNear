import { FilterOptions } from './filter/FilterOptions';
import { HelperRequirements } from './filter/HelperRequirements';

export const filterOptions = [
  {
    type: 'checkList',
    title: 'Кому мы помогаем',
    id: FilterOptions.requesterType,
    options: [
      { label: 'Пенсионеры', id: 'person' },
      { label: 'Дома престарелых', id: 'organization' },
    ],
  },
  {
    type: 'checkList',
    title: 'Чем мы помогаем',
    id: FilterOptions.helpType,
    options: [
      { label: 'Вещи', id: 'material' },
      { label: 'Финансирование', id: 'finance' },
    ],
  },
  {
    type: 'accordionList',
    accordion: {
      accordionTitle: 'Волонтерство',
      items: [
        {
          title: 'Специализация',
          type: 'checkList',
          id: HelperRequirements.qualification,
          options: [
            { label: 'Квалифицированная', id: 'professional' },
            { label: 'Не требует профессии', id: 'common' },
          ],
        },
        {
          title: 'Формат',
          type: 'checkList',
          id: HelperRequirements.isOnline,
          options: [
            { label: 'Онлайн', id: 'online' },
            { label: 'Офлайн', id: 'offline' },
          ],
        },
        {
          title: 'Необходимо волонтеров',
          type: 'checkList',
          id: HelperRequirements.helperType,
          options: [
            { label: 'Группа', id: 'group' },
            { label: 'Один', id: 'single' },
          ],
        },
      ],
    },
  },
  { type: 'inputDate', title: 'Выберете дату', id: FilterOptions.endingDate },
];

export interface Iteam {
  title: string;
  type: string;
  id: string;
  options: { label: string; id: string }[];
}
export interface IFilterOptions {
  helpType: { finance: boolean; material: boolean };
  requesterType: { person: boolean; organization: boolean };
  helperRequirements: {
    qualification: { professional: boolean; common: boolean };
    helperType: { group: boolean; single: boolean };
    isOnline: { online: boolean; offline: boolean };
  };

  endingDate: string | null;
}
export const filterOptionsInit: IFilterOptions = {
  helpType: { finance: false, material: false },
  requesterType: { person: false, organization: false },
  helperRequirements: {
    qualification: { professional: false, common: false },
    helperType: { group: false, single: false },
    isOnline: { online: false, offline: false },
  },
  endingDate: null,
};

// function getEnumValues<T>(enumObj: T): Array<T[keyof T]> {
//   return Object.values(enumObj).filter((value) => typeof value === 'string' || isNaN(Number(value)));
// }
// export const filterOptionsArray = getEnumValues(FilterOptions);
export interface ISelectedFilters {
  helpType: string[];
  requesterType: string[];
  helperRequirements: {
    qualification: string[];
    helperType: string[];
    isOnline: string[];
  };
  endingDate: string | null;
}
