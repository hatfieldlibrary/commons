import {TestBed, inject} from '@angular/core/testing';

import {SearchService} from './search.service';
//import {MockBackend} from '@angular/http/testing';
//import {ResponseOptions, XHRBackend} from '@angular/http';

const mockList = [
  { 'item' : { 'title' : '1954', 'count' : '31' } }
];

describe('SearchService', () => {

  // beforeEach(() => {
  //   TestBed.configureTestingModule({
  //     providers: [
  //       SearchService,
  //       MockBackend,
  //       {provide: XHRBackend, useClass: MockBackend}]
  //   });
  // });

//   it('should create the service', inject([SearchService], (service: SearchService) => {
//     expect(service).toBeTruthy();
//   }));
//
//   it('should get the query for list of options', inject([SearchService], (service: SearchService) => {
//     let href = service.getOptionsQuery('bigcollection', '2000');
//     expect(href).toEqual('https://libmedia.willamette.edu/cview/bigcollection.html#!browse:search:bigcollection/date^2000^all^and!');
//   }));
//
//   it('should get the query for search', inject([SearchService], (service: SearchService) => {
//     let href = service.executeSimpleSearchQuery('http://go.somewhere/collection/{$query}', 'fish');
//     expect(href).toEqual('http://go.somewhere/collection/fish');
//
//   }));
//
//   it('should get list of query options for collection', inject([SearchService, MockBackend], (service, mockBackend) => {
//     mockBackend.connections.subscribe(conn => {
//       conn.mockRespond(new Response(new ResponseOptions({body: mockList})));
//     });
//     const result = service.getOptionsList('collegian');
//     result.subscribe((res) => {
//       expect(res).toEqual(mockList);
//     });
//
//   }));
 });
