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
import {HttpClient} from '@angular/common/http';
import {ExternalItems, ExternalLinks} from '../data-types/external-links';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

/**
 * Provides collection utilities for search and select options.
 */
@Injectable({
  providedIn: 'root'
})
export class SearchService {


  constructor(private http: HttpClient) {
  }

  /**
   * Used by component to obtain the href for a browse-by-date option. The base url is provided here because Tagger currently accepts
   * only the collection name as parameter. This is a known issue in Tagger.
   * TODO generalize to remove hard-coded url
   * @param collection the collection name
   * @param terms user provided search terms
   */
  public getOptionsQuery(collection: string, terms: string): string {
    const query = encodeURIComponent(terms);
    return `https://libmedia.willamette.edu/cview/${collection}.html#!browse:search:${collection}/date^${query}^all^and!`;
  }


  /**
   * Requests the options list from an external
   * @param collection
   */
  public getOptionsList(collection: string): Observable<ExternalItems[]> {
    return this.http.get<ExternalLinks>(
      environment.apiHost +
      environment.apiRoot +
      '/options/external/' +
      collection).pipe(
      map(res => res.result));

  }

  /**
   * Returns query string
   * @param baseURL base url for the query, including query token {$query}
   * @param terms user provided search terms
   */
  public getSimpleSearchQuery(baseURL: string, terms: string): string {

    const queryTerms = encodeURIComponent(terms);
    const splitString = baseURL.split('{$query}');
    return splitString[0] + queryTerms + splitString[1];

  }



}
