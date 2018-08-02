
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
import {Observable} from 'rxjs/Observable';
import {AreaType} from '../shared/data-types/area.type';
import { environment } from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {AreaFilterType} from '../shared/data-types/area-filter.type';


export interface AreasResponse {
  area: string;
  response: AreaFilterType[]
}

@Injectable()
export class AreaService {

  constructor(private http: HttpClient) {}

  getAreaList(): Observable<AreaFilterType[]> {
    return this.http.get<AreaFilterType[]>(environment.apiHost + environment.apiRoot + '/area/collection');
  }

  getAreaListBySubject(id: string): Observable<AreaFilterType[]> {
    return this.http.get<AreaFilterType[]>(environment.apiHost + environment.apiRoot + '/area/subject/' + id);
  }

  getAreaListByType(id: string): Observable<AreaFilterType[]> {
    return this.http.get<AreaFilterType[]>(environment.apiHost + environment.apiRoot + '/area/type/' + id);
  }

  getAreaListByTypeSubject(typeId: string, subjectId: string): Observable<AreaFilterType[]> {
    return this.http.get<AreaFilterType[]>(environment.apiHost + environment.apiRoot +
      '/area/type/' +
      typeId + '/subject/' +
      subjectId);
  }

  getAreaInfo(id: string): Observable<AreaType[]> {
    return this.http.get<AreaType[]>(environment.apiHost + environment.apiRoot + '/area/id/' + id);
  }

}
