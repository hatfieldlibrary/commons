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
 * Created by mspalti on 2/24/17.
 */
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { environment } from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {FieldFilterType} from '../shared/data-types/field-filter.type';

@Injectable()
export class SubjectService {

  constructor(private http: HttpClient) {}

  getAllSubjects(): Observable<FieldFilterType[]> {
    return this.http.get<FieldFilterType[]>(environment.apiHost + environment.apiRoot + '/subject');
  }

  getSubjectsForArea(areaIds: string): Observable<FieldFilterType[]> {
    return this.http.get<FieldFilterType[]>(environment.apiHost + environment.apiRoot + '/subject/area/' + areaIds);
  }

  getSubjectsForType(typeId: string): Observable<FieldFilterType[]> {
    return this.http.get<FieldFilterType[]>(environment.apiHost + environment.apiRoot + '/subject/type/' + typeId);
  }

  getSubjectsForAreaAndType(areaId: string, typeId: string): Observable<FieldFilterType[]> {
    return this.http.get<FieldFilterType[]>(environment.apiHost + environment.apiRoot
      + '/subject/area/' + areaId + '/type/' + typeId);
  }

  getSubjectsForAreaGroupAndType(areaId: string, groupId: string, typeId: string): Observable<FieldFilterType[]> {
    return this.http.get<FieldFilterType[]>(environment.apiHost + environment.apiRoot
      + '/subject/area/' + areaId + '/category/' + groupId + '/type/' + typeId);
  }

  getSubjectsForAreaAndGroup(areaId: string, groupId: string): Observable<FieldFilterType[]> {
    return this.http.get<FieldFilterType[]>(environment.apiHost + environment.apiRoot
      + '/subject/area/' + areaId + '/category/' + groupId);
  }
}
