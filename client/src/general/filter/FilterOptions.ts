export enum FilterOptions {
  helpType = 'helpType',
  requesterType = 'requesterType',
  helperRequirements = 'helperRequirements',
  endingDate = 'endingDate',
}
export type TypeKeyFilterOptions = keyof typeof FilterOptions;
