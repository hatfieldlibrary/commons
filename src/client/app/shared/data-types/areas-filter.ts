import {AreaFilterType} from './area-filter.type';
import {FieldFilterType} from './field-filter.type';

export interface AreasFilter {
  areas: FieldFilterType[];
  selectedAreas: FieldFilterType[]
}
