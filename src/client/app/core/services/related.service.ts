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


import {map} from 'rxjs/operators';
/**
 * Created by mspalti on 4/10/17.
 */
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '../../environments/environment';
import {RelatedType} from '../data-types/related-collection';
import {RelatedItems} from '../data-types/related-items';

@Injectable({
  providedIn: 'root'
})
export class RelatedService {

  constructor(private http: HttpClient) {}

  getRelatedCollections(id: string, subjectIds: string): Observable<RelatedType[]> {
    return this.http.get<RelatedItems>(environment.apiHost + environment.apiRoot + '/collection/' + id + '/related/' + subjectIds).pipe(
      map(res => res.related));
  }

}
