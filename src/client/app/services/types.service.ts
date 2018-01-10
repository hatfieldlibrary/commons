
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {environment} from '../environments/environment';
import {ContentTypeListType} from '../shared/data-types/content-types.type';
import {AreaSubjectParams} from '../actions/area-subject-parameters.interface';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class TypesService {

  constructor(private http: HttpClient) {}

  getTypesAll(): Observable<ContentTypeListType[]> {
    return this.http.get<ContentTypeListType[]>(environment.apiHost + environment.apiRoot + '/type');
  }

  getTypesSubject(subjectId: string): Observable<ContentTypeListType[]> {
    return this.http.get<ContentTypeListType[]>(environment.apiHost + environment.apiRoot + '/type/subject/' + subjectId);
  }

  getTypesArea(areaIds: string): Observable<ContentTypeListType[]> {
    return this.http.get<ContentTypeListType[]>(environment.apiHost + environment.apiRoot + '/type/areas/' + areaIds);
  }

  getTypesAreaSubject(params: AreaSubjectParams): Observable<ContentTypeListType[]> {
    const areaIds = params.areas.join(',');
    return this.http.get<ContentTypeListType[]>(environment.apiHost
      + environment.apiRoot + '/type/areas/'
      + areaIds + '/subject/'
      + params.subject);

  }
}
