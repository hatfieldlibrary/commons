import {TypesFilterType} from './types-filter.type';

export interface TypesFilter {
  types: TypesFilterType[];
  selectedTypes: TypesFilterType[];
  previousTypes?: TypesFilterType[];
}
