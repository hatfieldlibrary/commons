import {AreaService, AreasResponse} from "./area.service";
import {inject, TestBed} from "@angular/core/testing";
import {HttpModule, ResponseOptions, XHRBackend} from "@angular/http";
import {MockBackend} from "@angular/http/testing";


describe('Area Service', () => {

  const mockAreas = [
    {
      id: 1,
      title: 'test',
      linkLabel: 'link',
      url: 'url',
      searchUrl: '',
      description: 'description',
      position: 1
    }, {
      id: 2,
      title: 'test 2',
      linkLabel: 'link',
      url: 'url',
      searchUrl: '',
      description: 'description',
      position: 1
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [
        AreaService,
        MockBackend,
        {provide: XHRBackend, useClass: MockBackend}
      ]
    })
      .compileComponents();
  });


  it('get areaList', inject([AreaService, MockBackend], (areaService, mockBackend) => {
    mockBackend.connections.subscribe((conn) => {
      conn.mockRespond(new Response(new ResponseOptions({body: mockAreas})));
    });
    const result = areaService.getAreaList('1');
    result.subscribe((res:AreasResponse) => {
      expect(res.response).toEqual({
        mockAreas
      });
      expect(res.area).toEqual('1');
    });

  }));

});
