
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../environments/environment';
import {ContentTypeListType} from '../shared/data-types/content-types.type';
import {AreaSubjectParams} from '../actions/area-subject-parameters.interface';

@Injectable()
export class TypesService {

  constructor(private http: Http) {}

  getTypesAll(): Observable<ContentTypeListType[]> {
    return this.http.get(environment.apiHost + environment.apiRoot + '/type')
      .map(res => res.json());
  }

  getTypesSubject(subjectId: string): Observable<ContentTypeListType[]> {
    return this.http.get(environment.apiHost + environment.apiRoot + '/type/subject/' + subjectId)
      .map(res => res.json());
  }

  getTypesArea(areaIds: string): Observable<ContentTypeListType[]> {
    return this.http.get(environment.apiHost + environment.apiRoot + '/type/area/' + areaIds)
      .map(res => res.json());
  }

  getTypesAreaSubject(params: AreaSubjectParams): Observable<ContentTypeListType[]> {
    const areaIds = params.areas.join(',');
    return this.http.get(environment.apiHost + environment.apiRoot + '/type/area/' + areaIds + '/subject/' + params.subject)
      .map(res => res.json());
  }
}
