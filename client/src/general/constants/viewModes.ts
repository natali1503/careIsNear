export const VIEW_MODES = {
  0: 'grid',
  1: 'list',
  2: 'map',
} as const;

export type ViewModeKey = keyof typeof VIEW_MODES;
export type ViewModeValue = (typeof VIEW_MODES)[ViewModeKey];
