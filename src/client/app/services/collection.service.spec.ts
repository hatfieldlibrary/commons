/*
 * Copyright (c) 2017.
 *
 *   This program is free software: you can redistribute it and/or modify
 *    it under the terms of the GNU General Public License as published by
 *    the Free Software Foundation, either version 3 of the License, or
 *    (at your option) any later version.
 *
 *    This program is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU General Public License for more details.
 *
 *   You should have received a copy of the GNU General Public License
 *    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import {getTestBed, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {CollectionService} from './collection.service';
import {environment} from '../environments/environment';


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

