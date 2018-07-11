
import {SubjectType} from './subject.type';

export interface SubjectFilter {
  subjects: SubjectType[];
  selectedSubjects: SubjectType[];
  removedSubjects?: SubjectType[];
}
