
import {inject, TestBed} from "@angular/core/testing";
import {HttpModule, ResponseOptions, XHRBackend } from "@angular/http";
import {MockBackend } from "@angular/http/testing";
import {ItemService} from "./item.service";

describe('Item Service', () => {

  const itemMock = {
    collection: {
      id: '',
      title: 'test collection',
      url: '',
      desc: '',
      browseType: '',
      image: '',
      dates: '',
      ctype: '',
      repoType: '',
      restricted: false,
      published: false,
      createdAt: '',
      updatedAt: ''
    },
    categories: {
      id: 1,
      title: 'test category',
      linkLabel: '',
      url: '',
      secondaryUrl: '',
      description: '',
      areaId: '',
      createdAt: '',
      updatedAt: ''
    },
    itemTypes: [{
      id: 0,
      name: 'test item type',
      icon: '',
      createdAt: '',
      updatedAt: ''
    }]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [
        ItemService,
        MockBackend,
        {provide: XHRBackend, useClass: MockBackend}
      ]
    })
      .compileComponents();
  });


  it('get item', inject([ItemService, MockBackend], (itemService:ItemService, mockBackend:MockBackend) => {
    mockBackend.connections.subscribe(conn => {
      conn.mockRespond(new Response(new ResponseOptions({body: itemMock})));
    });
    const result = itemService.getItem('1');
    result.subscribe(res => {
      expect(res).toEqual({
        itemMock
      });
    });

  }));

});

