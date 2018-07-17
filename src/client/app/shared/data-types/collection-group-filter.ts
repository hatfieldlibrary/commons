import {FieldFilterType} from './field-filter.type';


export interface CollectionGroupFilter {
  groups: FieldFilterType[];
  selectedGroups: FieldFilterType[];
  previousGroups?: FieldFilterType[];
}
