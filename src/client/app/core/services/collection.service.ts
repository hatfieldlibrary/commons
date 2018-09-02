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
import {Observable, of as observableOf} from 'rxjs';
import {CollectionType} from '../data-types/collection.type';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {makeStateKey, TransferState} from '@angular/platform-browser';
import {tap} from 'rxjs/operators';

export const COLLECTION_KEY = makeStateKey('collections');

@Injectable({
  providedIn: 'root'
})
export class CollectionService {


  constructor(private http: HttpClient, private state: TransferState) {
  }

  getCollectionsByAreaId(id: string): Observable<CollectionType[]> {
    const found = this.state.hasKey(COLLECTION_KEY);
    console.log(this.state)
    console.log(COLLECTION_KEY)
    console.log(this.state.hasKey)
    console.log(found)
    console.log(this.state.get)
    const col = this.state.get(COLLECTION_KEY, <any>[]);
    console.log(col)
    if (found) {
      const collections = this.state.get(COLLECTION_KEY, <any>[]);
      this.state.remove(COLLECTION_KEY);
      return observableOf(collections);
    }
    return this.http.get<CollectionType[]>(environment.apiHost +
      environment.apiRoot + '/collection/area/' + id)
      .pipe(
        tap((res) => this.state.set(COLLECTION_KEY, res as any))
      );
  }

  getCollectionsByAreaSubject(subjectId: string, areaId: string): Observable<CollectionType[]> {
    const found = this.state.hasKey(COLLECTION_KEY);
    console.log(this.state)
    console.log(COLLECTION_KEY)
    console.log(this.state.hasKey)
    console.log(found)
    console.log(this.state.get)
    const col = this.state.get(COLLECTION_KEY, <any>[]);
    console.log(col)
    if (found) {
      console.log('service got collections')
      const collections = this.state.get(COLLECTION_KEY, <any>[]);
      this.state.remove(COLLECTION_KEY);
      return observableOf(collections);
    }
    return this.http.get<CollectionType[]>(environment.apiHost + environment.apiRoot +
      '/collection/area/' + areaId + '/subject/' + subjectId)
      .pipe(
        tap((res) => this.state.set(COLLECTION_KEY, res as any))
      );
  }

  getCollectionsBySubject(id: string): Observable<CollectionType[]> {
    return this.http.get<CollectionType[]>(environment.apiHost
      + environment.apiRoot + '/collection/subject/' + id);
  }

  getCollectionsByType(id: string): Observable<CollectionType[]> {
    return this.http.get<CollectionType[]>(environment.apiHost
      + environment.apiRoot + '/collection/type/' + id);
  }

  getCollectionsByTypeArea(areaId: string, typeId: string): Observable<CollectionType[]> {
    return this.http.get<CollectionType[]>(environment.apiHost + environment.apiRoot
      + '/collection/area/' + areaId + '/type/' + typeId);
  }

  getCollectionsByTypeSubject(typeId: string, subjectId: string): Observable<CollectionType[]> {
    return this.http.get<CollectionType[]>(environment.apiHost + environment.apiRoot
      + '/collection/type/' + typeId
      + '/subject/' + subjectId);
  }

  getCollectionsByTypeAreaSubject(typeId: string, areaId: string, subjectId: string): Observable<CollectionType[]> {
    return this.http.get<CollectionType[]>(environment.apiHost + environment.apiRoot
      + '/collection/area/' + areaId
      + '/type/' + typeId
      + '/subject/' + subjectId);
  }

  getCollectionsByCategory(categoryId: string): Observable<CollectionType[]> {
    return this.http.get<CollectionType[]>(environment.apiHost + environment.apiRoot
      + '/collection/category/' + categoryId);
  }

  getCollectionsByCategoryArea(categoryId: string, areaId: string): Observable<CollectionType[]> {
    return this.http.get<CollectionType[]>(environment.apiHost + environment.apiRoot
      + '/collection/category/' + categoryId
      + '/area/' + areaId);
  }

  getCollectionsByCategoryType(categoryId: string, typeId: string): Observable<CollectionType[]> {
    return this.http.get<CollectionType[]>(environment.apiHost + environment.apiRoot
      + '/collection/category/' + categoryId
      + '/type/' + typeId);
  }

  getCollectionsByCategorySubject(categoryId: string, subjectId: string): Observable<CollectionType[]> {
    return this.http.get<CollectionType[]>(environment.apiRoot
      + '/collection/category/' + categoryId
      + '/subject/' + subjectId);
  }

  getCollectionsByCategoryAreaType(categoryId: string, areaId: string, typeId: string): Observable<CollectionType[]> {

    return this.http.get<CollectionType[]>(environment.apiHost + environment.apiRoot
      + '/collection/category/' + categoryId
      + '/area/' + areaId
      + '/type/' + typeId);
  }

  getCollectionsByCategoryAreaSubject(categoryId: string, areaId: string, subjectId: string): Observable<CollectionType[]> {

    return this.http.get<CollectionType[]>(environment.apiHost + environment.apiRoot
      + '/collection/category/' + categoryId
      + '/area/' + areaId
      + '/subject/' + subjectId);
  }

  getCollectionsByCategoryTypeSubject(categoryId: string, typeId: string, subjectId: string): Observable<CollectionType[]> {

    return this.http.get<CollectionType[]>(environment.apiHost + environment.apiRoot
      + '/collection/category/' + categoryId
      + '/type/' + typeId
      + '/subject/' + subjectId);
  }

  getCollectionsByCategoryAreaTypeSubject(categoryId: string, areaId: string, typeId: string, subjectId: string):
    Observable<CollectionType[]> {

    return this.http.get<CollectionType[]>(environment.apiHost + environment.apiRoot
      + '/collection/category/' + categoryId
      + '/area/' + areaId
      + '/type/' + typeId
      + '/subject/' + subjectId);
  }

  getAllCollections(): Observable<CollectionType[]> {
    return this.http.get<CollectionType[]>(environment.apiHost + environment.apiRoot + '/collection');
  }

}

