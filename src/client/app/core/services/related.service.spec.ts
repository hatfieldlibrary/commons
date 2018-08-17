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
import {getTestBed, inject, TestBed} from '@angular/core/testing';
import {RelatedService} from './related.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import {environment} from '../../environments/environment';
/**
 * Created by mspalti on 4/19/17.
 */


describe('RelatedService', () => {

  const relatedMock = [
      {
        id: 1,
        name: 'test collection',
        image: ''
      }
      ];

  const resultMock = {
    related: relatedMock
  };

  let httpMock;
  let relatedService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        RelatedService
      ]
    });
    httpMock = TestBed.get(HttpTestingController);
    relatedService = getTestBed().get(RelatedService);
  });

  it('should get related items', () => {
    const result = relatedService.getRelatedCollections('1', '1');
    result.subscribe(res => {
      expect(res).toEqual(relatedMock);
    });
    const req = httpMock.expectOne(environment.apiHost + environment.apiRoot + '/collection/' + '1' + '/related/' + '1');
    expect(req.request.method).toEqual('GET');
    req.flush(resultMock);
    httpMock.verify();
  });

});




// it('should get related collections', inject([RelatedService, MockBackend], (relatedService, mockBackend) => {
//   mockBackend.connections.subscribe((conn) => {
//     conn.mockRespond(new Response(new ResponseOptions({body: relatedMock})));
//   });
//   const result = relatedService.getRelatedCollections('1','1,2');
//   result.subscribe((res) => {
//     expect(res.response).toEqual({
//       relatedMock
//     });
//
//   });


