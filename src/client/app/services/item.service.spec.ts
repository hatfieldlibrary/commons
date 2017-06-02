
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

import {inject, TestBed} from "@angular/core/testing";
import {HttpModule, ResponseOptions, XHRBackend } from "@angular/http";
import {MockBackend } from "@angular/http/testing";
import {ItemService} from "./item.service";
import {ItemType} from "../shared/data-types/item.type";

describe('Item Service', () => {

  const itemMock: ItemType = {

      collection: {
        id: 1,
        title: 'test collection',
        url: '',
        searchUrl: '',
        desc: '',
        linkOptions: '',
        image: '',
        dates: '',
        items: '',
        searchOptions: '',
        assetType: '',
        restricted: false,
        published: false
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [
        ItemService,
        MockBackend,
        {provide: XHRBackend, useClass: MockBackend}
      ]
    })
      .compileComponents();
  });


  it('get item', inject([ItemService, MockBackend], (itemService:ItemService, mockBackend:MockBackend) => {
    mockBackend.connections.subscribe(conn => {
      conn.mockRespond(new Response(new ResponseOptions({body: itemMock})));
    });
    const result = itemService.getItem('1');
    result.subscribe(res => {
      expect(res).toEqual(
        itemMock
      );
    });

  }));

});

