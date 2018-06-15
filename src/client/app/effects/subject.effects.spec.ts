
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


import {provideMockActions} from '@ngrx/effects/testing';
import {hot, cold} from 'jasmine-marbles';
import {TestBed} from '@angular/core/testing';
import {Observable,} from 'rxjs/Observable';
import {SubjectService} from "../services/subject.service";
import {SubjectEffects} from "./subject.effects";
import {
  AllSubjectAction, SubjectAction, SubjectActionSuccess, SubjectActionFailed,
  AllSubjectActionSuccess
} from "../actions/subject-actions";

describe('Subject Effect', () => {
  let subjectEffects: SubjectEffects;
  let subjectService: SubjectService;
  let actions: Observable<any>;

  const subjectsMock = [
    {
      id: 1,
      name: 'test subject',
      url: ''
    }
  ];


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SubjectEffects,
        {
          provide: SubjectService,
          useClass: class {
            getSubjects = () => {
              return Observable.of(subjectsMock);
            };
            getAllSubjects = () => {
              return Observable.of(subjectsMock);
            };
          }
        },
        provideMockActions(() => actions)
      ]
    });

    subjectEffects = TestBed.get(SubjectEffects);
    subjectService = TestBed.get(SubjectService);

  });


  it('should return subjects by areas success action', () => {

    const startAction = new SubjectAction('1');
    const hotMarble = {a: startAction};
    actions = hot('--a-', hotMarble);
    const successAction = new SubjectActionSuccess(subjectsMock);
    const expectedResults = cold('--b', {b: successAction});
    expect(subjectEffects.subjectEffect$).toBeObservable(expectedResults);

  });


  it('should return error for subjects', () => {

    spyOn(subjectService, 'getSubjectsForArea').and.callFake(() => { return Observable.throw('error') });
    const startAction = new SubjectAction('1');
    const hotMarble = {a: startAction};
    actions = hot('--a-', hotMarble);
    const failAction = new SubjectActionFailed('test');
    // create error response and complete observable
    const expectedResults = cold('--(b|)',  {b: failAction});
    expect(subjectEffects.subjectEffect$).toBeObservable(expectedResults);

  });

  it('should return all subjects success action', () => {

    const startAction = new AllSubjectAction();
    const hotMarble = {a: startAction};
    actions = hot('--a-', hotMarble);
    const successAction = new AllSubjectActionSuccess(subjectsMock);
    const expectedResults = cold('--b', {b: successAction});
    expect(subjectEffects.allSubjectEffect$).toBeObservable(expectedResults);

  });


  it('should return error for all subjects', () => {

    spyOn(subjectService, 'getAllSubjects').and.callFake(() => { return Observable.throw('error') });
    const startAction = new AllSubjectAction();
    const hotMarble = {a: startAction};
    actions = hot('--a-', hotMarble);
    const failAction = new SubjectActionFailed('test');
    // create error response and complete observable
    const expectedResults = cold('--(b|)',  {b: failAction});
    expect(subjectEffects.allSubjectEffect$).toBeObservable(expectedResults);

  });

});

