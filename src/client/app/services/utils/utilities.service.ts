import { Injectable } from '@angular/core';
import {SubjectType} from '../../shared/data-types/subject.type';
import {environment} from '../../environments/environment';
import {AreaFilterType} from 'app/shared/data-types/area-filter.type';
import {TypesFilterType} from '../../shared/data-types/types-filter.type';
import {SubjectFilterType} from '../../shared/data-types/subject-filter.type';

@Injectable()
export class UtilitiesService {

  urlRootPath = '/' + environment.appRoot;

  constructor() { }

  private _handleAreaBackLinks(selectedArea: string, selectedSubject: SubjectType, selectedTypes: string): string {
      if (selectedSubject && selectedSubject.id !== 0 && selectedTypes) {
        return this._areaSubjectTypeLink(selectedArea, selectedSubject, selectedTypes);
      } else if (selectedSubject && selectedSubject.id !== 0) {
        return this._areaSubjectLink(selectedArea, selectedSubject);
      } else if (selectedTypes) {
        return this._areaTypeLink(selectedArea, selectedTypes);
      } else {
        return this._areaLink(selectedArea);
      }
  }

  private _handleGlobalBackLinks(selectedSubject: SubjectType, selectedTypes: string): string {
    if (selectedSubject && selectedSubject.id !== 0 && selectedTypes) {
      return this._globalSubjectTypeLink(selectedSubject, selectedTypes);
    } else if (selectedSubject && selectedSubject.id !== 0) {
      return this._globalSubjectLink(selectedSubject);
    } else if (selectedTypes) {
      return this._globalTypeLink(selectedTypes);
    } else {
      return this._globalLink();
    }
  }

  private _areaSubjectTypeLink(selectedArea: string, selectedSubject: SubjectType, selectedTypes: string): string {
    return this.urlRootPath + `/collection/area/${selectedArea}/type/${selectedTypes}/subject/${selectedSubject.id}`;
  }

  private _areaSubjectLink(selectedArea: string, selectedSubject: SubjectType): string {
    return this.urlRootPath + `/collection/subject/${selectedSubject.id}/area/${selectedArea}`;
  }

  private _areaTypeLink(selectedArea: string, selectedTypes: string): string {
    return this.urlRootPath + `/collection/area/${selectedArea}/type/${selectedTypes}`;
  }

  private _areaLink(selectedArea: string): string {
    return this.urlRootPath + `/collection/area/${selectedArea}`;
  }

  private _globalLink(): string {
    return this.urlRootPath + '/collection'
  }

  private _globalTypeLink(selectedTypes: string): string {
    return this.urlRootPath + `/collection/type/${selectedTypes}`;
  }

  private _globalSubjectLink(selectedSubject: SubjectType): string {
    return this.urlRootPath + `/collection/subject/${selectedSubject.id}`;
  }

  private _globalSubjectTypeLink(selectedSubject: SubjectType, selectedTypes: string): string {
    return this.urlRootPath + `/collection}/subject/${selectedSubject.id}/type/${selectedTypes}`;
  }

  getBackLink(selectedArea: string, selectedSubject: SubjectType, selectedTypes: string): string {
    if (selectedArea && selectedArea !== '0') {
      return this._handleAreaBackLinks(selectedArea, selectedSubject, selectedTypes);
    } else if (selectedArea === '0') {
      return this._handleGlobalBackLinks(selectedSubject, selectedTypes);
    }
  }

}
