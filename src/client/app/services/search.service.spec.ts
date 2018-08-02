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

import {TestBed, getTestBed} from '@angular/core/testing';

import {SearchService} from './search.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {environment} from '../environments/environment';

describe('SearchService', () => {

  const mockList = [
    {'item': {'title': '1954', 'count': '31'}}
  ];

  const mockReponse = {
    result: mockList
  }
  const testQuery = 'http://domain/{$query}';
  const terms = 'testing';
  const externalMock =  [
      {
        title: 'test',
        count: 1
      }
    ];
  const testCollection = 'collection';
  let httpMock;
  let searchService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        SearchService
      ]
    });
    httpMock = TestBed.get(HttpTestingController);
    searchService = getTestBed().get(SearchService);
  });


  it('should get search href', () => {
    const result = searchService.executeSimpleSearchQuery(testQuery, terms);
    expect(result).toEqual('http://domain/testing')

  });

  it('should get options href', () => {
    const result = searchService.getOptionsQuery(testCollection, terms);
    expect(result).toEqual('https://libmedia.willamette.edu/cview/collection.html#!browse:search:collection/date^testing^all^and!');
  });

  it('should get options list', () => {
    const result = searchService.getOptionsList(testCollection);
    result.subscribe(res => {
      expect(res).toEqual(mockList);
    });
    const req = httpMock.expectOne(environment.apiHost + environment.apiRoot + '/options/external/' + testCollection);
    expect(req.request.method).toEqual('GET');
    req.flush(mockReponse);
    httpMock.verify();
  });
});
