import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Observable} from 'rxjs/Observable';
import {FieldFilterType} from '../shared/data-types/field-filter.type';


@Injectable()
export class CollectionGroupServices {

  constructor(private http: HttpClient) {}

  getAllGroups(): Observable<FieldFilterType[]> {
    console.log(environment.apiHost + environment.apiRoot + '/category')
    return this.http.get<FieldFilterType[]>(environment.apiHost + environment.apiRoot + '/category');
  }

  getGroupsByArea(areaId: string): Observable<FieldFilterType[]> {
    return this.http.get<FieldFilterType[]>(environment.apiHost + environment.apiRoot +
      '/category/area/' + areaId);
  }

  getGroupsByType(typeId: string): Observable<FieldFilterType[]> {
    return this.http.get<FieldFilterType[]>(environment.apiHost + environment.apiRoot +
      '/category/type/' + typeId);
  }

  getGroupsBySubject(subjectId: string): Observable<FieldFilterType[]> {
    return this.http.get<FieldFilterType[]>(environment.apiHost + environment.apiRoot +
      '/category/subject/' + subjectId);
  }

  getGroupsByAreaType(areaId: string, typeId: string): Observable<FieldFilterType[]> {
    return this.http.get<FieldFilterType[]>(environment.apiHost + environment.apiRoot +
      '/category/area/' + areaId + '/type/' + typeId);
  }

  getGroupsByAreaSubject(areaId: string, subjectId: string): Observable<FieldFilterType[]> {
    return this.http.get<FieldFilterType[]>(environment.apiHost + environment.apiRoot +
      '/category/area/' + areaId + '/subject/' + subjectId);
  }

  getGroupsBySubjectType(subjectId: string, typeId: string): Observable<FieldFilterType[]> {
    return this.http.get<FieldFilterType[]>(environment.apiHost + environment.apiRoot +
      '/category/subject/' + subjectId + '/type/' + typeId);
  }

  getGroupsByAreaSubjectType(areaId: string, subjectId: string, typeId: string): Observable<FieldFilterType[]> {
    return this.http.get<FieldFilterType[]>(environment.apiHost + environment.apiRoot +
      '/category/area/' + areaId + '/subject/' + subjectId + '/type/' + typeId);
  }

}
