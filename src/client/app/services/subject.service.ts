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
import {Observable} from 'rxjs/observable';
import {SubjectType} from '../shared/data-types/subject.type';
import { environment } from '../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class SubjectService {

  constructor(private http: HttpClient) {}

  getSubjects(areaIds: string): Observable<SubjectType[]> {
    return this.http.get<SubjectType[]>(environment.apiHost + environment.apiRoot + '/subject/area/' + areaIds);
  }

  getAllSubjects(): Observable<SubjectType[]> {
    return this.http.get<SubjectType[]>(environment.apiHost + environment.apiRoot + '/subject');
  }

  getSubjectsForType(typeId: string): Observable<SubjectType[]> {
    return this.http.get<SubjectType[]>(environment.apiHost + environment.apiRoot + '/subject/type/' + typeId);
  }

  getSubjectsForAreaAndType(areaId: string, typeId: string): Observable<SubjectType[]> {
    return this.http.get<SubjectType[]>(environment.apiHost + environment.apiRoot
      + '/subject/area/' + areaId + '/type/' + typeId);
  }

}
