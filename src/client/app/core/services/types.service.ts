
/*
 * Copyright (c) [2018] [Willamette University]
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * Author: Michael Spalti
 */

import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {FieldFilterType} from '../data-types/field-filter.type';

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

  getTypesAreaSubject(areaId: string, subjectId: string): Observable<FieldFilterType[]> {
    return this.http.get<FieldFilterType[]>(environment.apiHost
      + environment.apiRoot + '/type/area/'
      + areaId + '/subject/'
      + subjectId);

  }

  getTypesAreaGroup(areaId: string, groupId: string): Observable<FieldFilterType[]> {
    return this.http.get<FieldFilterType[]>(environment.apiHost
      + environment.apiRoot + '/type/area/'
      + areaId + '/category/'
      + groupId);

  }

  getTypesAreaGroupSubject(areaId, groupId, subjectId): Observable<FieldFilterType[]> {
    return this.http.get<FieldFilterType[]>(environment.apiHost
      + environment.apiRoot + '/type/area/'
      + areaId + '/category/'
      + groupId + '/subject/' + subjectId);

  }
}
