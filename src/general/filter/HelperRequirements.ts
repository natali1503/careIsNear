export enum HelperRequirements {
  qualification = 'qualification',
  helperType = 'helperType',
  isOnline = 'isOnline',
}
export type TypeKeyHelperRequirements = keyof typeof HelperRequirements;
export type TypeHelperRequirements = {
  [K in HelperRequirements]: K extends 'isOnline' ? { [key in K]: boolean } : { [key in K]: string };
}[HelperRequirements];
export type TypeHelperRequirementsArr = { [key in HelperRequirements]?: key extends 'isOnline' ? boolean[] : string[] };
