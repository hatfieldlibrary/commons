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

import {catchError, switchMap, map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {CollectionService} from '../../services/collection.service';
import * as collection from '../actions/collection.actions';
import {Action} from '../actions/action.interface';
import {IdentifersPayload} from '../actions/payload-parameters.interface';

@Injectable()
export class CollectionEffects {

  @Effect()
  collectionsByArea$: Observable<Action> = this.actions$.pipe(
    ofType(collection.CollectionActionTypes.LIST_BY_AREA),
    map((action: collection.CollectionsAreaAction) => action.payload),
    switchMap(
      id => this.svc.getCollectionsByAreaId(id).pipe(
        map(
          (res) => {
            return new collection.CollectionsActionSuccess(res);
            }),
        catchError(
          (err) => observableOf(new collection.CollectionActionFailed(err))
        )
      )
    )
  );

  @Effect()
  collectionsBySubjectArea$: Observable<Action> = this.actions$.pipe(
    ofType(collection.CollectionActionTypes.LIST_BY_SUBJECT_AREA),
    map((action: collection.CollectionsAreaSubjectAction) => action.payload),
    switchMap(
      (payload: IdentifersPayload) =>
        this.svc.getCollectionsByAreaSubject(payload.areaId, payload.subjectId).pipe(
          map(
            (res) => {
              return new collection.CollectionsActionSuccess(res);
            }),
          catchError(
            (err) => observableOf(new collection.CollectionActionFailed(err))
          )
        )
    )
  );

  @Effect()
  collectionsBySubject$: Observable<Action> = this.actions$.pipe(
    ofType(collection.CollectionActionTypes.LIST_BY_SUBJECT),
    map((action: collection.CollectionsSubjectAction) => action.payload),
    switchMap(
      id => this.svc.getCollectionsBySubject(id).pipe(
        map(
          (res) => new collection.CollectionsActionSuccess(res)),
        catchError(
          (err) => observableOf(new collection.CollectionActionFailed(err)
          )
        )
      )
    )
  );

  @Effect()
  collectionsAll$: Observable<Action> = this.actions$.pipe(
    ofType(collection.CollectionActionTypes.LIST_ALL_ACTION),
    switchMap(
      () => this.svc.getAllCollections().pipe(
        map(
          (res) => new collection.CollectionsActionSuccess(res)),
        catchError(
          (err) => observableOf(new collection.CollectionActionFailed(err))
        )
      )
    )
  );

  @Effect()
  collectionsByType$: Observable<Action> = this.actions$.pipe(
    ofType(collection.CollectionActionTypes.LIST_BY_TYPE),
    map((action: collection.CollectionsTypeAction) => action.payload),
    switchMap(
      id => this.svc.getCollectionsByType(id).pipe(
        map(
          (res) => new collection.CollectionsActionSuccess(res)),
        catchError(
          (err) => observableOf(new collection.CollectionActionFailed(err))
        )
      )
    )
  );

  @Effect()
  collectionsByTypeArea$: Observable<Action> = this.actions$.pipe(
    ofType(collection.CollectionActionTypes.LIST_BY_TYPE_AREA),
    map((action: collection.CollectionsTypeAreaAction) => action.payload),
    switchMap(
      (payload: IdentifersPayload) => this.svc.getCollectionsByTypeArea(payload.areaId, payload.typeId).pipe(
        map((
          res) => new collection.CollectionsActionSuccess(res)),
        catchError(
          (err) => observableOf(new collection.CollectionActionFailed(err))
        )
      )
    )
  );

  @Effect()
  collectionsByTypeSubject$: Observable<Action> = this.actions$.pipe(
    ofType(collection.CollectionActionTypes.LIST_BY_TYPE_SUBJECT),
    map((action: collection.CollectionsTypeSubjectAction) => action.payload),
    switchMap(
      (payload: IdentifersPayload) => this.svc.getCollectionsByTypeSubject(payload.typeId, payload.subjectId).pipe(
        map(
          (res) => new collection.CollectionsActionSuccess(res)),
        catchError(
          (err) => observableOf(new collection.CollectionActionFailed(err))
        )
      )
    )
  );

  @Effect()
  collectionsByTypeAreaSubject$: Observable<Action> = this.actions$.pipe(
    ofType(collection.CollectionActionTypes.LIST_BY_TYPE_AREA_SUBJECT),
    map((action: collection.CollectionsTypeAreaSubjectAction) => action.payload),
    switchMap(
      (payload: IdentifersPayload) =>
        this.svc.getCollectionsByTypeAreaSubject(payload.typeId, payload.areaId, payload.subjectId).pipe(
          map(
            (res) => new collection.CollectionsActionSuccess(res)),
          catchError(
            (err) => observableOf(new collection.CollectionActionFailed(err))
          )
        )
    )
  );

  @Effect()
  collectionsByCategoryArea$: Observable<Action> = this.actions$.pipe(
    ofType(collection.CollectionActionTypes.LIST_BY_CATEGORY_AREA),
    map((action: collection.CollectionsCategoryAreaAction) => action.payload),
    switchMap(
      (payload: IdentifersPayload) =>
        this.svc.getCollectionsByCategoryArea(payload.categoryId, payload.areaId).pipe(
          map(
            res => new collection.CollectionsActionSuccess(res)),
          catchError(
            err => observableOf(new collection.CollectionActionFailed(err))
          )
        )
    )
  );

  @Effect()
  collectionsByCategoryType$: Observable<Action> = this.actions$.pipe(
    ofType(collection.CollectionActionTypes.LIST_BY_CATEGORY_TYPE),
    map((action: collection.CollectionsCategoryTypeAction) => action.payload),
    switchMap(
      (payload: IdentifersPayload) =>
        this.svc.getCollectionsByCategoryType(payload.categoryId, payload.typeId).pipe(
          map(
            res => new collection.CollectionsActionSuccess(res)),
          catchError(
            err => observableOf(new collection.CollectionActionFailed(err))
          )
        )
    )
  );

  @Effect()
  collectionsByCategorySubject$: Observable<Action> = this.actions$.pipe(
    ofType(collection.CollectionActionTypes.LIST_BY_CATEGORY_SUBJECT),
    map((action: collection.CollectionsCategoryAreaTypeAction) => action.payload),
    switchMap(
      (payload: IdentifersPayload) =>
        this.svc.getCollectionsByCategorySubject(payload.categoryId,
          payload.subjectId).pipe(
          map(
            res => new collection.CollectionsActionSuccess(res)),
          catchError(
            err => observableOf(new collection.CollectionActionFailed(err))
          )
        )
    )
  );

  @Effect()
  collectionsByCategoryAreaType$: Observable<Action> = this.actions$.pipe(
    ofType(collection.CollectionActionTypes.LIST_BY_CATEGORY_AREA_TYPE),
    map((action: collection.CollectionsCategoryAreaTypeAction) => action.payload),
    switchMap(
      (payload: IdentifersPayload) =>
        this.svc.getCollectionsByCategoryAreaType(payload.categoryId,
          payload.areaId,
          payload.typeId).pipe(
          map(
            res => new collection.CollectionsActionSuccess(res)),
          catchError(
            err => observableOf(new collection.CollectionActionFailed(err))
          )
        )
    )
  );

  @Effect()
  collectionsByCategoryAreaSubject$: Observable<Action> = this.actions$.pipe(
    ofType(collection.CollectionActionTypes.LIST_BY_CATEGORY_AREA_SUBJECT),
    map((action: collection.CollectionsCategoryAreaTypeAction) => action.payload),
    switchMap(
      (payload: IdentifersPayload) =>
        this.svc.getCollectionsByCategoryAreaSubject(payload.categoryId, payload.areaId, payload.subjectId).pipe(
          map(
            res => new collection.CollectionsActionSuccess(res)),
          catchError(
            err => observableOf(new collection.CollectionActionFailed(err))
          )
        )
    )
  );

  @Effect()
  collectionsByCategoryTypeSubject$: Observable<Action> = this.actions$.pipe(
    ofType(collection.CollectionActionTypes.LIST_BY_CATEGORY_TYPE_SUBJECT),
    map((action: collection.CollectionsCategoryTypeSubjectAction) => action.payload),
    switchMap(
      (payload: IdentifersPayload) =>
        this.svc.getCollectionsByCategoryTypeSubject(payload.categoryId, payload.typeId, payload.subjectId).pipe(
          map(
            res => new collection.CollectionsActionSuccess(res)),
          catchError(
            err => observableOf(new collection.CollectionActionFailed(err))
          )
        )
    )
  );

  @Effect()
  collectionsByCategoryAreaTypeSubject$: Observable<Action> = this.actions$.pipe(
    ofType(collection.CollectionActionTypes.LIST_BY_CATEGORY_AREA_TYPE_SUBJECT),
    map((action: collection.CollectionsCategoryAreaTypeSubjectAction) => action.payload),
    switchMap(
      (payload: IdentifersPayload) =>
        this.svc.getCollectionsByCategoryAreaTypeSubject(payload.categoryId,
          payload.areaId,
          payload.typeId,
          payload.subjectId).pipe(
          map(
            res => new collection.CollectionsActionSuccess(res)),
          catchError(
            err => observableOf(new collection.CollectionActionFailed(err))
          )
        )
    )
  );

  constructor(private svc: CollectionService,
              private actions$: Actions) {
  }
}
