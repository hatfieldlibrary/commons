
import {FieldFilterType} from './field-filter.type';

export interface SubjectFilter {
  subjects: FieldFilterType[];
  selectedSubjects: FieldFilterType[];
  removedSubjects?: FieldFilterType[];
}
