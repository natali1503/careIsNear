import { FilterOptions } from './FilterOptions';
import { HelperRequirements, TypeHelperRequirements, TypeHelperRequirementsArr } from './HelperRequirements';

export type TypeSelectedFilters = {
  [FilterOptions.helpType]: string[];
  [FilterOptions.requesterType]: string[];
  [FilterOptions.helperRequirements]: TypeHelperRequirementsArr;
  [FilterOptions.endingDate]: Date | null;
};

export const selectedFiltersInit: TypeSelectedFilters = {
  [FilterOptions.helpType]: [],
  [FilterOptions.requesterType]: [],
  [FilterOptions.helperRequirements]: {
    [HelperRequirements.qualification]: [],
    [HelperRequirements.helperType]: [],
    [HelperRequirements.isOnline]: [],
  },
  [FilterOptions.endingDate]: null,
};

export type FilterValue = string | Date | TypeHelperRequirements;
