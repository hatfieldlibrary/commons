
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

import {inject, TestBed} from '@angular/core/testing';
// import {HttpModule, ResponseOptions, XHRBackend } from "@angular/http";
// import {MockBackend } from "@angular/http/testing";
import {ItemType} from '../data-types/item.type';

describe('Item Service', () => {

  const itemMock: ItemType = {

      collection: {
        id: 1,
        title: 'test collection',
        url: '',
        searchUrl: '',
        description: '',
        linkOptions: '',
        image: '',
        date: '',
        items: '',
        searchOptions: '',
        assetType: '',
        restricted: false,
        published: false,
        parent: []
      },
      category: {
        id: 1,
        title: 'test category',
        linkLabel: '',
        url: '',
        secondaryUrl: '',
        description: '',
        areaId: ''
      },
      itemTypes: [{
        id: 0,
        name: 'test item type',
        icon: ''
      }],
      subjects: []

  };

  // beforeEach(() => {
  //   TestBed.configureTestingModule({
  //     imports: [
  //       HttpModule
  //     ],
  //     providers: [
  //       ItemService,
  //       MockBackend,
  //       {provide: XHRBackend, useClass: MockBackend}
  //     ]
  //   })
  //     .compileComponents();
  // });


  // it('get item', inject([ItemService, MockBackend], (itemService:ItemService, mockBackend:MockBackend) => {
  //   mockBackend.connections.subscribe(conn => {
  //     conn.mockRespond(new Response(new ResponseOptions({body: itemMock})));
  //   });
  //   const result = itemService.getItem('1');
  //   result.subscribe(res => {
  //     expect(res).toEqual(
  //       itemMock
  //     );
  //   });
  //
  // }));

});

