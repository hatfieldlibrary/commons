import {TestBed, inject} from '@angular/core/testing';

import {NavigationServiceB} from './navigation.service';
import {Route, Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {Observable} from 'rxjs/index';
import {Store} from '@ngrx/store';


describe('NavigationService', () => {
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
          RouterTestingModule
          ],
      providers: [
        Router,
        {
          provider: Store,
          useClass: class {
            dispatch = jasmine.createSpy('dispatch');
            select = () => {
             // return Observable.of(areaList);
            };
          }
        }
      ]
    });
  });

  beforeEach(() => {
    router = TestBed.get(Router);

  });

  it('should be created', inject([NavigationServiceB, Store, Router], (service: NavigationServiceB) => {
    expect(service).toBeTruthy();
  }));
});
