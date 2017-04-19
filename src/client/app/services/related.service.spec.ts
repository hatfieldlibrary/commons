import {MockBackend} from "@angular/http/testing";
import {HttpModule, ResponseOptions, XHRBackend} from "@angular/http";
import {inject, TestBed} from "@angular/core/testing";
import {RelatedService} from "./related.service";
/**
 * Created by mspalti on 4/19/17.
 */


const relatedMock = [
  {
    id: 1,
    name: 'test collection',
    image: ''
  }
];

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [
      HttpModule
    ],
    providers: [
      RelatedService,
      MockBackend,
      {provide: XHRBackend, useClass: MockBackend}
    ]
  })
    .compileComponents();
});

it('should get related collections', inject([RelatedService, MockBackend], (relatedService, mockBackend) => {
  mockBackend.connections.subscribe((conn) => {
    conn.mockRespond(new Response(new ResponseOptions({body: relatedMock})));
  });
  const result = relatedService.getRelatedCollections('1','1,2');
  result.subscribe((res) => {
    expect(res.response).toEqual({
      relatedMock
    });

  });

}));
