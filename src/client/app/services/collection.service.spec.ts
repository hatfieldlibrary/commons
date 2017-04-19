import {inject, TestBed} from "@angular/core/testing";
import {HttpModule, ResponseOptions, XHRBackend } from "@angular/http";
import {MockBackend } from "@angular/http/testing";
import {CollectionService} from "./collection.service";

describe('Collection Service', () => {

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
        HttpModule
      ],
      providers: [
        CollectionService,
        MockBackend,
        {provide: XHRBackend, useClass: MockBackend}
      ]
    })
      .compileComponents();
  });


  it('get collections by area', inject([CollectionService, MockBackend], (collectionService, mockBackend) => {
    mockBackend.connections.subscribe(conn => {
      conn.mockRespond(new Response(new ResponseOptions({body: mockCollections})));
    });
    const result = collectionService.getCollectionsByAreaId('1');
    result.subscribe(res => {
      expect(res).toEqual({
        mockCollections
      });
    });

  }));

  it('get collections by subject', inject([CollectionService, MockBackend], (collectionService, mockBackend) => {
    mockBackend.connections.subscribe(conn => {
      conn.mockRespond(new Response(new ResponseOptions({body: mockCollectionsForSubject})));
    });
    const result = collectionService.getCollectionsByAreaSubject('1','1');
    result.subscribe(res => {
      expect(res).toEqual({
        mockCollectionsForSubject
      });
    });

  }));

  it('get all collections', inject([CollectionService, MockBackend], (collectionService, mockBackend) => {
    const testResponse = mockCollectionsForSubject.concat(mockCollections);
    mockBackend.connections.subscribe(conn => {
      conn.mockRespond(new Response(new ResponseOptions({body: testResponse})));
    });
    const result = collectionService.getAllCollections();
    result.subscribe(res => {
      expect(res).toEqual({
         testResponse
      });
    });

  }));

  it('get collections by subject', inject([CollectionService, MockBackend], (collectionService, mockBackend) => {
    mockBackend.connections.subscribe(conn => {
      conn.mockRespond(new Response(new ResponseOptions({body: mockCollectionsForSubject})));
    });
    const result = collectionService.getCollectionsBySubject('1');
    result.subscribe(res => {
      expect(res).toEqual({
        mockCollectionsForSubject
      });
    });

  }));

});

