import { FilterOptions, type TypeKeyFilterOptions } from './FilterOptions';
import { HelperRequirements } from './HelperRequirements';

export type TypeFilterOptionsInitItem =
  | { [key in string]: boolean }
  // | { person: boolean; organization: boolean }
  | {
      qualification: { [key in string]: boolean };
      helperType: { [key in string]: boolean };
      isOnline: { [key in string]: boolean };
    }
  | Date
  | null;

export type TypeFilterOptionsInit = {
  [key in TypeKeyFilterOptions]: TypeFilterOptionsInitItem;
};

export type TypeHelperRequirementsPanelStatus = {
  [HelperRequirements.qualification]: { [key in string]: boolean };
  [HelperRequirements.helperType]: { [key in string]: boolean };
  [HelperRequirements.isOnline]: { [key in string]: boolean };
};
export type TypeFilterPanelStatus = {
  // [FilterOptions.helpType]: { finance: boolean; material: boolean };
  // [FilterOptions.requesterType]: { person: boolean; organization: boolean };
  [FilterOptions.helpType]: { [key in string]: boolean };
  [FilterOptions.requesterType]: { [key in string]: boolean };
  [FilterOptions.helperRequirements]: TypeHelperRequirementsPanelStatus;
  // [HelperRequirements.qualification]: { professional: boolean; common: boolean };
  // [HelperRequirements.helperType]: { group: boolean; single: boolean };
  // [HelperRequirements.isOnline]: { online: boolean; offline: boolean };

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
