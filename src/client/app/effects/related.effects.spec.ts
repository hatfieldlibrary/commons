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
import {Observable, } from 'rxjs/Observable';

import {RelatedService} from '../services/related.service';
import {ItemActionRelated, ItemActionRelatedSuccess, ClearRelatedItems, RelatedItemRequestFailed} from 'app/actions/related.actions';
import {RelatedEffects} from './related.effects';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';


describe('Related Items Effect', () => {

  let relatedEffects: RelatedEffects;
  let relatedService: RelatedService;
  let actions: Observable<any>;

  const relatedMock = [
    {
      id: 1,
      title: 'test subject',
      image: ''
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RelatedEffects,
        {
          provide: RelatedService,
          useClass: class {
            getRelatedCollections = () => {
              return Observable.of(relatedMock);
            };
          }
        },
        provideMockActions(() => actions)
      ]
    });

    relatedEffects = TestBed.get(RelatedEffects);
    relatedService = TestBed.get(RelatedService);

  });

  it('should return related item success action', () => {

    const startAction = new ItemActionRelated('1', '1,2');
    const hotMarble = {a: startAction};
    actions = hot('--a-', hotMarble);
    const successAction = new ItemActionRelatedSuccess(relatedMock);
    const expectedResults = cold('--b', {b: successAction});
    expect(relatedEffects.relatedEffect$).toBeObservable(expectedResults);

  });


  it('should return error action action for item request', () => {

    spyOn(relatedService, 'getRelatedCollections').and.callFake(() => { return ErrorObservable.create('error') });
    const startAction = new ItemActionRelated('1', '1,2');
    const hotMarble = {a: startAction};
    actions = hot('--a-', hotMarble);
    const failAction = new RelatedItemRequestFailed('test');
    // create error response and complete observable
    const expectedResults = cold('--(b|)',  {b: failAction});
    expect(relatedEffects.relatedEffect$).toBeObservable(expectedResults);

  });

});

