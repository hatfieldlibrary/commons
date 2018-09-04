import {TestBed, inject, getTestBed, tick, fakeAsync} from '@angular/core/testing';

import { ApiDataService } from './api-data.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {makeStateKey, TransferState} from '@angular/platform-browser';
import {PLATFORM_ID} from '@angular/core';
import {of} from 'rxjs/internal/observable/of';
import {HttpClient, HttpClientModule} from '@angular/common/http';


describe('ApiDataService', () => {

  let apiService;
  let transferState;
  let httpClient;
  const KEY = makeStateKey('collections')

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [ApiDataService,
        HttpClient,
        {
          provide: TransferState,
          useValue: {
            hasKey: () => true,
            get: jasmine.createSpy('get'),
            set: jasmine.createSpy('set'),
            remove: jasmine.createSpy('remove')
          }
        }, { provide: PLATFORM_ID, useValue: 'server'}]
    });
    apiService = TestBed.get(ApiDataService);
    transferState = getTestBed().get(TransferState);
    httpClient = getTestBed().get(HttpClientTestingModule);
  });

  it('should be created', inject([ApiDataService], (service: ApiDataService) => {
    expect(apiService).toBeTruthy();
  }));

  it('should get data from store and remove the key',  inject([ApiDataService], (service: ApiDataService) => {
    apiService.getTransferState(KEY);
    expect(transferState.remove).toHaveBeenCalledWith(KEY);
    expect(transferState.get).toHaveBeenCalledWith(KEY, null as any);
    }
  ));

  // fit('should get data from store and remove the key',  fakeAsync(()  => {
  //   apiService.getApiRequest(KEY, 'url').subscribe();
  //   tick();
  //   expect(transferState.set).toHaveBeenCalled();
  //   }
  // ));

});
