
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {TypesFilterInterface} from '../actions/type.actions';
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

  getTypesAreaSubject(params: TypesFilterInterface): Observable<FieldFilterType[]> {
    return this.http.get<FieldFilterType[]>(environment.apiHost
      + environment.apiRoot + '/type/area/'
      + params.areaId + '/subject/'
      + params.subjectId);

  }

  getTypesAreaGroup(params: TypesFilterInterface): Observable<FieldFilterType[]> {
    return this.http.get<FieldFilterType[]>(environment.apiHost
      + environment.apiRoot + '/type/area/'
      + params.areaId + '/category/'
      + params.groupId);

  }

  getTypesAreaGroupSubject(params: TypesFilterInterface): Observable<FieldFilterType[]> {
    return this.http.get<FieldFilterType[]>(environment.apiHost
      + environment.apiRoot + '/type/area/'
      + params.areaId + '/category/'
      + params.groupId + '/subject/' + params.subjectId);

  }
}
