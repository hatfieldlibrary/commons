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

import {AreaService, AreasResponse} from './area.service';
import {TestBed} from '@angular/core/testing';
import {AreaType} from '../shared/data-types/area.type';
import {AreaFilterType} from '../shared/data-types/area-filter.type';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';


describe('Area Service', () => {

  const mockAreasList: AreaFilterType[] = [
    {
      id: 1,
      title: 'test areas one',
      count: 2
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
    description: '',
    position: 2
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        AreaService
        // MockBackend,
        // {provide: XHRBackend, useClass: MockBackend}
      ]
    })
      .compileComponents();
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
