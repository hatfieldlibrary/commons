import {TestBed, inject} from '@angular/core/testing';

import {NavigationServiceB} from './navigation.service';
import {Route, Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {Observable} from 'rxjs/index';
import {Action, Store} from '@ngrx/store';
import {Subject} from 'rxjs/Subject';

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

describe('NavigationService', () => {
  let router: Router;
  let store;
  let service;
  const actions = new Subject<Action>();
  const states = new Subject<any>();
  const appStore = mockStore<any>({ actions, states });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
          RouterTestingModule.withRoutes([])
          ],
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
  });

  beforeEach( () => {
    service = TestBed.get(NavigationServiceB)
     router = TestBed.get(Router);
    store = TestBed.get(Store);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
