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

/**
 * Created by mspalti on 2/24/17.
 */
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { environment } from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {FieldFilterType} from '../data-types/field-filter.type';

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
