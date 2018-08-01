/*
 * Copyright (c) 2017.
 *
 *   This program is free software: you can redistribute it and/or modify
 *    it under the terms of the GNU General Public License as published by
 *    the Free Software Foundation, either version 3 of the License, or
 *    (at your option) any later version.
 *
 *    This program is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU General Public License for more details.
 *
 *   You should have received a copy of the GNU General Public License
 *    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
import {getTestBed, inject, TestBed} from '@angular/core/testing';
import {RelatedService} from './related.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import {environment} from '../environments/environment';
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


