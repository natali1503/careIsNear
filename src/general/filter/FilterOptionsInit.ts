import { FilterOptions, TypeKeyFilterOptions } from './FilterOptions';
import { HelperRequirements } from './HelperRequirements';

export type TypeFilterOptionsInitItem =
  | { finance: boolean; material: boolean }
  | { person: boolean; organization: boolean }
  | {
      qualification: { professional: boolean; common: boolean };
      helperType: { group: boolean; single: boolean };
      isOnline: { online: boolean; offline: boolean };
    }
  | Date
  | null;

export type TypeFilterOptionsInit = {
  [key in TypeKeyFilterOptions]: TypeFilterOptionsInitItem;
};

export const FilterOptionsInit = {
  [FilterOptions.helpType]: { finance: false, material: false },
  [FilterOptions.requesterType]: { person: false, organization: false },
  [FilterOptions.helperRequirements]: {
    [HelperRequirements.qualification]: { professional: false, common: false },
    [HelperRequirements.helperType]: { group: false, single: false },
    [HelperRequirements.isOnline]: { online: false, offline: false },
  },
  [FilterOptions.endingDate]: null,
};
