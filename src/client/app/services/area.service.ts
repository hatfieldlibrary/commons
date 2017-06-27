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
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs";
import {AreaType} from "../shared/data-types/area.type";
import { environment } from '../environments/environment';
import {AreaListItemType} from "../shared/data-types/area-list.type";


export interface AreasResponse {
  area: string;
  response: AreaListItemType[]
}

@Injectable()
export class AreaService {

  constructor(private http: Http) {}

  getAreaList(): Observable<AreaListItemType[]> {
    console.log(environment.apiHost + environment.apiRoot + '/area/collection')
    // temporary test data source
    return this.http.get(environment.apiHost + environment.apiRoot + '/area/collection')
      .map(res => <AreaListItemType[]> res.json());
  }

  getAreaInfo(id:string): Observable<AreaType[]> {
    // temporary test data source
    return this.http.get(environment.apiHost + environment.apiRoot + '/area/id/' + id)
      .map(res => <AreaType[]> res.json());
  }

}
