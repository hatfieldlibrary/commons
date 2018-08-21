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


import {of as observableOf, Observable} from 'rxjs';

import {catchError, map, switchMap} from 'rxjs/operators';
import {Actions, Effect, ofType} from '@ngrx/effects';
import * as groups from '../actions/collection-group.actions';
import {Action} from '../actions/action.interface';
import {Injectable} from '@angular/core';
import {CollectionGroupServices} from '../../services/collection-group.services';
import {FieldFilterType} from '../../data-types/field-filter.type';
import {IdentifersPayload} from '../actions/payload-parameters.interface';

@Injectable()
export class CollectionGroupEffects {

  @Effect()
  allGroupEffect$: Observable<Action> = this.actions$.pipe(
    ofType(groups.GroupActionTypes.ALL_GROUP_REQUEST),
    switchMap(
      () => this.svc.getAllGroups().pipe(
        map(
          res => new groups.GroupActionSuccess(<FieldFilterType[]> res)),
        catchError(
          err => observableOf(new groups.GroupActionFailed(err))
        )
      )
    )
  );

  @Effect()
  groupsByAreaEffect$: Observable<Action> = this.actions$.pipe(
    ofType(groups.GroupActionTypes.GROUPS_BY_AREA),
    map(
      (action: groups.GroupsByArea) => action.payload),
    switchMap(
      (id) => this.svc.getGroupsByArea(id).pipe(
        map(
          res => new groups.GroupActionSuccess(<FieldFilterType[]> res)),
        catchError(
          err => observableOf(new groups.GroupActionFailed(err))
        )
      )
    )
  );

  @Effect()
  groupsByTypeEffect$: Observable<Action> = this.actions$.pipe(
    ofType(groups.GroupActionTypes.GROUPS_BY_TYPE),
    map(
      (action: groups.GroupsByType) => action.payload),
    switchMap(
      id => this.svc.getGroupsByType(id).pipe(
        map(
          res => new groups.GroupActionSuccess(<FieldFilterType[]> res)),
        catchError(
          err => observableOf(new groups.GroupActionFailed(err))
        )
      )
    )
  );

  @Effect()
  groupsBySubjectEffect$: Observable<Action> = this.actions$.pipe(
    ofType(groups.GroupActionTypes.GROUPS_BY_SUBJECT),
    map(
      (action: groups.GroupsBySubject) => action.payload),
    switchMap(
      id => this.svc.getGroupsBySubject(id).pipe(
        map(
          res => new groups.GroupActionSuccess(<FieldFilterType[]> res)),
        catchError(
          err => observableOf(new groups.GroupActionFailed(err))
        )
      )
    )
  );

  @Effect()
  groupsBySubjectTypeEffect$: Observable<Action> = this.actions$.pipe(
    ofType(groups.GroupActionTypes.GROUPS_BY_SUBJECT_TYPE),
    map(
      (action: groups.GroupsBySubjectType) => action.payload),
    switchMap(
      (payload: IdentifersPayload) => this.svc.getGroupsBySubjectType(payload.typeId, payload.subjectId).pipe(
        map(
          res => new groups.GroupActionSuccess(<FieldFilterType[]> res)),
        catchError(
          err => observableOf(new groups.GroupActionFailed(err))
        )
      )
    )
  );

  @Effect()
  groupsByAreaTypeEffect$: Observable<Action> = this.actions$.pipe(
    ofType(groups.GroupActionTypes.GROUPS_BY_AREA_TYPE),
    map(
      (action: groups.GroupsByAreaType) => action.payload),
    switchMap(
      (payload: IdentifersPayload) => this.svc.getGroupsByAreaType(payload.areaId, payload.typeId).pipe(
        map(
          res => new groups.GroupActionSuccess(<FieldFilterType[]> res)),
        catchError(
          err => observableOf(new groups.GroupActionFailed(err))
        )
      )
    )
  );

  @Effect()
  groupsByAreaSubjectEffect$: Observable<Action> = this.actions$.pipe(
    ofType(groups.GroupActionTypes.GROUPS_BY_AREA_SUBJECT),
    map(
      (action: groups.GroupsByAreaSubject) => action.payload),
    switchMap(
      (payload: IdentifersPayload) => this.svc.getGroupsByAreaSubject(payload.areaId, payload.subjectId).pipe(
        map(
          res => new groups.GroupActionSuccess(<FieldFilterType[]> res)),
        catchError(
          err => observableOf(new groups.GroupActionFailed(err))
        )
      )
    )
  );

  @Effect()
  groupsByAreaSubjectTypeEffect$: Observable<Action> = this.actions$.pipe(
    ofType(groups.GroupActionTypes.GROUPS_BY_AREA_SUBJECT_TYPE),
    map(
      (action: groups.GroupsByAreaSubjectType) => action.payload),
    switchMap(
      (payload: IdentifersPayload) =>
        this.svc.getGroupsByAreaSubjectType(payload.areaId, payload.subjectId, payload.typeId).pipe(
          map(
            res => new groups.GroupActionSuccess(<FieldFilterType[]> res)),
          catchError(
            err => observableOf(new groups.GroupActionFailed(err))
          )
        )
    )
  );

  constructor(private svc: CollectionGroupServices, private actions$: Actions) {
  }

}
