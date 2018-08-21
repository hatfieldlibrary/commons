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

import {TestBed, getTestBed, fakeAsync, tick} from '@angular/core/testing';

import {SubscriptionService} from './subscription.service';
import {Action, Store} from '@ngrx/store';
import {Subject} from 'rxjs';
import {mockStore} from '../test/mock-store';

describe('SubscriptionService', () => {

  let subscriptionService: SubscriptionService;
  let store;
  const actions = new Subject<Action>();
  const states = new Subject<any>();
  const appStore = mockStore<any>({actions, states});

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SubscriptionService,
        {
          provide: Store,
          useValue: appStore
        }]
    });
    subscriptionService = getTestBed().get(SubscriptionService);
    store = TestBed.get(Store);
  });

  it('should have called select on areas', () => {
    const areas = subscriptionService.getAreasState();
    expect(areas).toBeDefined();
  });

  it('should have called select on area information', () => {
    const observable = subscriptionService.getAreaInfoState()
    expect(observable).toBeDefined();
  });

  it('should have called select on filters', () => {
    const filters = subscriptionService.getFilterState()
    expect(filters).toBeDefined();
  });

  it('should have called select on type filters', () => {
    const observable = subscriptionService.getTypesFilterState();
    expect(observable).toBeDefined();
  });

  it('should have called select on collections', fakeAsync(() => {
    const observable = subscriptionService.getCollectionState();
    expect(observable).toBeDefined();
  }));

  it('should have called select on Store subjects filter', () => {
    const observable = subscriptionService.getSubjectsFilterState();
    expect(observable).toBeDefined();
  });

  it('should have called select areas filter', () => {
    const observable = subscriptionService.getAreasFilterState();
    expect(observable).toBeDefined();
  });

  it('should have called select groups filter', () => {
    const observable = subscriptionService.getGroupsFilterState();
    expect(observable).toBeDefined();
  });

  it('should have called select groups filter', () => {
    const observable = subscriptionService.getViewTypeState();
    expect(observable).toBeDefined();
  });



});
