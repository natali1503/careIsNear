import { HelpRequestData } from '../../api/generated';
import { NestedObject, SingleObject } from '../selectedFilters';

export function filterForParams(data: HelpRequestData[], params: SingleObject | NestedObject) {
  return data.filter((requestHelp) => {
    return Object.entries(params).every(([key, values]) => {
      if (Array.isArray(values)) {
        return values.includes(requestHelp[key]);
      } else {
        return Object.entries(values).every(([keyNew, valuesNew]) => {
          if (Array.isArray(valuesNew)) return valuesNew.includes(requestHelp[key][keyNew]);
        });
      }
    });
  });
}
const testObj = {
  requesterType: ['person'],
  helperRequirements: { qualification: ['professional', 'common'], helperType: ['group'] },
};
