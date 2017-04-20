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

import {MockBackend} from "@angular/http/testing";
import {HttpModule, ResponseOptions, XHRBackend} from "@angular/http";
import {inject, TestBed} from "@angular/core/testing";
import {RelatedService} from "./related.service";
/**
 * Created by mspalti on 4/19/17.
 */


const relatedMock = [
  {
    id: 1,
    name: 'test collection',
    image: ''
  }
];

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [
      HttpModule
    ],
    providers: [
      RelatedService,
      MockBackend,
      {provide: XHRBackend, useClass: MockBackend}
    ]
  })
    .compileComponents();
});

it('should get related collections', inject([RelatedService, MockBackend], (relatedService, mockBackend) => {
  mockBackend.connections.subscribe((conn) => {
    conn.mockRespond(new Response(new ResponseOptions({body: relatedMock})));
  });
  const result = relatedService.getRelatedCollections('1','1,2');
  result.subscribe((res) => {
    expect(res.response).toEqual({
      relatedMock
    });

  });

}));
