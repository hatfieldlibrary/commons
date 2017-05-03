import { TestBed, inject } from '@angular/core/testing';

import { AuthCheckService } from './auth-check.service';
import {Http, HttpModule} from "@angular/http";
import {Store} from "@ngrx/store";
import {MockBackend} from "@angular/http/testing";
import {Observable} from "rxjs/Observable";

describe('AuthCheckService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [

      ],
      imports: [
        HttpModule

      ],
      providers: [AuthCheckService,
        MockBackend,
        {
          provide: Store,
          useClass: class {
            dispatch = jasmine.createSpy('dispatch'); select = () => {
              return Observable.of({});
            };
          }
        }
      ]
    });
  });

  it('should ...', inject([AuthCheckService], (service: AuthCheckService) => {
    expect(service).toBeTruthy();
  }));
});
