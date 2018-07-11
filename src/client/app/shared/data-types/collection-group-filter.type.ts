import {CollectionGroupType} from './collection-group-type';


export interface CollectionGroupFilter {
  groups: CollectionGroupType[];
  selectedGroups: CollectionGroupType[];
  previousGroups?: CollectionGroupType[];
}
