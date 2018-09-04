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
import {getTestBed, inject, TestBed} from '@angular/core/testing';
import {RelatedService} from './related.service';
import {environment} from '../../environments/environment';
import {ApiDataService} from './api-data.service';
import {TransferState} from '@angular/platform-browser';
import {Observable} from 'rxjs/internal/Observable';
import {of} from 'rxjs/internal/observable/of';
/**
 * Created by mspalti on 4/19/17.
 */


describe('RelatedService', () => {


  let relatedService;
  let apiService;
  let transferState;
  let transferStateHasKey: boolean;
  const RELATED_KEY = 'related-items';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [

      ],
      providers: [
        RelatedService,
        {
          provide: ApiDataService,
          useValue: {
            getTransferState: jasmine.createSpy('getTransferState').and.returnValue(of('test')),
            getApiRequest: jasmine.createSpy('getApiRequest').and.returnValue(of('test'))
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
    relatedService = getTestBed().get(RelatedService);
    apiService = getTestBed().get(ApiDataService);
    transferState = getTestBed().get(TransferState);
    spyOn(transferState, 'hasKey').and.callThrough();
  });

  it('should get related collections by area from store', () => {
    transferStateHasKey = true;
    relatedService.getRelatedCollections('1', '1');
    expect(transferState.hasKey).toHaveBeenCalledWith(RELATED_KEY);
    expect(apiService.getTransferState).toHaveBeenCalledWith(RELATED_KEY);
  });

  it('should get related collections by area and subject from api', () => {
    transferStateHasKey = false;
    relatedService.getRelatedCollections('1', '1');
    expect(transferState.hasKey).toHaveBeenCalledWith(RELATED_KEY);
    expect(apiService.getTransferState).not.toHaveBeenCalled();
    expect(apiService.getApiRequest).toHaveBeenCalledWith(RELATED_KEY,
      environment.apiHost + environment.apiRoot + '/collection/' + '1' + '/related/' + '1');
  });

});



