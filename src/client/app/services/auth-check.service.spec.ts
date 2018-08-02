import {TestBed, inject, fakeAsync, tick} from '@angular/core/testing';

import {AuthCheckService} from './auth-check.service';

import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

// auth status server response.
// const mockAuthStatus = {auth: true};

// describe('AuthCheckService', () => {
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [],
//       imports: [
//         HttpModule
//
//       ],
//       providers: [
//         AuthCheckService,
//         MockBackend,
//         {provide: XHRBackend, useClass: MockBackend},
//         {
//           provide: Store,
//           useClass: class {
//             dispatch = jasmine.createSpy('dispatch');
//             select = () => {
//               return Observable.of({});
//             };
//           }
//         }
//       ]
//     });
//   });
//
//   it('should create service instance', inject([AuthCheckService], (service: AuthCheckService) => {
//     expect(service).toBeTruthy();
//   }));

  // it('should query for the current auth status and set value in store',
  //
  //   inject([AuthCheckService, MockBackend], (service: AuthCheckService, mockBackend) => {
  //     mockBackend.connections.subscribe(conn => {
  //       conn.mockRespond(new Response(new ResponseOptions({body: mockAuthStatus})));
  //     });
  //     let result = service.getAuthStatus();
  //     result.subscribe((res) => {
  //       expect(res).toBe(true);
  //     });
  //
  //   }));

//});
