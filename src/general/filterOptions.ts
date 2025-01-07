export const filterOptions = [
  {
    type: 'checkList',
    title: 'Кому мы помогаем',
    options: [
      { label: 'Пенсионеры', prop: 'person' },
      { label: 'Дома престарелых', prop: 'organization' },
    ],
  },
  {
    type: 'checkList',
    title: 'Чем мы помогаем',
    options: [
      { label: 'Вещи', prop: 'material' },
      { label: 'Финансирование', prop: 'finance' },
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
          options: [
            { label: 'Квалифицированная', prop: 'professional' },
            { label: 'Не требует профессии', prop: 'common' },
          ],
        },
        {
          title: 'Формат',
          type: 'checkList',
          options: [
            { label: 'Онлайн', prop: 'true' },
            { label: 'Офлайн', prop: 'false' },
          ],
        },
        {
          title: 'Необходимо волонтеров',
          type: 'checkList',
          options: [
            { label: 'Группа', prop: 'group' },
            { label: 'Один', prop: 'single' },
          ],
        },
      ],
    },
  },
];

export interface Iteam {
  title: string;
  type: string;
  options: { label: string; prop: string }[];
}
