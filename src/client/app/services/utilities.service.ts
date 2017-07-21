import { Injectable } from '@angular/core';
import {SubjectType} from "../shared/data-types/subject.type";

@Injectable()
export class UtilitiesService {

  constructor() { }

  _handleAreaBackLink(selectedArea: string, selectedSubject: SubjectType): string {
    if (selectedSubject && selectedSubject.id !== 0) {
      return '/commons-preview/collection/subject/'+ selectedSubject.id +'/area/' + selectedArea
    }
    return '/commons-preview/collection/area/' + selectedArea;
  }

  _handleGlobalListBackLink(selectedSubject: SubjectType): string {
    if (selectedSubject && selectedSubject.id !== 0) {
      return '/commons-preview/collection/subject/'+  selectedSubject.id;
    }
    return '/commons-preview/collection';
  }

  getBackLink(selectedArea: string, selectedSubject: SubjectType): string {
    if (selectedArea !== '0') {
      let path = this._handleAreaBackLink(selectedArea, selectedSubject);
      return path;
    }
    let path = this._handleGlobalListBackLink(selectedSubject);
    return  path;

  }

}
