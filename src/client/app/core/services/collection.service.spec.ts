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

import {getTestBed, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {CollectionService} from './collection.service';
import {environment} from '../../environments/environment';
import {ApiDataService} from './api-data.service';
import {TransferState} from '@angular/platform-browser';


describe('Collection Service', () => {

  let collectionService;
  let apiService;
  let transferState;
  let transferStateHasKey: boolean;
  const COLLECTION_KEY = 'collections';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        CollectionService,
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
    collectionService = getTestBed().get(CollectionService);
    apiService = getTestBed().get(ApiDataService);
    transferState = getTestBed().get(TransferState);
    spyOn(transferState, 'hasKey').and.callThrough();
  });

  it('should get collections by area from store', () => {
    transferStateHasKey = true;
    collectionService.getCollectionsByAreaId('1');
    expect(transferState.hasKey).toHaveBeenCalledWith(COLLECTION_KEY);
    expect(apiService.getTransferState).toHaveBeenCalledWith(COLLECTION_KEY);
  });

  it('should get collections by area and subject from api', () => {
    transferStateHasKey = false;
    collectionService.getCollectionsByAreaId('1');
    expect(transferState.hasKey).toHaveBeenCalledWith('collections');
    expect(apiService.getTransferState).not.toHaveBeenCalled();
    expect(apiService.getApiRequest).toHaveBeenCalledWith(COLLECTION_KEY,
      environment.apiHost + environment.apiRoot + '/collection/area/' + 1);
  });

  it('should get collections by subject from store', () => {
    transferStateHasKey = true;
    collectionService.getCollectionsBySubject('1');
    expect(transferState.hasKey).toHaveBeenCalledWith(COLLECTION_KEY);
    expect(apiService.getTransferState).toHaveBeenCalledWith(COLLECTION_KEY);
  });

  it('should get collections by subject from api', () => {
    transferStateHasKey = false;
    collectionService.getCollectionsBySubject('1');
    expect(transferState.hasKey).toHaveBeenCalledWith('collections');
    expect(apiService.getTransferState).not.toHaveBeenCalled();
    expect(apiService.getApiRequest).toHaveBeenCalledWith(COLLECTION_KEY, environment.apiHost
      + environment.apiRoot + '/collection/subject/1');
  });

  it('should get collections by type from store', () => {
    transferStateHasKey = true;
    collectionService.getCollectionsByType('1');
    expect(transferState.hasKey).toHaveBeenCalledWith(COLLECTION_KEY);
    expect(apiService.getTransferState).toHaveBeenCalledWith(COLLECTION_KEY);
  });

  it('should get collections by type from api', () => {
    transferStateHasKey = false;
    collectionService.getCollectionsByType('1');
    expect(transferState.hasKey).toHaveBeenCalledWith('collections');
    expect(apiService.getTransferState).not.toHaveBeenCalled();
    expect(apiService.getApiRequest).toHaveBeenCalledWith(COLLECTION_KEY, environment.apiHost
      + environment.apiRoot + '/collection/type/1');
  });

  it('should get collections by area and subject from store', () => {

    transferStateHasKey = true;
    collectionService.getCollectionsByAreaSubject('1', '1');
    expect(transferState.hasKey).toHaveBeenCalledWith(COLLECTION_KEY);
    expect(apiService.getTransferState).toHaveBeenCalledWith(COLLECTION_KEY);
  });

  it('should get collections by area and subject from api', () => {

    transferStateHasKey = false;
    collectionService.getCollectionsByAreaSubject('1', '1');
    expect(transferState.hasKey).toHaveBeenCalledWith('collections');
    expect(apiService.getTransferState).not.toHaveBeenCalled();
    expect(apiService.getApiRequest).toHaveBeenCalledWith(COLLECTION_KEY, environment.apiHost
      + environment.apiRoot + '/collection/area/1/subject/1');
  });

  it('should get collections by area and type from store', () => {

    transferStateHasKey = true;
    collectionService.getCollectionsByTypeArea('1', '1');
    expect(transferState.hasKey).toHaveBeenCalledWith(COLLECTION_KEY);
    expect(apiService.getTransferState).toHaveBeenCalledWith(COLLECTION_KEY);
  });

  it('should get collections by area and type from api', () => {

    transferStateHasKey = false;
    collectionService.getCollectionsByTypeArea('1', '1')
    expect(transferState.hasKey).toHaveBeenCalledWith('collections');
    expect(apiService.getTransferState).not.toHaveBeenCalled();
    expect(apiService.getApiRequest).toHaveBeenCalledWith(COLLECTION_KEY, environment.apiHost
      + environment.apiRoot + '/collection/area/1/type/1');
  });

  it('should get collections by type and subject from store', () => {
    transferStateHasKey = true;
    collectionService.getCollectionsByTypeSubject('1', '1');
    expect(transferState.hasKey).toHaveBeenCalledWith(COLLECTION_KEY);
    expect(apiService.getTransferState).toHaveBeenCalledWith(COLLECTION_KEY);
  });

  it('should get collections by type and subject from api', () => {
    transferStateHasKey = false;
    collectionService.getCollectionsByTypeSubject('1', '1');
    expect(transferState.hasKey).toHaveBeenCalledWith('collections');
    expect(apiService.getTransferState).not.toHaveBeenCalled();
    expect(apiService.getApiRequest).toHaveBeenCalledWith(COLLECTION_KEY, environment.apiHost
      + environment.apiRoot + '/collection/type/1/subject/1');
  });

  it('should get collections by type, area, and subject', () => {
    transferStateHasKey = true;
    collectionService.getCollectionsByTypeAreaSubject('1', '1', '1');
    expect(transferState.hasKey).toHaveBeenCalledWith(COLLECTION_KEY);
    expect(apiService.getTransferState).toHaveBeenCalledWith(COLLECTION_KEY);
  });

  it('should get collections by type, area, and subject', () => {
    transferStateHasKey = false;
    collectionService.getCollectionsByTypeAreaSubject('1', '1', '1');
    expect(transferState.hasKey).toHaveBeenCalledWith('collections');
    expect(apiService.getTransferState).not.toHaveBeenCalled();
    expect(apiService.getApiRequest).toHaveBeenCalledWith(COLLECTION_KEY, environment.apiHost
      + environment.apiRoot + '/collection/area/1/type/1/subject/1');
  });

  it('should get collections by area and collection group from store', () => {
    transferStateHasKey = true;
    collectionService.getCollectionsByCategoryArea('1', '1');
    expect(transferState.hasKey).toHaveBeenCalledWith(COLLECTION_KEY);
    expect(apiService.getTransferState).toHaveBeenCalledWith(COLLECTION_KEY);
  });

  it('should get collections by area and collection group from api', () => {
    transferStateHasKey = false;
    collectionService.getCollectionsByCategoryArea('1', '1');
    expect(transferState.hasKey).toHaveBeenCalledWith('collections');
    expect(apiService.getTransferState).not.toHaveBeenCalled();
    expect(apiService.getApiRequest).toHaveBeenCalledWith(COLLECTION_KEY, environment.apiHost
      + environment.apiRoot + '/collection/category/1/area/1');
  });

  it('should get collections by type and collection group from store', () => {
    transferStateHasKey = true;
    collectionService.getCollectionsByCategoryType('1', '1')
    expect(transferState.hasKey).toHaveBeenCalledWith(COLLECTION_KEY);
    expect(apiService.getTransferState).toHaveBeenCalledWith(COLLECTION_KEY);
  });

  it('should get collections by type and collection group from api', () => {
    transferStateHasKey = false;
    collectionService.getCollectionsByCategoryType('1', '1');
    expect(transferState.hasKey).toHaveBeenCalledWith('collections');
    expect(apiService.getTransferState).not.toHaveBeenCalled();
    expect(apiService.getApiRequest).toHaveBeenCalledWith(COLLECTION_KEY, environment.apiHost
      + environment.apiRoot + '/collection/category/1/type/1');
  });

  it('should get collections by subject and collection group from store', () => {
    transferStateHasKey = true;
    collectionService.getCollectionsByCategorySubject('1', '1');
    expect(transferState.hasKey).toHaveBeenCalledWith(COLLECTION_KEY);
    expect(apiService.getTransferState).toHaveBeenCalledWith(COLLECTION_KEY);
  });

  it('should get collections by subject and collection group from api', () => {
    transferStateHasKey = false;
    collectionService.getCollectionsByCategorySubject('1', '1');
    expect(transferState.hasKey).toHaveBeenCalledWith('collections');
    expect(apiService.getTransferState).not.toHaveBeenCalled();
    expect(apiService.getApiRequest).toHaveBeenCalledWith(COLLECTION_KEY, environment.apiHost
      + environment.apiRoot + '/collection/category/1/subject/1');
  });

  it('should get collections by collection group, area, and subject from store', () => {
    transferStateHasKey = true;
    collectionService.getCollectionsByCategoryAreaType('1', '1', '1');
    expect(transferState.hasKey).toHaveBeenCalledWith(COLLECTION_KEY);
    expect(apiService.getTransferState).toHaveBeenCalledWith(COLLECTION_KEY);
  });

  it('should get collections by collection group, area, and subject from api', () => {
    transferStateHasKey = false;
    collectionService.getCollectionsByCategoryAreaType('1', '1', '1');
    expect(transferState.hasKey).toHaveBeenCalledWith('collections');
    expect(apiService.getTransferState).not.toHaveBeenCalled();
    expect(apiService.getApiRequest).toHaveBeenCalledWith(COLLECTION_KEY, environment.apiHost
      + environment.apiRoot + '/collection/category/1/area/1/type/1');
  });

  it('should get collections by collection group, area, and subject from store', () => {
    transferStateHasKey = true;
    collectionService.getCollectionsByCategoryAreaSubject('1', '1', '1');
    expect(transferState.hasKey).toHaveBeenCalledWith(COLLECTION_KEY);
    expect(apiService.getTransferState).toHaveBeenCalledWith(COLLECTION_KEY);
  });

  it('should get collections by collection group, area, and subject from api', () => {
    transferStateHasKey = false;
    collectionService.getCollectionsByCategoryAreaSubject('1', '1', '1');
    expect(transferState.hasKey).toHaveBeenCalledWith('collections');
    expect(apiService.getTransferState).not.toHaveBeenCalled();
    expect(apiService.getApiRequest).toHaveBeenCalledWith(COLLECTION_KEY, environment.apiHost
      + environment.apiRoot + '/collection/category/1/area/1/subject/1');
  });

  it('should get collections by collection group, type, and subject', () => {
    transferStateHasKey = true;
    collectionService.getCollectionsByCategoryTypeSubject('1', '1', '1');
    expect(transferState.hasKey).toHaveBeenCalledWith(COLLECTION_KEY);
    expect(apiService.getTransferState).toHaveBeenCalledWith(COLLECTION_KEY);
  });

  it('should get collections by collection group, type, and subject', () => {
    transferStateHasKey = false;
    collectionService.getCollectionsByCategoryTypeSubject('1', '1', '1');
    expect(transferState.hasKey).toHaveBeenCalledWith('collections');
    expect(apiService.getTransferState).not.toHaveBeenCalled();
    expect(apiService.getApiRequest).toHaveBeenCalledWith(COLLECTION_KEY, environment.apiHost
      + environment.apiRoot + '/collection/category/1/type/1/subject/1');
  });

  it('should get collections by collection area, group, type, and subject with store', () => {
    transferStateHasKey = true;
    collectionService.getCollectionsByCategoryAreaTypeSubject('1', '1', '1', '1');
    expect(transferState.hasKey).toHaveBeenCalledWith(COLLECTION_KEY);
    expect(apiService.getTransferState).toHaveBeenCalledWith(COLLECTION_KEY);
  });

  it('should get collections by collection area, group, type, and subject with api', () => {
    transferStateHasKey = false;
    collectionService.getCollectionsByCategoryAreaTypeSubject('1', '1', '1', '1');
    expect(transferState.hasKey).toHaveBeenCalledWith('collections');
    expect(apiService.getTransferState).not.toHaveBeenCalled();
    expect(apiService.getApiRequest).toHaveBeenCalledWith(COLLECTION_KEY, environment.apiHost
      + environment.apiRoot + '/collection/category/1/area/1/type/1/subject/1');
  });

});

