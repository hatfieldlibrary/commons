
import {FieldFilterType} from './field-filter.type';

export interface TypesFilter {
  types: FieldFilterType[];
  selectedTypes: FieldFilterType[];
  previousTypes?: FieldFilterType[];
}
