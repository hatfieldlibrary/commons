
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {environment} from '../environments/environment';
import {TypesFilterType} from '../shared/data-types/types-filter.type';
import {AreaSubjectParams} from '../actions/area-subject-parameters.interface';
import {HttpClient} from '@angular/common/http';
import {TypesFilterInterface} from '../actions/type.actions';

@Injectable()
export class TypesService {

  constructor(private http: HttpClient) {}

  getTypesAll(): Observable<TypesFilterType[]> {
    return this.http.get<TypesFilterType[]>(environment.apiHost + environment.apiRoot + '/type');
  }

  getTypesSubject(subjectId: string): Observable<TypesFilterType[]> {
    return this.http.get<TypesFilterType[]>(environment.apiHost + environment.apiRoot + '/type/subject/' + subjectId);
  }

  getTypesArea(areaIds: string): Observable<TypesFilterType[]> {
    return this.http.get<TypesFilterType[]>(environment.apiHost + environment.apiRoot + '/type/area/' + areaIds);
  }

  getTypesAreaSubject(params: TypesFilterInterface): Observable<TypesFilterType[]> {
    return this.http.get<TypesFilterType[]>(environment.apiHost
      + environment.apiRoot + '/type/area/'
      + params.areaId + '/subject/'
      + params.subjectId);

  }

  getTypesAreaGroup(params: TypesFilterInterface): Observable<TypesFilterType[]> {
    return this.http.get<TypesFilterType[]>(environment.apiHost
      + environment.apiRoot + '/type/area/'
      + params.areaId + '/category/'
      + params.groupId);

  }

  getTypesAreaGroupSubject(params: TypesFilterInterface): Observable<TypesFilterType[]> {
    return this.http.get<TypesFilterType[]>(environment.apiHost
      + environment.apiRoot + '/type/area/'
      + params.areaId + '/category/'
      + params.groupId + '/subject/' + params.subjectId);

  }
}
