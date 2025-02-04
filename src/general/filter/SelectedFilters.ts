import { FilterOptions } from './FilterOptions';
import { TypeHelperRequirements, TypeHelperRequirementsArr } from './HelperRequirements';

export type TypeSelectedFilters = {
  [FilterOptions.helpType]?: string[];
  [FilterOptions.requesterType]?: string[];
  [FilterOptions.helperRequirements]?: TypeHelperRequirementsArr;
  [FilterOptions.endingDate]?: Date | null;
};

export type FilterValue = string | Date | TypeHelperRequirements;
