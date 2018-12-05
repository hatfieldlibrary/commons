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
 * Created by mspalti on 2/21/17.
 */

import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {CollectionType} from '../data-types/collection.type';
import {environment} from '../../environments/environment';
import {makeStateKey, TransferState} from '@angular/platform-browser';
import {ApiDataService} from './api-data.service';

/**
 * Handles API requests for collection data.  Methods return observables of
 * an `HttpClient` request or of data contained in an `TransferState` object.
 */
@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  /**
   * `TransferState` key for collection information.
   */
  COLLECTION_KEY = makeStateKey('collections');

  /**
   * Constructor
   * @param apiService the service that manages `HttpClient` requests and `TransferState`
   * @param state the existing `TransferState` object
   */
  constructor(private apiService: ApiDataService,
              private state: TransferState) {
  }

  public getCollectionsByAreaId(id: string): Observable<CollectionType[]> {
    const found = this.state.hasKey(this.COLLECTION_KEY);
    if (found) {
      return this.apiService.getTransferState(this.COLLECTION_KEY);
    }
    return this.apiService.getApiRequest(this.COLLECTION_KEY, environment.apiHost + environment.apiRoot + '/collection/area/' + id);
  }

  public getCollectionsByAreaSubject(subjectId: string, areaId: string): Observable<CollectionType[]> {
    const found = this.state.hasKey(this.COLLECTION_KEY);
    if (found) {
      return this.apiService.getTransferState(this.COLLECTION_KEY);
    }
    return this.apiService.getApiRequest(this.COLLECTION_KEY, environment.apiHost + environment.apiRoot +
      '/collection/area/' + areaId + '/subject/' + subjectId);
  }

  public getCollectionsBySubject(id: string): Observable<CollectionType[]> {
    const found = this.state.hasKey(this.COLLECTION_KEY);
    if (found) {
      return this.apiService.getTransferState(this.COLLECTION_KEY);
    }
    return this.apiService.getApiRequest(this.COLLECTION_KEY, environment.apiHost
      + environment.apiRoot + '/collection/subject/' + id);
  }

  public getCollectionsByType(id: string): Observable<CollectionType[]> {
    const found = this.state.hasKey(this.COLLECTION_KEY);
    if (found) {
      return this.apiService.getTransferState(this.COLLECTION_KEY);
    }
    return this.apiService.getApiRequest(this.COLLECTION_KEY, environment.apiHost
      + environment.apiRoot + '/collection/type/' + id);
  }

  public getCollectionsByTypeArea(areaId: string, typeId: string): Observable<CollectionType[]> {
    const found = this.state.hasKey(this.COLLECTION_KEY);
    if (found) {
      return this.apiService.getTransferState(this.COLLECTION_KEY);
    }
    return this.apiService.getApiRequest(this.COLLECTION_KEY, environment.apiHost + environment.apiRoot
      + '/collection/area/' + areaId + '/type/' + typeId);
  }

  public getCollectionsByTypeSubject(typeId: string, subjectId: string): Observable<CollectionType[]> {
    const found = this.state.hasKey(this.COLLECTION_KEY);
    if (found) {
      return this.apiService.getTransferState(this.COLLECTION_KEY);
    }
    return this.apiService.getApiRequest(this.COLLECTION_KEY, environment.apiHost + environment.apiRoot
      + '/collection/type/' + typeId
      + '/subject/' + subjectId);
  }

  public getCollectionsByTypeAreaSubject(typeId: string, areaId: string, subjectId: string): Observable<CollectionType[]> {
    const found = this.state.hasKey(this.COLLECTION_KEY);
    if (found) {
      return this.apiService.getTransferState(this.COLLECTION_KEY);
    }
    return this.apiService.getApiRequest(this.COLLECTION_KEY, environment.apiHost + environment.apiRoot
      + '/collection/area/' + areaId
      + '/type/' + typeId
      + '/subject/' + subjectId);
  }

  public etCollectionsByCategory(categoryId: string): Observable<CollectionType[]> {
    const found = this.state.hasKey(this.COLLECTION_KEY);
    if (found) {
      return this.apiService.getTransferState(this.COLLECTION_KEY);
    }
    return this.apiService.getApiRequest(this.COLLECTION_KEY, environment.apiHost + environment.apiRoot
      + '/collection/category/' + categoryId);
  }

  public getCollectionsByCategoryArea(categoryId: string, areaId: string): Observable<CollectionType[]> {
    const found = this.state.hasKey(this.COLLECTION_KEY);
    if (found) {
      return this.apiService.getTransferState(this.COLLECTION_KEY);
    }
    return this.apiService.getApiRequest(this.COLLECTION_KEY, environment.apiHost + environment.apiRoot
      + '/collection/category/' + categoryId
      + '/area/' + areaId);
  }

  public getCollectionsByCategoryType(categoryId: string, typeId: string): Observable<CollectionType[]> {
    const found = this.state.hasKey(this.COLLECTION_KEY);
    if (found) {
      return this.apiService.getTransferState(this.COLLECTION_KEY);
    }
    return this.apiService.getApiRequest(this.COLLECTION_KEY, environment.apiHost + environment.apiRoot
      + '/collection/category/' + categoryId
      + '/type/' + typeId);
  }

  public getCollectionsByCategorySubject(categoryId: string, subjectId: string): Observable<CollectionType[]> {
    const found = this.state.hasKey(this.COLLECTION_KEY);
    if (found) {
      return this.apiService.getTransferState(this.COLLECTION_KEY);
    }
    return this.apiService.getApiRequest(this.COLLECTION_KEY, environment.apiRoot
      + '/collection/category/' + categoryId
      + '/subject/' + subjectId);
  }

  public getCollectionsByCategoryAreaType(categoryId: string, areaId: string, typeId: string): Observable<CollectionType[]> {
    const found = this.state.hasKey(this.COLLECTION_KEY);
    if (found) {
      return this.apiService.getTransferState(this.COLLECTION_KEY);
    }
    return this.apiService.getApiRequest(this.COLLECTION_KEY, environment.apiHost + environment.apiRoot
      + '/collection/category/' + categoryId
      + '/area/' + areaId
      + '/type/' + typeId);
  }

  getCollectionsByCategoryAreaSubject(categoryId: string, areaId: string, subjectId: string): Observable<CollectionType[]> {
    const found = this.state.hasKey(this.COLLECTION_KEY);
    if (found) {
      return this.apiService.getTransferState(this.COLLECTION_KEY);
    }
    return this.apiService.getApiRequest(this.COLLECTION_KEY, environment.apiHost + environment.apiRoot
      + '/collection/category/' + categoryId
      + '/area/' + areaId
      + '/subject/' + subjectId);
  }

  public getCollectionsByCategoryTypeSubject(categoryId: string, typeId: string, subjectId: string): Observable<CollectionType[]> {
    const found = this.state.hasKey(this.COLLECTION_KEY);
    if (found) {
      return this.apiService.getTransferState(this.COLLECTION_KEY);
    }
    return this.apiService.getApiRequest(this.COLLECTION_KEY, environment.apiHost + environment.apiRoot
      + '/collection/category/' + categoryId
      + '/type/' + typeId
      + '/subject/' + subjectId);
  }

  public getCollectionsByCategoryAreaTypeSubject(categoryId: string,
                                          areaId: string,
                                          typeId: string,
                                          subjectId: string): Observable<CollectionType[]> {
    const found = this.state.hasKey(this.COLLECTION_KEY);
    if (found) {
      return this.apiService.getTransferState(this.COLLECTION_KEY);
    }
    return this.apiService.getApiRequest(this.COLLECTION_KEY, environment.apiHost + environment.apiRoot
      + '/collection/category/' + categoryId
      + '/area/' + areaId
      + '/type/' + typeId
      + '/subject/' + subjectId);
  }

  public getAllCollections(): Observable<CollectionType[]> {
    const found = this.state.hasKey(this.COLLECTION_KEY);
    if (found) {
      return this.apiService.getTransferState(this.COLLECTION_KEY);
    }
    return this.apiService.getApiRequest(this.COLLECTION_KEY, environment.apiHost + environment.apiRoot + '/collection');
  }

}

