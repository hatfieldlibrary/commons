import {TestBed, getTestBed, fakeAsync, tick} from '@angular/core/testing';

import {SubscriptionService} from './subscription.service';
import {Action, Store} from '@ngrx/store';
import {Subject} from 'rxjs/Subject';
import {mockStore} from '../shared/test/mock-store';

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
