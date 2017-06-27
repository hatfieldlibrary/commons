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

import {AreaService, AreasResponse} from "./area.service";
import {inject, TestBed} from "@angular/core/testing";
import {HttpModule, ResponseOptions, XHRBackend} from "@angular/http";
import {MockBackend} from "@angular/http/testing";
import {AreaType} from "../shared/data-types/area.type";
import {AreaListItemType} from "../shared/data-types/area-list.type";


describe('Area Service', () => {

  const mockAreasList: AreaListItemType[] = [
    {
      id: 1,
      title: 'test area one',
      count: 2
    }, {
      id: 2,
      title: 'test area two',
      count: 1
    }
  ];

  const mockAreaInfo: AreaType = {
    id: 1,
    title: 'test area',
    linkLabel: '',
    url: '',
    searchUrl: '',
    description: '',
    position: 2
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [
        AreaService,
        MockBackend,
        {provide: XHRBackend, useClass: MockBackend}
      ]
    })
      .compileComponents();
  });


  it('should get areaList', inject([AreaService, MockBackend], (areaService, mockBackend) => {
    mockBackend.connections.subscribe((conn) => {
      conn.mockRespond(new Response(new ResponseOptions({body: mockAreasList})));
    });
    const result = areaService.getAreaList('1');
    result.subscribe((res:AreasResponse) => {
      expect(res.response).toEqual(
        mockAreasList
      );
      expect(res.area).toEqual('1');
    });

  }));

  it('should get area info', inject([AreaService, MockBackend], (areaService, mockBackend) => {
    mockBackend.connections.subscribe((conn) => {
      conn.mockRespond(new Response(new ResponseOptions({body: mockAreaInfo})));
    });
    const result = areaService.getAreaInfo('1');
    result.subscribe((res) => {
      expect(res.response).toEqual(
        mockAreaInfo
      );

    });

  }));
});