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
    .map(res => new collection.CollectionsAreaActionSuccess(res))
    .catch((err) => Observable.of(new collection.CollectionActionFailed(err)));

  @Effect()
  collectionsBySubjectArea$: Observable<Action> = this.actions$
    .ofType(collection.CollectionActionTypes.LIST_BY_AREA_SUBJECT)
    .map((action: collection.CollectionsAreaSubjectAction) => action.payload)
    .switchMap((payload) => this.svc.getCollectionsByAreaSubject(payload.id, payload.areaId))
    .map((res) => new collection.CollectionsSubjectActionSuccess(res))
    .catch((err) => Observable.of(new collection.CollectionActionFailed(err)));

  @Effect()
  collectionsBySubject$: Observable<Action> = this.actions$
    .ofType(collection.CollectionActionTypes.LIST_ALL_BY_SUBJECT)
    .map((action: collection.CollectionsSubjectAction) => action.payload)
    .switchMap((payload) => this.svc.getCollectionsBySubject(payload))
    .map((res) => new collection.CollectionsSubjectActionSuccess(res))
    .catch((err) => Observable.of(new collection.CollectionActionFailed(err)));

  @Effect()
  collectionsAll$: Observable<Action> = this.actions$
    .ofType(collection.CollectionActionTypes.LIST_ALL_ACTION)
    .switchMap(() => this.svc.getAllCollections())
    .map((res) => new collection.AllCollectionsActionSuccess(res))
    .catch((err) => Observable.of(new collection.CollectionActionFailed(err)));

  @Effect()
  collectionsByType$: Observable<Action> = this.actions$
    .ofType(collection.CollectionActionTypes.LIST_BY_TYPE)
    .map((action: collection.CollectionsTypeAction) => action.payload)
    .switchMap((payload) => this.svc.getCollectionsByType(payload))
    .map((res) => new collection.CollectionsTypeActionSuccess(res))
    .catch((err) => Observable.of(new collection.CollectionActionFailed(err)));

  @Effect()
  collectionsByTypeArea$: Observable<Action> = this.actions$
    .ofType(collection.CollectionActionTypes.LIST_BY_TYPE_AREA)
    .map((action: collection.CollectionsTypeAreaAction) => action.payload)
    .switchMap((payload) =>
      this.svc.getCollectionsByTypeArea(payload.types.join(','), payload.areas.join(',')))
    .map((res) => new collection.CollectionsTypeAreaActionSuccess(res))
    .catch((err) => Observable.of(new collection.CollectionActionFailed(err)));

  @Effect()
  collectionsByTypeSubject$: Observable<Action> = this.actions$
    .ofType(collection.CollectionActionTypes.LIST_BY_TYPE_SUBJECT)
    .map((action: collection.CollectionsTypeSubjectAction) => action.payload)
    .switchMap((payload) =>
      this.svc.getCollectionsByTypeSubject(payload.types.join(','), payload.subject))
    .map((res) => new collection.CollectionsTypeSubjectActionSuccess(res))
    .catch((err) => Observable.of(new collection.CollectionActionFailed(err)));

  @Effect()
  collectionsByTypeAreaSubject$: Observable<Action> = this.actions$
    .ofType(collection.CollectionActionTypes.LIST_BY_TYPE_AREA_SUBJECT)
    .map((action: collection.CollectionsTypeAreaSubjectAction) => action.payload)
    .switchMap((payload) =>
      this.svc.getCollectionsByTypeAreaSubject(payload.types.join(','), payload.areas.join(','), payload.subject))
    .map((res) => new collection.CollectionsTypeAreaActionSuccess(res))
    .catch((err) => Observable.of(new collection.CollectionActionFailed(err)));

}
