
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {environment} from '../environments/environment';
import {TypesFilterType} from '../shared/data-types/types-filter.type';
import {AreaSubjectParams} from '../actions/area-subject-parameters.interface';
import {HttpClient} from '@angular/common/http';

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
    return this.http.get<TypesFilterType[]>(environment.apiHost + environment.apiRoot + '/type/areas/' + areaIds);
  }

  getTypesAreaSubject(params: AreaSubjectParams): Observable<TypesFilterType[]> {
    const areaIds = params.areas.join(',');
    return this.http.get<TypesFilterType[]>(environment.apiHost
      + environment.apiRoot + '/type/areas/'
      + areaIds + '/subject/'
      + params.subject);

  }
}
