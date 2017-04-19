import {inject, TestBed} from "@angular/core/testing";
import {HttpModule, ResponseOptions, XHRBackend } from "@angular/http";
import {MockBackend } from "@angular/http/testing";
import {SubjectService} from "./subject.service";

describe('Subject Service', () => {

  const subjectsMock = [
    {
      id: 1,
      name: 'test subject',
      url: ''
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [
        SubjectService,
        MockBackend,
        {provide: XHRBackend, useClass: MockBackend}
      ]
    })
      .compileComponents();
  });


  it('get subjects', inject([SubjectService, MockBackend], (subjectService:SubjectService, mockBackend:MockBackend) => {
    mockBackend.connections.subscribe(conn => {
      conn.mockRespond(new Response(new ResponseOptions({body: subjectsMock})));
    });
    const result = subjectService.getSubjects('1');
    result.subscribe(res => {
      expect(res).toEqual({
        subjectsMock
      });
    });

  }));

  it('get all subjects', inject([SubjectService, MockBackend], (subjectService:SubjectService, mockBackend:MockBackend) => {
    mockBackend.connections.subscribe(conn => {
      conn.mockRespond(new Response(new ResponseOptions({body: subjectsMock})));
    });
    const result = subjectService.getAllSubjects();
    result.subscribe(res => {
      expect(res).toEqual({
        subjectsMock
      });
    });

  }));

});


