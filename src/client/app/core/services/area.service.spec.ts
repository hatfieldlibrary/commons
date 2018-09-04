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

import {AreaService, AreasResponse} from './area.service';
import {getTestBed, TestBed} from '@angular/core/testing';
import {AreaFilterType} from '../data-types/area-filter.type';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {AreaType} from '../data-types/area.type';
import {ApiDataService} from './api-data.service';
import {TransferState} from '@angular/platform-browser';
import {environment} from '../../environments/environment';


describe('Area Service', () => {

  let areaService;
  let apiService;
  let transferState;
  let transferStateHasKey: boolean;
  const AREA_KEY = 'area-list';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [

      ],
      providers: [
        AreaService,
        {
          provide: ApiDataService,
          useValue: {
            getTransferState: jasmine.createSpy('getTransferState'),
            getApiRequest: jasmine.createSpy('getApiRequest')
          }
        },
        {
          provide: TransferState,
          useValue: {
            hasKey: () => transferStateHasKey
          }
        }
      ]
    });
    areaService = TestBed.get(AreaService);
    apiService = getTestBed().get(ApiDataService);
    transferState = getTestBed().get(TransferState);
    spyOn(transferState, 'hasKey').and.callThrough();
  });

  it('should get area list from store', () => {
    transferStateHasKey = true;
    areaService.getAreaList('1');
    expect(transferState.hasKey).toHaveBeenCalledWith(AREA_KEY);
    expect(apiService.getTransferState).toHaveBeenCalledWith(AREA_KEY);
  });

  it('should get area list from api', () => {
    transferStateHasKey = false;
    areaService.getAreaList('1');
    expect(transferState.hasKey).toHaveBeenCalledWith(AREA_KEY);
    expect(apiService.getTransferState).not.toHaveBeenCalled();
    expect(apiService.getApiRequest).toHaveBeenCalledWith(AREA_KEY,
      environment.apiHost + environment.apiRoot + '/area/collection');
  });

});
