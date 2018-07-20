import { TestBed, inject } from '@angular/core/testing';

import { DispatchService } from './dispatch.service';
import {StateObservable, Store} from '@ngrx/store';
import {NavigationServiceB} from './navigation-2/navigation.service';
import * as fromRoot from '../reducers';

describe('DispatchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Store, StateObservable, NavigationServiceB]
    });
  });

  it('should be created', inject([DispatchService, Store], (service: DispatchService, store: Store<fromRoot.State>) => {
    expect(service).toBeTruthy();
  }));
});
