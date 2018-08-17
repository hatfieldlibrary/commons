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

import {RelatedService} from '../../services/related.service';
import {ItemActionRelated, ItemActionRelatedSuccess, RelatedItemRequestFailed} from 'app/core/ngrx/actions/related.actions';
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


  it('should return error action action for related request', () => {

    spyOn(relatedService, 'getRelatedCollections').and.callFake(() => { return ErrorObservable.create('test') });
    const startAction = new ItemActionRelated('1', '1,2');
    const hotMarble = {a: startAction};
    actions = hot('--a-', hotMarble);
    const failAction = new RelatedItemRequestFailed('test');
    // create error response and complete observable
    const expectedResults = cold('--(b|)',  {b: failAction});
    expect(relatedEffects.relatedEffect$).toBeObservable(expectedResults);

  });

});

