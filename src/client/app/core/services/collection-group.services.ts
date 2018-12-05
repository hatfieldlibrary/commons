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
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {FieldFilterType} from '../data-types/field-filter.type';
import {makeStateKey, TransferState} from '@angular/platform-browser';
import {ApiDataService} from './api-data.service';


/**
 * Handles API requests for collection group data.  Methods return observables of
 * an `HttpClient` request or of data contained in an `TransferState` object.
 */
@Injectable({
  providedIn: 'root'
})
export class CollectionGroupServices {

  /**
   * `TransferState` key for collection group information.
   */
  GROUP_KEY = makeStateKey('group-options');

  /**
   * Constructor
   * @param apiService the service that manages `HttpClient` requests and `TransferState`
   * @param state the existing `TransferState` object
   */
  constructor(private apiService: ApiDataService,
              private state: TransferState) {}

  public getAllGroups(): Observable<FieldFilterType[]> {
    const found = this.state.hasKey(this.GROUP_KEY);
    if (found) {
      return this.apiService.getTransferState(this.GROUP_KEY);
    }
    return this.apiService.getApiRequest(this.GROUP_KEY, environment.apiHost + environment.apiRoot + '/category');
  }

  public getGroupsByArea(areaId: string): Observable<FieldFilterType[]> {
    const found = this.state.hasKey(this.GROUP_KEY);
    if (found) {
      return this.apiService.getTransferState(this.GROUP_KEY);
    }
    return this.apiService.getApiRequest(this.GROUP_KEY, environment.apiHost + environment.apiRoot +
      '/category/area/' + areaId);
  }

  public getGroupsByType(typeId: string): Observable<FieldFilterType[]> {
    const found = this.state.hasKey(this.GROUP_KEY);
    if (found) {
      return this.apiService.getTransferState(this.GROUP_KEY);
    }
    return this.apiService.getApiRequest(this.GROUP_KEY, environment.apiHost + environment.apiRoot +
      '/category/type/' + typeId);
  }

  public getGroupsBySubject(subjectId: string): Observable<FieldFilterType[]> {
    const found = this.state.hasKey(this.GROUP_KEY);
    if (found) {
      return this.apiService.getTransferState(this.GROUP_KEY);
    }
    return this.apiService.getApiRequest(this.GROUP_KEY, environment.apiHost + environment.apiRoot +
      '/category/subject/' + subjectId);
  }

  public getGroupsByAreaType(areaId: string, typeId: string): Observable<FieldFilterType[]> {
    const found = this.state.hasKey(this.GROUP_KEY);
    if (found) {
      return this.apiService.getTransferState(this.GROUP_KEY);
    }
    return this.apiService.getApiRequest(this.GROUP_KEY, environment.apiHost + environment.apiRoot +
      '/category/area/' + areaId + '/type/' + typeId);
  }

  public getGroupsByAreaSubject(areaId: string, subjectId: string): Observable<FieldFilterType[]> {
    const found = this.state.hasKey(this.GROUP_KEY);
    if (found) {
      return this.apiService.getTransferState(this.GROUP_KEY);
    }
    return this.apiService.getApiRequest(this.GROUP_KEY, environment.apiHost + environment.apiRoot +
      '/category/area/' + areaId + '/subject/' + subjectId);
  }

  public getGroupsBySubjectType(subjectId: string, typeId: string): Observable<FieldFilterType[]> {
    const found = this.state.hasKey(this.GROUP_KEY);
    if (found) {
      return this.apiService.getTransferState(this.GROUP_KEY);
    }
    return this.apiService.getApiRequest(this.GROUP_KEY, environment.apiHost + environment.apiRoot +
      '/category/subject/' + subjectId + '/type/' + typeId);
  }

  public getGroupsByAreaSubjectType(areaId: string, subjectId: string, typeId: string): Observable<FieldFilterType[]> {
    const found = this.state.hasKey(this.GROUP_KEY);
    if (found) {
      return this.apiService.getTransferState(this.GROUP_KEY);
    }
    return this.apiService.getApiRequest(this.GROUP_KEY, environment.apiHost + environment.apiRoot +
      '/category/area/' + areaId + '/subject/' + subjectId + '/type/' + typeId);
  }

}
