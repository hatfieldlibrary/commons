
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


import {provideMockActions} from '@ngrx/effects/testing';
import {hot, cold} from 'jasmine-marbles';
import {TestBed} from '@angular/core/testing';
import {Observable, } from 'rxjs/Observable';

import {ItemEffects} from './item.effects';
import {ItemService} from '../../services/item.service';
import {ItemRequest, ItemSuccess, ItemRequestFailed, ItemReset} from '../actions/item.actions';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';


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

    spyOn(itemService, 'getItem').and.callFake(() => { return ErrorObservable.create('test') });
    const startAction = new ItemRequest('1');
    const hotMarble = {a: startAction};
    actions = hot('--a-', hotMarble);
    const failAction = new ItemRequestFailed('test');
    // create error response and complete observable
    const expectedResults = cold('--(b|)',  {b: failAction});
    expect(itemEffects.itemEffect$).toBeObservable(expectedResults);

  });

});

