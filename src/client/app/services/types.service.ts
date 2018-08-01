
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {FieldFilterType} from '../shared/data-types/field-filter.type';

@Injectable()
export class TypesService {

  constructor(private http: HttpClient) {}

  getTypesAll(): Observable<FieldFilterType[]> {
    return this.http.get<FieldFilterType[]>(environment.apiHost + environment.apiRoot + '/type');
  }

  getTypesSubject(subjectId: string): Observable<FieldFilterType[]> {
    return this.http.get<FieldFilterType[]>(environment.apiHost + environment.apiRoot + '/type/subject/' + subjectId);
  }

  getTypesArea(areaIds: string): Observable<FieldFilterType[]> {
    return this.http.get<FieldFilterType[]>(environment.apiHost + environment.apiRoot + '/type/area/' + areaIds);
  }

  getTypesAreaSubject(areaId: string, subjectId: string): Observable<FieldFilterType[]> {
    return this.http.get<FieldFilterType[]>(environment.apiHost
      + environment.apiRoot + '/type/area/'
      + areaId + '/subject/'
      + subjectId);

  }

  getTypesAreaGroup(areaId: string, groupId: string): Observable<FieldFilterType[]> {
    return this.http.get<FieldFilterType[]>(environment.apiHost
      + environment.apiRoot + '/type/area/'
      + areaId + '/category/'
      + groupId);

  }

  getTypesAreaGroupSubject(areaId, groupId, subjectId): Observable<FieldFilterType[]> {
    return this.http.get<FieldFilterType[]>(environment.apiHost
      + environment.apiRoot + '/type/area/'
      + areaId + '/category/'
      + groupId + '/subject/' + subjectId);

  }
}
