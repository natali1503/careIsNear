export enum HelperRequirements {
  qualification = 'qualification',
  helperType = 'helperType',
  isOnline = 'isOnline',
}
export type TypeKeyHelperRequirements = keyof typeof HelperRequirements;
export type TypeHelperRequirements = { [key in HelperRequirements]: key extends 'isOnline' ? boolean : string };
export type TypeHelperRequirementsArr = { [key in HelperRequirements]: key extends 'isOnline' ? boolean[] : string[] };
