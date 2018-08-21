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
import * as types from '../actions/type.actions';
import {Injectable} from '@angular/core';
import {TypesService} from '../../services/types.service';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action} from '../actions/action.interface';
import {IdentifersPayload} from '../actions/payload-parameters.interface';
import {catchError, map, switchMap} from 'rxjs/operators';

@Injectable()
export class TypeEffects {

  @Effect()
  allTypesEffect$: Observable<Action> = this.actions$.pipe(
    ofType(types.ContentTypeActionTypes.TYPE_LIST),
    // .map((action: types.ContentTypesAllAction) => action.payload)
    switchMap(() => this.svc.getTypesAll().pipe(
      map(res => new types.ContentTypesActionSuccess(res)),
      catchError((err) => observableOf(new types.TypeActionFailed(err))))));

  @Effect()
  typesByAreaEffect$: Observable<Action> = this.actions$.pipe(
    ofType(types.ContentTypeActionTypes.TYPE_AREA_LIST),
    map((action: types.ContentTypesAreaAction) => action.payload),
    switchMap((id) => this.svc.getTypesArea(id).pipe(
      map(res => new types.ContentTypesActionSuccess(res)),
      catchError((err) => observableOf(new types.TypeActionFailed(err))))));

  @Effect()
  typesBySubjectEffect$: Observable<Action> = this.actions$.pipe(
    ofType(types.ContentTypeActionTypes.TYPE_SUBJECT_LIST),
    map((action: types.ContentTypesSubjectAction) => action.payload),
    switchMap((id) => this.svc.getTypesSubject(id).pipe(
      map(res => new types.ContentTypesActionSuccess(res)),
      catchError((err) => observableOf(new types.TypeActionFailed(err))))));

  @Effect()
  typesByAreaSubjectEffect$: Observable<Action> = this.actions$.pipe(
    ofType(types.ContentTypeActionTypes.TYPE_SUBJECT_AREA_LIST),
    map((action: types.ContentTypesAreaSubjectAction) => action.payload),
    switchMap((params: IdentifersPayload) => this.svc.getTypesAreaSubject(params.areaId, params.subjectId).pipe(
      map(res => new types.ContentTypesActionSuccess(res)),
      catchError((err) => observableOf(new types.TypeActionFailed(err))))));

  @Effect()
  typesByAreaGroupEffect$: Observable<Action> = this.actions$.pipe(
    ofType(types.ContentTypeActionTypes.TYPE_AREA_GROUP_LIST),
    map((action: types.ContentTypesAreaGroupAction) => action.payload),
    switchMap((params: IdentifersPayload) => this.svc.getTypesAreaGroup(params.areaId, params.categoryId).pipe(
      map(res => new types.ContentTypesActionSuccess(res)),
      catchError((err) => observableOf(new types.TypeActionFailed(err))))));

  @Effect()
  typesByAreaGroupSubjectEffect$: Observable<Action> = this.actions$.pipe(
    ofType(types.ContentTypeActionTypes.TYPE_AREA_SUBJECT_GROUP_LIST),
    map((action: types.ContentTypesAreaSubjectGroupAction) => action.payload),
    switchMap((params: IdentifersPayload) =>
      this.svc.getTypesAreaGroupSubject(params.areaId, params.categoryId, params.subjectId).pipe(
        map(res => new types.ContentTypesActionSuccess(res)),
        catchError((err) => observableOf(new types.TypeActionFailed(err))))));

  constructor(private svc: TypesService, private actions$: Actions) {
  }
}
