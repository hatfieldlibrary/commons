
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


import {provideMockActions} from '@ngrx/effects/testing';
import {hot, cold} from 'jasmine-marbles';
import {TestBed} from '@angular/core/testing';
import {Observable,} from 'rxjs/Observable';

import {ItemEffects} from "./item.effects";
import {ItemService} from "../services/item.service";
import {ItemRequest, ItemSuccess, ItemRequestFailed, ItemReset} from "../actions/item.actions";


describe('Item Effect', () => {

  let itemEffects: ItemEffects;
  let itemService: ItemService;
  let actions: Observable<any>;

  const mockItem = {
    collection: {
      id: 1,
      title: 'test title',
      image: 'image',
      url: 'url',
      searchUrl: '',
      browseType: '',
      description: '',
      date: '',
      items: '',
      linkOptions: '',
      assetType: '',
      searchOptions: '',
      restricted: true,
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


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ItemEffects,
        {
          provide: ItemService,
          useClass: class {
            getItem = () => {
              return Observable.of(mockItem);
            };
          }
        },
        provideMockActions(() => actions)
      ]
    });

    itemEffects = TestBed.get(ItemEffects);
   itemService = TestBed.get(ItemService);

  });

  it('should item success action after item is retrieved', () => {

    const startAction = new ItemRequest('1');
    const hotMarble = {a: startAction};
    actions = hot('--a-', hotMarble);
    const successAction = new ItemSuccess(mockItem);
    const expectedResults = cold('--b', {b: successAction});
    expect(itemEffects.itemEffect$).toBeObservable(expectedResults);

  });


  it('should return error action action for item request', () => {

    spyOn(itemService, 'getItem').and.callFake(() => { return Observable.throw('error') });
    const startAction = new ItemRequest('1');
    const hotMarble = {a: startAction};
    actions = hot('--a-', hotMarble);
    const failAction = new ItemRequestFailed('test');
    // create error response and complete observable
    const expectedResults = cold('--(b|)',  {b: failAction});
    expect(itemEffects.itemEffect$).toBeObservable(expectedResults);

  });

});

