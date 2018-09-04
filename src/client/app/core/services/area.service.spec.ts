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

import {AreaService, AreasResponse} from './area.service';
import {TestBed} from '@angular/core/testing';
import {AreaFilterType} from '../data-types/area-filter.type';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {AreaType} from '../data-types/area.type';
import {ApiDataService} from './api-data.service';
import {TransferState} from '@angular/platform-browser';


describe('Area Service', () => {

  const mockAreasList: AreaFilterType[] = [
    {
      id: 1,
      title: 'test areas one',
      count: 1
    }, {
      id: 2,
      title: 'test areas two',
      count: 1
    }
  ];

  const mockAreaInfo: AreaType = {
    id: 1,
    title: 'test areas',
    linkLabel: '',
    url: '',
    searchUrl: '',
    image: '',
    description: '',
    position: 2
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [

      ],
      providers: [
        AreaService,
        {
          provide: ApiDataService,
          useClass: {}
        }, {
          provide: TransferState,
          useClass: {

          }
        }
        // MockBackend,
        // {provide: XHRBackend, useClass: MockBackend}
      ]
    });
  });


  it('should get areaList', () => {
    const areaService = TestBed.get(AreaService);
    const http = TestBed.get(HttpTestingController);
    const result = areaService.getAreaList('1');
    result.subscribe((res: AreasResponse) => {
      expect(res.response).toEqual(
        mockAreasList
      );
      expect(res.area).toEqual('1');
    });

  });

  // it('should get areas info', inject([AreaService, MockBackend], (areaService, mockBackend) => {
  //   mockBackend.connections.subscribe((conn) => {
  //     conn.mockRespond(new Response(new ResponseOptions({body: mockAreaInfo})));
  //   });
  //   const result = areaService.getAreaInfo('1');
  //   result.subscribe((res) => {
  //     expect(res.response).toEqual(
  //       mockAreaInfo
  //     );
  //
  //   });

 // }));
});
