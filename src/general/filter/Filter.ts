import { FilterOptions, TypeKeyFilterOptions } from './FilterOptions';
import { TypeHelperRequirements, TypeHelperRequirementsArr, TypeKeyHelperRequirements } from './HelperRequirements';
import { FilterValue, TypeSelectedFilters } from './SelectedFilters';

export class SelectedFilters {
  private filter: TypeSelectedFilters;
  constructor() {
    this.filter = {};
  }
  public getFilter() {
    return this.filter;
  }
  public updateFilter(keyFilter: TypeKeyFilterOptions, valueFilter: FilterValue) {
    if (valueFilter instanceof Date || valueFilter === null) this.setDate(valueFilter);
    if (typeof valueFilter === 'string') this.updateValueForKey(keyFilter, valueFilter);
    if (typeof valueFilter === 'object' && !(valueFilter instanceof Date)) this.setHelperRequirements(valueFilter);
    this.removeEmptyKey();
  }
  hasKeyFilter(keyFilter: TypeKeyFilterOptions): boolean {
    return keyFilter in this.filter;
  }

  private setDate(date: Date | null) {
    this.filter[FilterOptions.endingDate] = date;
  }
  private setHelperRequirements(helperRequirements: TypeHelperRequirements) {
    const helperRequirementsObj = new HelperRequirements();
    const currentValue = this.filter[FilterOptions.helperRequirements] || helperRequirementsObj.getFilter();
    helperRequirementsObj.updateFilter(currentValue, helperRequirements);
    this.filter[FilterOptions.helperRequirements] = helperRequirementsObj.getFilter();
  }
  private updateValueForKey(keyFilter: TypeKeyFilterOptions, valueFilter: string) {
    type typeValueFilter = typeof valueFilter;
    const currentValue = ((this.filter[keyFilter] as typeValueFilter[]) ||= []);
    if (currentValue.length === 0) currentValue.push(valueFilter);
    else {
      if (currentValue.includes(valueFilter)) {
        (this.filter[keyFilter] as typeValueFilter[]) = currentValue.filter((value) => value !== valueFilter);
      } else (this.filter[keyFilter] as typeValueFilter[]) = [...currentValue, valueFilter];
    }
  }
  private removeEmptyKey() {
    for (const [keyForLocalStorage, values] of Object.entries(this.filter) as [
      TypeKeyFilterOptions,
      TypeSelectedFilters[keyof TypeSelectedFilters],
    ][]) {
      if (this.chekEmpty(values)) delete this.filter[keyForLocalStorage];
    }
  }
  chekEmpty(values: TypeSelectedFilters[keyof TypeSelectedFilters]): boolean {
    if (Array.isArray(values) && values.length === 0) return true;
    else if (values === null) return true;
    else if (typeof values === 'object' && Object.keys(values).length === 0 && !(values instanceof Date)) return true;
    else return false;
  }
  public resetFilter() {
    this.filter = {};
  }
}

class HelperRequirements {
  private filterHelperRequirements: TypeHelperRequirementsArr;
  constructor() {
    this.filterHelperRequirements = {};
  }
  updateFilter(currentFilter: TypeHelperRequirementsArr, updateFilter: TypeHelperRequirements) {
    const [newKey, newValue] = Object.entries(updateFilter)[0] as [TypeKeyHelperRequirements, string | boolean];

    const newFilter: Map<TypeKeyHelperRequirements, (string | boolean)[]> = new Map();
    if (!Object.keys(currentFilter).length) {
      // currentFilter={}
      newFilter.set(newKey, [newValue]);
    } else {
      const keyFilter = Object.keys(currentFilter) as TypeKeyHelperRequirements[];
      const setKey: Set<TypeKeyHelperRequirements> = new Set([...keyFilter, newKey]);

      setKey.forEach((key: TypeKeyHelperRequirements) => {
        const currentValue = (currentFilter[key] as (string | boolean)[]) || [];
        if (key === newKey) {
          if (currentValue.includes(newValue))
            newFilter.set(key, [...currentValue.filter((value) => value !== newValue)]);
          else newFilter.set(key, [...currentValue, newValue]);
        } else if (key !== newKey) {
          newFilter.set(key, [...currentValue]);
        }
      });
    }

    this.filterHelperRequirements = Object.fromEntries(newFilter);
    this.removeValue(newKey);
  }
  hasKeyFilter(keyFilter: TypeKeyHelperRequirements): boolean {
    return keyFilter in this.filterHelperRequirements;
  }
  chekValue(keyFilter: TypeKeyHelperRequirements, valueFilter: string | boolean) {
    const curruntValue = this.filterHelperRequirements[keyFilter];
    if (typeof valueFilter === 'string') {
      return (curruntValue as string[]).includes(valueFilter);
    } else if (typeof valueFilter === 'boolean') {
      return (curruntValue as boolean[]).includes(valueFilter);
    }
  }
  private removeValue(keyFilter: TypeKeyHelperRequirements) {
    const isEmpty = this.filterHelperRequirements[keyFilter]?.length === 0;
    if (isEmpty) delete this.filterHelperRequirements[keyFilter];
  }
  public getFilter() {
    return this.filterHelperRequirements;
  }
}

export const selectedFiltersInit = new SelectedFilters();
