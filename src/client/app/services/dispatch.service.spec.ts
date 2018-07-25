import { TestBed, inject } from '@angular/core/testing';

import { DispatchService } from './dispatch.service';
import {Action, StateObservable, Store} from '@ngrx/store';
import {NavigationServiceB} from './navigation-2/navigation.service';
import * as fromRoot from '../reducers';
import {Subject} from 'rxjs/Subject';
import {Router} from '@angular/router';

export function mockStore<T>(
  {
    actions = new Subject<Action>(),
    states = new Subject<T>()
  }: {
    actions?: Subject<Action>,
    states?: Subject<T>
  }): Store<T> {
  const result = states as any;
  result.dispatch = (action: Action) => actions.next(action);
  result.select = () => {return states};
  return result;
}

describe('DispatchService', () => {

  let router: Router;
  let store;
  let service;
  const actions = new Subject<Action>();
  const states = new Subject<any>();
  const appStore = mockStore<any>({ actions, states });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NavigationServiceB,
        {
          provide: Router,
          useClass: class { navigate = jasmine.createSpy('navigate'); }
        },
        {
          provide: Store,
          useValue: appStore
        }
      ]
    });

    service = TestBed.get(NavigationServiceB)
    router = TestBed.get(Router);
    store = TestBed.get(Store);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
