/*
 * Copyright (c) 2017.
 *
 *   This program is free software: you can redistribute it and/or modify
 *    it under the terms of the GNU General Public License as published by
 *    the Free Software Foundation, either version 3 of the License, or
 *    (at your option) any later version.
 *
 *    This program is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU General Public License for more details.
 *
 *   You should have received a copy of the GNU General Public License
 *    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * Created by mspalti on 2/21/17.
 */

import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {CollectionType} from '../shared/data-types/collection.type';
import { environment } from '../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class CollectionService {

  constructor(private http: HttpClient) {}

  getCollectionsByAreaId(id: string): Observable<CollectionType[]> {
    return this.http.get<CollectionType[]>(environment.apiHost + environment.apiRoot + '/collection/area/' + id);
  }

  getCollectionsByAreaSubject(id: string, areaId: string): Observable<CollectionType[]> {
    return this.http.get<CollectionType[]>(environment.apiHost + environment.apiRoot + '/collection/subject/' + id + '/area/' + areaId);
  }

  getCollectionsBySubject(id: string): Observable<CollectionType[]> {
    return this.http.get<CollectionType[]>(environment.apiHost + environment.apiRoot + '/collection/subject/' + id);
  }

  getCollectionsByType(id: string): Observable<CollectionType[]> {
    return this.http.get<CollectionType[]>(environment.apiHost + environment.apiRoot + '/collection/type/' + id);
  }

  getCollectionsByTypeArea(typeId: string, areaId: string): Observable<CollectionType[]> {
    return this.http.get<CollectionType[]>(environment.apiHost + environment.apiRoot + '/collection/area/' + areaId + '/type/' + typeId);
  }

  getCollectionsByTypeSubject(typeId: string, subjectId: string): Observable<CollectionType[]> {
    return this.http.get<CollectionType[]>(environment.apiHost + environment.apiRoot
      + '/collection/type/' + typeId
      + '/subject/' + subjectId );
  }

  getCollectionsByTypeAreaSubject(typeId: string, areaId: string, subjectId: string): Observable<CollectionType[]> {
    return this.http.get<CollectionType[]>(environment.apiHost + environment.apiRoot
      + '/collection/type/' + typeId
      + '/area/' + areaId
      + '/subject/' + subjectId );
  }

  getAllCollections(): Observable<CollectionType[]> {
    return this.http.get<CollectionType[]>(environment.apiHost + environment.apiRoot + '/collection');
  }

}

