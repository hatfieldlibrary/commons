
import {EffectsRunner, EffectsTestingModule} from "@ngrx/effects/testing";

import {inject, TestBed} from "@angular/core/testing";
import {Observable} from "rxjs";
import {HttpModule} from "@angular/http";
import {SubjectService} from "../services/subject.service";
import {SubjectEffects} from "./subject.effects";
import {SubjectAction, SubjectActionTypes} from "../actions/subject-actions";

describe('Subject Effect', () => {
  let runner: EffectsRunner;
  let subjectEffects: SubjectEffects;
  let subjectService: SubjectService;

  const subjectsMock = [
    {
      id: 1,
      name: 'test subject',
      url: ''
    }
  ];


  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      EffectsTestingModule,
      HttpModule
    ],
    providers: [
      SubjectEffects, SubjectService

    ]
  }));
  it('call Area Success action after areas loaded.',
    inject([
        EffectsRunner, SubjectEffects, SubjectService
      ],
      (_runner:EffectsRunner, _subjectEffects:SubjectEffects, _subjectService:SubjectService ) => {
        runner = _runner;
        subjectEffects = _subjectEffects;
        subjectService = _subjectService;
        spyOn(subjectService, 'getSubjects')
          .and.returnValue(Observable.of(subjectsMock));
        runner.queue(new SubjectAction('1'));
        subjectEffects.subjectEffect$.subscribe(result => {
          expect(result.type).toEqual(SubjectActionTypes.SUBJECT_LIST_SUCCESS);
          expect(result.payload[0].name).toEqual('test subject');

        });
      })
  );
});

