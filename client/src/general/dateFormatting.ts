import dayjs from 'dayjs';

export function dateFormatting(date: dayjs.ConfigType) {
  const dateForFormat = dayjs(date);
  return dateForFormat.format('DD.MM.YYYY');
}
