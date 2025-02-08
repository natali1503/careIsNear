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

export type TypeFilterPanelStatus = {
  [FilterOptions.helpType]: { finance: boolean; material: boolean };
  [FilterOptions.requesterType]: { person: boolean; organization: boolean };
  [FilterOptions.helperRequirements]: {
    [HelperRequirements.qualification]: { professional: boolean; common: boolean };
    [HelperRequirements.helperType]: { group: boolean; single: boolean };
    [HelperRequirements.isOnline]: { online: boolean; offline: boolean };
  };
  [FilterOptions.endingDate]: Date | null;
};

export const FilterPanelStatusNoChoice: TypeFilterPanelStatus = {
  [FilterOptions.helpType]: { finance: false, material: false },
  [FilterOptions.requesterType]: { person: false, organization: false },
  [FilterOptions.helperRequirements]: {
    [HelperRequirements.qualification]: { professional: false, common: false },
    [HelperRequirements.helperType]: { group: false, single: false },
    [HelperRequirements.isOnline]: { online: false, offline: false },
  },
  [FilterOptions.endingDate]: null,
};
