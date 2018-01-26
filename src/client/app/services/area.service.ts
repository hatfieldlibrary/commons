
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
