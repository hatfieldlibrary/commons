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

/**
 * Created by mspalti on 2/21/17.
 */
import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {CollectionService} from '../services/collection.service';
import * as collection from '../actions/collection.actions';
import {Action} from '../actions/action.interface';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

@Injectable()
export class CollectionEffects {

  constructor(private svc: CollectionService, private actions$: Actions) {
  }

  @Effect()
  collectionsByArea$: Observable<Action> = this.actions$
    .ofType(collection.CollectionActionTypes.LIST_BY_AREA)
    .map((action: collection.CollectionsAreaAction) => action.payload)
    .switchMap(id => this.svc.getCollectionsByAreaId(id))
    .map(res => new collection.CollectionsActionSuccess(res))
    .catch((err) => Observable.of(new collection.CollectionActionFailed(err)));

  @Effect()
  collectionsBySubjectArea$: Observable<Action> = this.actions$
    .ofType(collection.CollectionActionTypes.LIST_BY_SUBJECT_AREA)
    .map((action: collection.CollectionsAreaSubjectAction) => action.payload)
    .switchMap((payload) => this.svc.getCollectionsByAreaSubject(payload.areaId, payload.subjectId))
    .map((res) => new collection.CollectionsActionSuccess(res))
    .catch((err) => Observable.of(new collection.CollectionActionFailed(err)));

  @Effect()
  collectionsBySubject$: Observable<Action> = this.actions$
    .ofType(collection.CollectionActionTypes.LIST_BY_SUBJECT)
    .map((action: collection.CollectionsSubjectAction) => action.payload)
    .switchMap((payload) => this.svc.getCollectionsBySubject(payload))
    .map((res) => new collection.CollectionsActionSuccess(res))
    .catch((err) => Observable.of(new collection.CollectionActionFailed(err)));

  @Effect()
  collectionsAll$: Observable<Action> = this.actions$
    .ofType(collection.CollectionActionTypes.LIST_ALL_ACTION)
    .switchMap(() => this.svc.getAllCollections())
    .map((res) => new collection.CollectionsActionSuccess(res))
    .catch((err) => Observable.of(new collection.CollectionActionFailed(err)));

  @Effect()
  collectionsByType$: Observable<Action> = this.actions$
    .ofType(collection.CollectionActionTypes.LIST_BY_TYPE)
    .map((action: collection.CollectionsTypeAction) => action.payload)
    .switchMap((payload) => this.svc.getCollectionsByType(payload))
    .map((res) => new collection.CollectionsActionSuccess(res))
    .catch((err) => Observable.of(new collection.CollectionActionFailed(err)));

  @Effect()
  collectionsByTypeArea$: Observable<Action> = this.actions$
    .ofType(collection.CollectionActionTypes.LIST_BY_TYPE_AREA)
    .map((action: collection.CollectionsTypeAreaAction) => action.payload)
    .switchMap((payload) =>
      this.svc.getCollectionsByTypeArea(payload.areaId, payload.typeId))
    .map((res) => new collection.CollectionsActionSuccess(res))
    .catch((err) => Observable.of(new collection.CollectionActionFailed(err)));

  @Effect()
  collectionsByTypeSubject$: Observable<Action> = this.actions$
    .ofType(collection.CollectionActionTypes.LIST_BY_TYPE_SUBJECT)
    .map((action: collection.CollectionsTypeSubjectAction) => action.payload)
    .switchMap((payload) =>
      this.svc.getCollectionsByTypeSubject(payload.typeId, payload.subjectId))
    .map((res) => new collection.CollectionsActionSuccess(res))
    .catch((err) => Observable.of(new collection.CollectionActionFailed(err)));

  @Effect()
  collectionsByTypeAreaSubject$: Observable<Action> = this.actions$
    .ofType(collection.CollectionActionTypes.LIST_BY_TYPE_AREA_SUBJECT)
    .map((action: collection.CollectionsTypeAreaSubjectAction) => action.payload)
    .switchMap((payload) =>
      this.svc.getCollectionsByTypeAreaSubject(payload.typeId, payload.areaId, payload.subjectId))
    .map((res) => new collection.CollectionsActionSuccess(res))
    .catch((err) => Observable.of(new collection.CollectionActionFailed(err)));

  @Effect()
  collectionsByCategoryArea$: Observable<Action> = this.actions$
    .ofType(collection.CollectionActionTypes.LIST_BY_CATEGORY_AREA)
    .map((action: collection.CollectionsCategoryAreaAction) => action.payload)
    .switchMap(payload =>
      this.svc.getCollectionsByCategoryArea(payload.categoryId, payload.areaId))
    .map(res => new collection.CollectionsActionSuccess(res))
    .catch(err => Observable.of(new collection.CollectionActionFailed(err)));

  @Effect()
  collectionsByCategoryType$: Observable<Action> = this.actions$
    .ofType(collection.CollectionActionTypes.LIST_BY_CATEGORY_TYPE)
    .map((action: collection.CollectionsCategoryTypeAction) => action.payload)
    .switchMap(payload =>
      this.svc.getCollectionsByCategoryType(payload.categoryId, payload.typeId))
    .map(res => new collection.CollectionsActionSuccess(res))
    .catch(err => Observable.of(new collection.CollectionActionFailed(err)));

  @Effect()
  collectionsByCategorySubject$: Observable<Action> = this.actions$
    .ofType(collection.CollectionActionTypes.LIST_BY_CATEGORY_SUBJECT)
    .map((action: collection.CollectionsCategoryAreaTypeAction) => action.payload)
    .switchMap(payload =>
      this.svc.getCollectionsByCategorySubject(payload.categoryId,
        payload.subjectId))
    .map(res => new collection.CollectionsActionSuccess(res))
    .catch(err => Observable.of(new collection.CollectionActionFailed(err)));

  @Effect()
  collectionsByCategoryAreaType$: Observable<Action> = this.actions$
    .ofType(collection.CollectionActionTypes.LIST_BY_CATEGORY_AREA_TYPE)
    .map((action: collection.CollectionsCategoryAreaTypeAction) => action.payload)
    .switchMap(payload =>
      this.svc.getCollectionsByCategoryAreaType(payload.categoryId,
        payload.areaId,
        payload.typeId))
    .map(res => new collection.CollectionsActionSuccess(res))
    .catch(err => Observable.of(new collection.CollectionActionFailed(err)));

  @Effect()
  collectionsByCategoryAreaSubject$: Observable<Action> = this.actions$
    .ofType(collection.CollectionActionTypes.LIST_BY_CATEGORY_AREA_SUBJECT)
    .map((action: collection.CollectionsCategoryAreaTypeAction) => action.payload)
    .switchMap(payload =>
      this.svc.getCollectionsByCategoryAreaSubject(payload.categoryId,
        payload.areaId,
        payload.subjectId))
    .map(res => new collection.CollectionsActionSuccess(res))
    .catch(err => Observable.of(new collection.CollectionActionFailed(err)));

  @Effect()
  collectionsByCategoryTypeSubject$: Observable<Action> = this.actions$
    .ofType(collection.CollectionActionTypes.LIST_BY_CATEGORY_TYPE_SUBJECT)
    .map((action: collection.CollectionsCategoryTypeSubjectAction) => action.payload)
    .switchMap(payload =>
      this.svc.getCollectionsByCategoryTypeSubject(payload.categoryId,
        payload.typeId,
        payload.subjectId))
    .map(res => new collection.CollectionsActionSuccess(res))
    .catch(err => Observable.of(new collection.CollectionActionFailed(err)));

  @Effect()
  collectionsByCategoryAreaTypeSubject$: Observable<Action> = this.actions$
    .ofType(collection.CollectionActionTypes.LIST_BY_CATEGORY_AREA_TYPE_SUBJECT)
    .map((action: collection.CollectionsCategoryAreaTypeSubjectAction) => action.payload)
    .switchMap(payload =>
      this.svc.getCollectionsByCategoryAreaTypeSubject(payload.categoryId,
        payload.areaId,
        payload.typeId,
        payload.subjectId))
    .map(res => new collection.CollectionsActionSuccess(res))
    .catch(err => Observable.of(new collection.CollectionActionFailed(err)));
}
