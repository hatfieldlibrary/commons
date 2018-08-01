import {TestBed, getTestBed} from '@angular/core/testing';

import {SearchService} from './search.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {environment} from '../environments/environment';

describe('SearchService', () => {

  const mockList = [
    {'item': {'title': '1954', 'count': '31'}}
  ];

  const mockReponse = {
    result: mockList
  }
  const testQuery = 'http://domain/{$query}';
  const terms = 'testing';
  const externalMock =  [
      {
        title: 'test',
        count: 1
      }
    ];
  const testCollection = 'collection';
  let httpMock;
  let searchService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        SearchService
      ]
    });
    httpMock = TestBed.get(HttpTestingController);
    searchService = getTestBed().get(SearchService);
  });


  it('should get search href', () => {
    const result = searchService.executeSimpleSearchQuery(testQuery, terms);
    expect(result).toEqual('http://domain/testing')

  });

  it('should get options href', () => {
    const result = searchService.getOptionsQuery(testCollection, terms);
    expect(result).toEqual('https://libmedia.willamette.edu/cview/collection.html#!browse:search:collection/date^testing^all^and!');
  });

  it('should get options list', () => {
    const result = searchService.getOptionsList(testCollection);
    result.subscribe(res => {
      expect(res).toEqual(mockList);
    });
    const req = httpMock.expectOne(environment.apiHost + environment.apiRoot + '/options/external/' + testCollection);
    expect(req.request.method).toEqual('GET');
    req.flush(mockReponse);
    httpMock.verify();
  });
});
