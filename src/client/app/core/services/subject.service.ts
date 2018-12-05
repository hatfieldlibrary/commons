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
import {FieldFilterType} from '../data-types/field-filter.type';
import {makeStateKey, TransferState} from '@angular/platform-browser';
import {ApiDataService} from './api-data.service';

/**
 * Handles API requests for related collections data.  Methods return observables of
 * an `HttpClient` request or of data contained in an `TransferState` object.
 */
@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  /**
   * `TransferState` key for related subject information.
   */
  SUBJECT_KEY = makeStateKey('subject-options');

  /**
   * Constructor
   * @param apiService the service that manages `HttpClient` requests and `TransferState`
   * @param state the existing `TransferState` object
   */
  constructor(private apiService: ApiDataService,
              private state: TransferState) {}

  public getAllSubjects(): Observable<FieldFilterType[]> {
    const found = this.state.hasKey(this.SUBJECT_KEY);
    if (found) {
      return this.apiService.getTransferState(this.SUBJECT_KEY);
    }
    return this.apiService.getApiRequest(this.SUBJECT_KEY, environment.apiHost + environment.apiRoot + '/subject');
  }

  public getSubjectsForArea(areaIds: string): Observable<FieldFilterType[]> {
    const found = this.state.hasKey(this.SUBJECT_KEY);
    if (found) {
      return this.apiService.getTransferState(this.SUBJECT_KEY);
    }
    return this.apiService.getApiRequest(this.SUBJECT_KEY, environment.apiHost + environment.apiRoot + '/subject/area/' + areaIds);
  }

  public getSubjectsForType(typeId: string): Observable<FieldFilterType[]> {
    const found = this.state.hasKey(this.SUBJECT_KEY);
    if (found) {
      return this.apiService.getTransferState(this.SUBJECT_KEY);
    }
    return this.apiService.getApiRequest(this.SUBJECT_KEY, environment.apiHost + environment.apiRoot + '/subject/type/' + typeId);
  }

  public getSubjectsForAreaAndType(areaId: string, typeId: string): Observable<FieldFilterType[]> {
    const found = this.state.hasKey(this.SUBJECT_KEY);
    if (found) {
      return this.apiService.getTransferState(this.SUBJECT_KEY);
    }
    return this.apiService.getApiRequest(this.SUBJECT_KEY, environment.apiHost + environment.apiRoot
      + '/subject/area/' + areaId + '/type/' + typeId);
  }

  public getSubjectsForAreaGroupAndType(areaId: string, groupId: string, typeId: string): Observable<FieldFilterType[]> {
    const found = this.state.hasKey(this.SUBJECT_KEY);
    if (found) {
      return this.apiService.getTransferState(this.SUBJECT_KEY);
    }
    return this.apiService.getApiRequest(this.SUBJECT_KEY, environment.apiHost + environment.apiRoot
      + '/subject/area/' + areaId + '/category/' + groupId + '/type/' + typeId);
  }

  public getSubjectsForAreaAndGroup(areaId: string, groupId: string): Observable<FieldFilterType[]> {
    const found = this.state.hasKey(this.SUBJECT_KEY);
    if (found) {
      return this.apiService.getTransferState(this.SUBJECT_KEY);
    }
    return this.apiService.getApiRequest(this.SUBJECT_KEY, environment.apiHost + environment.apiRoot
      + '/subject/area/' + areaId + '/category/' + groupId);
  }
}
