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


describe('Collection Service', () => {

  let httpMock: HttpTestingController;
  let collectionService;

  const mockCollections = [
    {
      id: 1,
      title: 'test title',
      image: 'image',
      url: 'url',
      browseType: '',
      description: '',
      dates: '',
      items: '',
      ctype: '',
      repoType: '',
      restricted: true,
      published: false,
      createdAt: '',
      updatedAt: '',
      AreaId: 1,
      CollectionId: 1
    }
  ];

  const mockCollectionsForSubject = [
    {
      id: 2,
      title: 'test subject title',
      image: 'image',
      url: 'url',
      browseType: '',
      description: '',
      dates: '',
      items: '',
      ctype: '',
      repoType: '',
      restricted: true,
      published: false,
      createdAt: '',
      updatedAt: '',
      AreaId: 1,
      CollectionId: 1
    }
  ];


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        CollectionService
      ]
    });
    httpMock = TestBed.get(HttpTestingController);
    collectionService = getTestBed().get(CollectionService);
  });

  it('should get collections by areas', () => {

    const result = collectionService.getCollectionsByAreaId('1');
    result.subscribe(res => {
      expect(res).toEqual(mockCollections);
    });
    const req = httpMock.expectOne(environment.apiHost + environment.apiRoot + '/collection/area/' + 1);
    expect(req.request.method).toEqual('GET');
    req.flush(mockCollections);
    httpMock.verify();

  });

  it('should get collections by area and subject', () => {
    const result = collectionService.getCollectionsByAreaSubject('1', '1');
    result.subscribe(res => {
      expect(res).toEqual(mockCollections);
    });
    const req = httpMock.expectOne(environment.apiHost + environment.apiRoot + '/collection/area/1/subject/1');
    expect(req.request.method).toEqual('GET');
    req.flush(mockCollections);
    httpMock.verify();

  });

  it('should get collections by subject', () => {
    const result = collectionService.getCollectionsBySubject('1');
    result.subscribe(res => {
      expect(res).toEqual(mockCollections);
    });
    const req = httpMock.expectOne(environment.apiHost + environment.apiRoot + '/collection/subject/1');
    expect(req.request.method).toEqual('GET');
    req.flush(mockCollections);
    httpMock.verify();

  });

  it('should get collections by type', () => {
    const result = collectionService.getCollectionsByType('1');
    result.subscribe(res => {
      expect(res).toEqual(mockCollections);
    });
    const req = httpMock.expectOne(environment.apiHost + environment.apiRoot + '/collection/type/1');
    expect(req.request.method).toEqual('GET');
    req.flush(mockCollections);
    httpMock.verify();
  });

  it('should get collections by area and type', () => {
    const result = collectionService.getCollectionsByTypeArea('1', '1');
    result.subscribe(res => {
      expect(res).toEqual(mockCollections);
    });
    const req = httpMock.expectOne(environment.apiHost + environment.apiRoot + '/collection/area/1/type/1');
    expect(req.request.method).toEqual('GET');
    req.flush(mockCollections);
    httpMock.verify();
  });

  it('should get collections by type and subject', () => {
    const result = collectionService.getCollectionsByTypeSubject('1', '1');
    result.subscribe(res => {
      expect(res).toEqual(mockCollections);
    });
    const req = httpMock.expectOne(environment.apiHost + environment.apiRoot + '/collection/type/1/subject/1');
    expect(req.request.method).toEqual('GET');
    req.flush(mockCollections);
    httpMock.verify();
  });

  it('should get collections by type, area, and subject', () => {
    const result = collectionService.getCollectionsByTypeAreaSubject('1', '1', '1');
    result.subscribe(res => {
      expect(res).toEqual(mockCollections);
    });
    const req = httpMock.expectOne(environment.apiHost + environment.apiRoot + '/collection/area/1/type/1/subject/1');
    expect(req.request.method).toEqual('GET');
    req.flush(mockCollections);
    httpMock.verify();
  });

  it('should get collections by area and collection group', () => {
    const result = collectionService.getCollectionsByCategoryArea('1', '1');
    result.subscribe(res => {
      expect(res).toEqual(mockCollections);
    });
    const req = httpMock.expectOne(environment.apiHost + environment.apiRoot + '/collection/category/1/area/1');
    expect(req.request.method).toEqual('GET');
    req.flush(mockCollections);
    httpMock.verify();
  });

  it('should get collections by type and collection group', () => {
    const result = collectionService.getCollectionsByCategoryType('1', '1');
    result.subscribe(res => {
      expect(res).toEqual(mockCollections);
    });
    const req = httpMock.expectOne(environment.apiHost + environment.apiRoot + '/collection/category/1/type/1');
    expect(req.request.method).toEqual('GET');
    req.flush(mockCollections);
    httpMock.verify();
  });

  it('should get collections by subject and collection group', () => {
    const result = collectionService.getCollectionsByCategorySubject('1', '1');
    result.subscribe(res => {
      expect(res).toEqual(mockCollections);
    });
    const req = httpMock.expectOne(environment.apiHost + environment.apiRoot + '/collection/category/1/subject/1');
    expect(req.request.method).toEqual('GET');
    req.flush(mockCollections);
    httpMock.verify();
  });

  it('should get collections by collection group, area, and subject', () => {
    const result = collectionService.getCollectionsByCategoryAreaType('1', '1', '1');
    result.subscribe(res => {
      expect(res).toEqual(mockCollections);
    });
    const req = httpMock.expectOne(environment.apiHost + environment.apiRoot + '/collection/category/1/area/1/type/1');
    expect(req.request.method).toEqual('GET');
    req.flush(mockCollections);
    httpMock.verify();
  });

  it('should get collections by collection group, area, and subject', () => {
    const result = collectionService.getCollectionsByCategoryAreaSubject('1', '1', '1');
    result.subscribe(res => {
      expect(res).toEqual(mockCollections);
    });
    const req = httpMock.expectOne(environment.apiHost + environment.apiRoot + '/collection/category/1/area/1/subject/1');
    expect(req.request.method).toEqual('GET');
    req.flush(mockCollections);
    httpMock.verify();
  });

  it('should get collections by collection group, type, and subject', () => {
    const result = collectionService.getCollectionsByCategoryTypeSubject('1', '1', '1');
    result.subscribe(res => {
      expect(res).toEqual(mockCollections);
    });
    const req = httpMock.expectOne(environment.apiHost + environment.apiRoot + '/collection/category/1/type/1/subject/1');
    expect(req.request.method).toEqual('GET');
    req.flush(mockCollections);
    httpMock.verify();
  });

  it('should get collections by collection area, group, type, and subject', () => {
    const result = collectionService.getCollectionsByCategoryAreaTypeSubject('1', '1', '1', '1');
    result.subscribe(res => {
      expect(res).toEqual(mockCollections);
    });
    const req = httpMock.expectOne(environment.apiHost + environment.apiRoot + '/collection/category/1/area/1/type/1/subject/1');
    expect(req.request.method).toEqual('GET');
    req.flush(mockCollections);
    httpMock.verify();
  });

});

