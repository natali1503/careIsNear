import { FilterOptions, TypeKeyFilterOptions } from './FilterOptions';
import { TypeFlatFilter, TypeKeyFlatFilter, TypeKeyFlatFilterValue } from './FlatFilter';
import {
  HelperRequirements,
  TypeHelperRequirements,
  TypeHelperRequirementsArr,
  TypeKeyHelperRequirements,
} from './HelperRequirements';
import { FilterValue, TypeSelectedFilters } from './SelectedFilters';

export class SelectedFilters {
  private filter: TypeSelectedFilters;
  constructor() {
    this.filter = {};
  }
  public init(flatFilter: TypeFlatFilter) {
    if (Object.keys(flatFilter)) this.fillFilterByFlatFilter(flatFilter);
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
  private fillFilterByFlatFilter(flatFilter: TypeFlatFilter) {
    for (const [keyFilter, valueFilter] of Object.entries(flatFilter)) {
      if ((Object.values(HelperRequirements) as string[]).includes(keyFilter)) {
        if (Array.isArray(valueFilter)) {
          const typedKeyFilter = keyFilter as TypeKeyFilterOptions;
          valueFilter.forEach((value) => {
            if (keyFilter === HelperRequirements.isOnline) {
              const typedValue = value === '1' ? true : false;
              this.updateFilter(typedKeyFilter, { [keyFilter]: typedValue } as TypeHelperRequirements);
            } else this.updateFilter(typedKeyFilter, { [keyFilter]: value } as TypeHelperRequirements);
          });
        }
      } else if (valueFilter instanceof Date) {
        this.setDate(valueFilter);
      } else {
        if (Array.isArray(valueFilter)) {
          const typedKeyFilter = keyFilter as TypeKeyFilterOptions;
          valueFilter.forEach((value) => this.updateFilter(typedKeyFilter, value as string));
        }
      }
    }
  }
  private setDate(date: Date | null) {
    this.filter[FilterOptions.endingDate] = date;
  }
  private setHelperRequirements(helperRequirements: TypeHelperRequirements) {
    const helperRequirementsObj = new SelectedHelperRequirements();
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
  public getFlatFilter() {
    const flatFilterMap = new Map();
    for (const [key, value] of Object.entries(this.filter) as [
      keyof TypeSelectedFilters,
      TypeSelectedFilters[keyof TypeSelectedFilters],
    ][]) {
      if (value) {
        const typedKey = key as keyof TypeFlatFilter;

        if (value instanceof Date) flatFilterMap.set(typedKey, value);
        else if (Array.isArray(value)) {
          flatFilterMap.set(typedKey, [...value]);
        } else if (typeof value === 'object' && !(value instanceof Date)) {
          for (const [keyNested, valueNested] of Object.entries(value) as [
            keyof TypeHelperRequirementsArr,
            TypeHelperRequirementsArr[keyof TypeHelperRequirementsArr],
          ][]) {
            if (valueNested) flatFilterMap.set(keyNested, [...valueNested]);
          }
        }
      }
    }
    return Object.fromEntries(flatFilterMap) as TypeFlatFilter;
  }
  getValueByKeyFilter(keyFilter: TypeKeyFilterOptions) {
    if (this.hasKeyFilter(keyFilter)) {
      return this.filter[keyFilter];
    } else return null;
  }
}

class SelectedHelperRequirements {
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
