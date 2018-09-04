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
import {AreaType} from '../data-types/area.type';
import {environment} from '../../environments/environment';
import {AreaFilterType} from '../data-types/area-filter.type';
import {makeStateKey, TransferState} from '@angular/platform-browser';
import {ApiDataService} from './api-data.service';


export interface AreasResponse {
  area: string;
  response: AreaFilterType[]
}


@Injectable({
  providedIn: 'root'
})
export class AreaService {

  AREA_INFO_KEY = makeStateKey('area-info');
  AREA_LIST_KEY = makeStateKey('area-list');

  constructor(private apiService: ApiDataService,
              private state: TransferState) {
  }

  /**
   * Gets the list of all areas for navigation menu or option list.
   */
  getAreaList(): Observable<AreaFilterType[]> {
    const found = this.state.hasKey(this.AREA_LIST_KEY);
    if (found) {
      return this.apiService.getTransferState(this.AREA_LIST_KEY);
    }
    return this.apiService.getApiRequest(this.AREA_LIST_KEY, environment.apiHost + environment.apiRoot + '/area/collection');
  }

  /**
   * Gets the filtered list of areas for use with option lists. (Not used by current application since
   * areas are listed in a global navigation menu and not used as filter options.)
   * @param id
   */
  getAreaListBySubject(id: string): Observable<AreaFilterType[]> {
    const found = this.state.hasKey(this.AREA_LIST_KEY);
    if (found) {
      return this.apiService.getTransferState(this.AREA_LIST_KEY);
    }
    return this.apiService.getApiRequest(this.AREA_LIST_KEY, environment.apiHost + environment.apiRoot + '/area/subject/' + id);
  }

  /**
   * Not used.  See above.
   * @param id
   */
  getAreaListByType(id: string): Observable<AreaFilterType[]> {
    const found = this.state.hasKey(this.AREA_LIST_KEY);
    if (found) {
      return this.apiService.getTransferState(this.AREA_LIST_KEY);
    }
    return this.apiService.getApiRequest(this.AREA_LIST_KEY, environment.apiHost + environment.apiRoot + '/area/type/' + id);
  }

  /**
   * Not used.  See above.
   * @param typeId
   * @param subjectId
   */
  getAreaListByTypeSubject(typeId: string, subjectId: string): Observable<AreaFilterType[]> {
    const found = this.state.hasKey(this.AREA_LIST_KEY);
    if (found) {
      return this.apiService.getTransferState(this.AREA_LIST_KEY);
    }
    return this.apiService.getApiRequest(this.AREA_LIST_KEY, environment.apiHost + environment.apiRoot +
      '/area/type/' +
      typeId + '/subject/' +
      subjectId);
  }

  /**
   * Gets the complete information for the currently selected area.
   * @param id
   */
  getAreaInfo(id: string): Observable<AreaType[]> {
    const found = this.state.hasKey(this.AREA_INFO_KEY);
    if (found) {
      return this.apiService.getTransferState(this.AREA_INFO_KEY);
    }
    return this.apiService.getApiRequest(this.AREA_INFO_KEY, environment.apiHost + environment.apiRoot + '/area/id/' + id);
  }

}
