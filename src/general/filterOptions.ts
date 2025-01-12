export const filterOptions = [
  {
    type: 'checkList',
    title: 'Кому мы помогаем',
    id: 'requesterType',
    options: [
      { label: 'Пенсионеры', id: 'person' },
      { label: 'Дома престарелых', id: 'organization' },
    ],
  },
  {
    type: 'checkList',
    title: 'Чем мы помогаем',
    id: 'helpType',
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
          id: 'qualification',
          options: [
            { label: 'Квалифицированная', id: 'professional' },
            { label: 'Не требует профессии', id: 'common' },
          ],
        },
        {
          title: 'Формат',
          type: 'checkList',
          id: 'isOnline',
          options: [
            { label: 'Онлайн', id: 'online' },
            { label: 'Офлайн', id: 'offline' },
          ],
        },
        {
          title: 'Необходимо волонтеров',
          type: 'checkList',
          id: 'helperType',
          options: [
            { label: 'Группа', id: 'group' },
            { label: 'Один', id: 'single' },
          ],
        },
      ],
    },
  },
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
