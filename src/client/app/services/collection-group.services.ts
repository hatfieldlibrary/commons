import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Observable} from 'rxjs/Observable';
import {CollectionGroupType} from '../shared/data-types/collection-group-type';


@Injectable()
export class CollectionGroupServices {

  constructor(private http: HttpClient) {}

  getAllGroups(): Observable<CollectionGroupType[]> {
    console.log(environment.apiHost + environment.apiRoot + '/category')
    return this.http.get<CollectionGroupType[]>(environment.apiHost + environment.apiRoot + '/category');
  }

  getGroupsByArea(areaId: string): Observable<CollectionGroupType[]> {
    return this.http.get<CollectionGroupType[]>(environment.apiHost + environment.apiRoot +
      '/category/area/' + areaId);
  }

  getGroupsByType(typeId: string): Observable<CollectionGroupType[]> {
    return this.http.get<CollectionGroupType[]>(environment.apiHost + environment.apiRoot +
      '/category/type/' + typeId);
  }

  getGroupsBySubject(subjectId: string): Observable<CollectionGroupType[]> {
    return this.http.get<CollectionGroupType[]>(environment.apiHost + environment.apiRoot +
      '/category/subject/' + subjectId);
  }

  getGroupsByAreaType(areaId: string, typeId: string): Observable<CollectionGroupType[]> {
    return this.http.get<CollectionGroupType[]>(environment.apiHost + environment.apiRoot +
      '/category/area/' + areaId + '/type/' + typeId);
  }

  getGroupsByAreaSubject(areaId: string, subjectId: string): Observable<CollectionGroupType[]> {
    return this.http.get<CollectionGroupType[]>(environment.apiHost + environment.apiRoot +
      '/category/area/' + areaId + '/subject/' + subjectId);
  }

  getGroupsBySubjectType(subjectId: string, typeId: string): Observable<CollectionGroupType[]> {
    return this.http.get<CollectionGroupType[]>(environment.apiHost + environment.apiRoot +
      '/category/subject/' + subjectId + '/type/' + typeId);
  }

  getGroupsByAreaSubjectType(areaId: string, subjectId: string, typeId: string): Observable<CollectionGroupType[]> {
    return this.http.get<CollectionGroupType[]>(environment.apiHost + environment.apiRoot +
      '/category/area/' + areaId + '/subject/' + subjectId + '/type/' + typeId);
  }

}
