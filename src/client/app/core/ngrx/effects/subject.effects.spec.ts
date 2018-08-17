
/*
 * Copyright (c) [2018] [Willamette University]
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * Author: Michael Spalti
 */


import {provideMockActions} from '@ngrx/effects/testing';
import {hot, cold} from 'jasmine-marbles';
import {TestBed} from '@angular/core/testing';
import {Observable, } from 'rxjs/Observable';
import {SubjectService} from '../../services/subject.service';
import {SubjectEffects} from './subject.effects';
import {
  AllSubjectAction, SubjectAction, SubjectActionSuccess, SubjectActionFailed, SubjectsForAreaTypes
} from '../actions/subject-actions';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';

describe('Subject Effect', () => {
  let subjectEffects: SubjectEffects;
  let subjectService: SubjectService;
  let actions: Observable<any>;

  const mockPayload = {
    areaId: '1',
    typeId: '1',
    groupId: '1'
  };

  const subjectsMock = [
    {
      id: 1,
      name: 'test subject'
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
            getSubjectsForArea = () => {
              return Observable.of(subjectsMock);
            };
            getSubjectsForAreaAndType = () => {
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

    spyOn(subjectService, 'getSubjectsForArea').and.callFake(() => { return ErrorObservable.create('test') });
    const startAction = new SubjectAction('1');
    const hotMarble = {a: startAction};
    actions = hot('--a-', hotMarble);
    const failAction = new SubjectActionFailed('test');
    // create error response and complete observable
    const expectedResults = cold('--(b|)',  {b: failAction});
    expect(subjectEffects.subjectEffect$).toBeObservable(expectedResults);

  });

  it('should return subjects for area and type success action', () => {

    const startAction = new SubjectsForAreaTypes('1', '1');
    const hotMarble = {a: startAction};
    actions = hot('--a-', hotMarble);
    const successAction = new SubjectActionSuccess(subjectsMock);
    const expectedResults = cold('--b', {b: successAction});
    expect(subjectEffects.subjectsForAreaTypeEffect$).toBeObservable(expectedResults);

  });


  it('should return error for all subjects', () => {

    spyOn(subjectService, 'getAllSubjects').and.callFake(() => { return ErrorObservable.create('test') });
    const startAction = new AllSubjectAction();
    const hotMarble = {a: startAction};
    actions = hot('--a-', hotMarble);
    const failAction = new SubjectActionFailed('test');
    // create error response and complete observable
    const expectedResults = cold('--(b|)',  {b: failAction});
    expect(subjectEffects.allSubjectEffect$).toBeObservable(expectedResults);

  });

});

