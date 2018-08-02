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
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Observable} from 'rxjs/Observable';
import {FieldFilterType} from '../shared/data-types/field-filter.type';


@Injectable()
export class CollectionGroupServices {

  constructor(private http: HttpClient) {}

  getAllGroups(): Observable<FieldFilterType[]> {
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
