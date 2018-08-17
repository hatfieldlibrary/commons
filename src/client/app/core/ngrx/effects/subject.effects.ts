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

import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import * as subjects from '../actions/subject-actions';
import {Observable} from 'rxjs/Observable';
import {Action} from '../actions/action.interface';
import {SubjectService} from '../../services/subject.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

@Injectable()
export class SubjectEffects {

  @Effect()
  subjectEffect$: Observable<Action> = this.actions$
    .ofType(subjects.SubjectActionTypes.SUBJECT_LIST)
    .map((action: subjects.SubjectAction) => action.payload)
    .switchMap(id => this.svc.getSubjectsForArea(id))
    .map(res => new subjects.SubjectActionSuccess(res))
    .catch((err) => Observable.of(new subjects.SubjectActionFailed(err)));

  @Effect()
  allSubjectEffect$: Observable<Action> = this.actions$
    .ofType(subjects.SubjectActionTypes.ALL_SUBJECT_LIST)
    // .map((action: subjects.SubjectAction) => action.payload)
    .switchMap(() => this.svc.getAllSubjects())
    .map(res => new subjects.SubjectActionSuccess(res))
    .catch((err) => Observable.of(new subjects.SubjectActionFailed(err)));

  @Effect()
  subjectsForTypeEffect$: Observable<Action> = this.actions$
    .ofType(subjects.SubjectActionTypes.SUBJECT_LIST_FOR_TYPE)
    .map((action: subjects.SubjectsForTypes) => action.payload)
    .switchMap(id => this.svc.getSubjectsForType(id))
    .map(res => new subjects.SubjectActionSuccess(res))
    .catch(err => Observable.of(new subjects.SubjectActionFailed(err)));

  @Effect()
  subjectsForAreaTypeEffect$: Observable<Action> = this.actions$
    .ofType(subjects.SubjectActionTypes.SUBJECT_LIST_FOR_AREA_TYPE)
    .map((action: subjects.SubjectsForAreaTypes) => action.payload)
    .switchMap(payload => this.svc.getSubjectsForAreaAndType(payload.areaId, payload.typeId))
    .map(res => new subjects.SubjectActionSuccess(res))
    .catch(err => Observable.of(new subjects.SubjectActionFailed(err)));

  @Effect()
  subjectsForAreaGroupEffect$: Observable<Action> = this.actions$
    .ofType(subjects.SubjectActionTypes.SUBJECT_LIST_FOR_GROUP_AREA)
    .map((action: subjects.SubjectsForAreaGroup) => action.payload)
    .switchMap(payload => this.svc.getSubjectsForAreaAndGroup(payload.areaId, payload.categoryId))
    .map(res => new subjects.SubjectActionSuccess(res))
    .catch(err => Observable.of(new subjects.SubjectActionFailed(err)));

  @Effect()
  subjectsForAreaTypeGroupEffect$: Observable<Action> = this.actions$
    .ofType(subjects.SubjectActionTypes.SUBJECT_LIST_FOR_GROUP_AREA_TYPE)
    .map((action: subjects.SubjectsForAreaGroupType) => action.payload)
    .switchMap(payload => this.svc.getSubjectsForAreaGroupAndType(payload.areaId, payload.categoryId, payload.typeId))
    .map(res => new subjects.SubjectActionSuccess(res))
    .catch(err => Observable.of(new subjects.SubjectActionFailed(err)));

  constructor(private svc: SubjectService, private actions$: Actions) {
  }
}
