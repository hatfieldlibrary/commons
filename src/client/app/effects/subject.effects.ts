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

import {Injectable} from "@angular/core";
import {Actions, Effect} from "@ngrx/effects";
import * as subjects from '../actions/subject-actions';
import {Observable} from "rxjs";
import {Action} from '../actions/action.interface';
import {SubjectService} from "../services/subject.service";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

@Injectable()
export class SubjectEffects {

  constructor(private svc: SubjectService, private actions$: Actions) {
  }

  @Effect()
subjectEffect$: Observable<Action> = this.actions$
  .ofType(subjects.SubjectActionTypes.SUBJECT_LIST)
  .map((action: subjects.SubjectAction) => action.payload)
  .switchMap(id => this.svc.getSubjects(id))
  .map(res => new subjects.SubjectActionSuccess(res))
  .catch((err) => Observable.of(new subjects.SubjectActionFailed(err)));

  @Effect()
  allSubjectEffect$: Observable<Action> = this.actions$
    .ofType(subjects.SubjectActionTypes.ALL_SUBJECT_LIST)
   // .map((action: subjects.SubjectAction) => action.payload)
    .switchMap(()=> this.svc.getAllSubjects())
    .map(res => new subjects.AllSubjectActionSuccess(res))
    .catch((err) => Observable.of(new subjects.SubjectActionFailed(err)));

}
