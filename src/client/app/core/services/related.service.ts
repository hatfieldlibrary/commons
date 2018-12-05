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
 * Created by mspalti on 4/10/17.
 */
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {environment} from '../../environments/environment';
import {RelatedType} from '../data-types/related-collection';
import {ApiDataService} from './api-data.service';
import {makeStateKey, TransferState} from '@angular/platform-browser';
import {map} from 'rxjs/operators';

/**
 * Handles API requests for related collections data.  Methods return observables of
 * an `HttpClient` request or of data contained in an `TransferState` object.
 */
@Injectable({
  providedIn: 'root'
})
export class RelatedService {

  /**
   * `TransferState` key for related collection items information.
   */
  RELATED_KEY = makeStateKey('related-items');

  /**
   * Constructor
   * @param apiService the service that manages `HttpClient` requests and `TransferState`
   * @param state the existing `TransferState` object
   */
  constructor(private apiService: ApiDataService,
              private state: TransferState) {}

  public getRelatedCollections(id: string, subjectIds: string): Observable<RelatedType[]> {
    const found = this.state.hasKey(this.RELATED_KEY);
    if (found) {
      return this.apiService.getTransferState(this.RELATED_KEY).pipe(map(res => res.related));
    }
    // Note that the getApiRequest() function is passed the optional map parameter
    // with the map function to append.
    return this.apiService.getApiRequest(
      this.RELATED_KEY,
      environment.apiHost + environment.apiRoot + '/collection/' + id + '/related/' + subjectIds
    ).pipe(map(res => res.related));

  }

}
