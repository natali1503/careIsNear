import { FilterOptions } from './FilterOptions';
import type { TypeHelperRequirementsArr } from './HelperRequirements';
import type { TypeSelectedFilters } from './SelectedFilters';

export enum FlatFilter {
  helpType = 'helpType',
  requesterType = 'requesterType',
  endingDate = 'endingDate',
  qualification = 'qualification',
  helperType = 'helperType',
  isOnline = 'isOnline',
}
export type TypeKeyFlatFilter = keyof typeof FlatFilter;
export type TypeKeyFlatFilterValue = Date | string[] | boolean[];
export type TypeFlatFilter = { [key in TypeKeyFlatFilter]?: TypeKeyFlatFilterValue };

type testTypeSelectedFilters = Omit<TypeSelectedFilters, FilterOptions.helperRequirements>;
export type test = Omit<testTypeSelectedFilters, 'helperRequirements'> | Partial<TypeHelperRequirementsArr>;

export type ewefw = { [key in FlatFilter]?: key extends FlatFilter.endingDate ? string : TypeKeyFlatFilterValue };
