import cloneDeep from 'lodash.clonedeep';

import { SelectedFilters } from './Filter';
import { FilterOptions, type TypeKeyFilterOptions } from './FilterOptions';
import {
  FilterPanelStatusNoChoice,
  type TypeFilterPanelStatus,
  type TypeHelperRequirementsPanelStatus,
} from './FilterOptionsInit';
import {
  HelperRequirements,
  type TypeHelperRequirementsArr,
  type TypeKeyHelperRequirements,
} from './HelperRequirements';

export class FilterPanelStatus {
  filterPanelStatus: TypeFilterPanelStatus;
  constructor() {
    this.filterPanelStatus = cloneDeep(FilterPanelStatusNoChoice);
  }
  public update(filter: SelectedFilters) {
    for (const [keyFilterPanelStatus, value] of Object.entries(this.filterPanelStatus) as [
      TypeKeyFilterOptions,
      TypeFilterPanelStatus[keyof TypeFilterPanelStatus],
    ][]) {
      if (filter.hasKeyFilter(keyFilterPanelStatus)) {
        const valueFilter = filter.getValueByKeyFilter(keyFilterPanelStatus);

        if (valueFilter instanceof Date) this.updateDate(valueFilter);

        if (
          Array.isArray(valueFilter) &&
          (keyFilterPanelStatus === FilterOptions.helpType || keyFilterPanelStatus === FilterOptions.requesterType)
        ) {
          Object.keys(value as object).forEach((keyNested) => {
            this.filterPanelStatus[keyFilterPanelStatus][keyNested] = valueFilter.includes(keyNested);
          });
        }

        if (
          !(valueFilter instanceof Date) &&
          valueFilter !== null &&
          typeof valueFilter === 'object' &&
          !Array.isArray(valueFilter)
        ) {
          this.updateHelperRequirements(valueFilter);
        }
      }
    }
  }
  public getFilterPanelStatus() {
    return this.filterPanelStatus;
  }
  private updateDate(value: Date) {
    if (!this.filterPanelStatus) return;
    this.filterPanelStatus.endingDate = value;
  }
  private updateHelperRequirements(helperRequirements: TypeHelperRequirementsArr) {
    for (const [keyNested, valueNested] of Object.entries(this.filterPanelStatus.helperRequirements) as [
      TypeKeyHelperRequirements,
      TypeHelperRequirementsPanelStatus[keyof TypeHelperRequirementsPanelStatus],
    ][]) {
      if (keyNested === HelperRequirements.isOnline) {
        if (helperRequirements[keyNested]) {
          if (helperRequirements[keyNested].includes(true))
            this.filterPanelStatus.helperRequirements.isOnline.online = true;

          if (helperRequirements[keyNested].includes(false))
            this.filterPanelStatus.helperRequirements.isOnline.offline = true;
        } else {
          this.filterPanelStatus.helperRequirements.isOnline.online = false;
          this.filterPanelStatus.helperRequirements.isOnline.offline = false;
        }
      } else {
        Object.keys(valueNested).forEach((key) => {
          this.filterPanelStatus.helperRequirements[keyNested][key] =
            helperRequirements[keyNested]?.includes(key) ?? false;
        });
      }
    }
  }
}

export const filterPanelStatus = new FilterPanelStatus();
