import {Actions, Effect} from '@ngrx/effects';
import * as groups from '../actions/collection-group.actions';
import {Observable} from 'rxjs/Observable';
import {Action} from '../actions/action.interface';
import {Injectable} from '@angular/core';
import {CollectionGroupServices} from '../services/collection-group.services';
import {GroupsByAreaSubjectType} from '../actions/collection-group.actions';

@Injectable()
export class CollectionGroupEffects {

  constructor(private svc: CollectionGroupServices, private actions$: Actions) {
  }

  @Effect()
  allGroupEffect$: Observable<Action> = this.actions$
    .ofType(groups.GroupActionTypes.ALL_GROUP_REQUEST)
    .switchMap(() => this.svc.getAllGroups())
    .map(res => new groups.GroupActionSuccess(res))
    .catch((err) => Observable.of(new groups.GroupActionFailed(err)));

  @Effect()
  groupsByAreaEffect$: Observable<Action> = this.actions$
    .ofType(groups.GroupActionTypes.GROUPS_BY_AREA)
    .map((action: groups.GroupsByArea) => action.payload)
    .switchMap((id) => this.svc.getGroupsByArea(id))
    .map(res => new groups.GroupActionSuccess(res))
    .catch((err) => Observable.of(new groups.GroupActionFailed(err)));

  @Effect()
  groupsByTypeEffect$: Observable<Action> = this.actions$
    .ofType(groups.GroupActionTypes.GROUPS_BY_TYPE)
    .map((action: groups.GroupsByType) => action.payload)
    .switchMap((id) => this.svc.getGroupsByType(id))
    .map(res => new groups.GroupActionSuccess(res))
    .catch((err) => Observable.of(new groups.GroupActionFailed(err)));


  @Effect()
  groupsBySubjectEffect$: Observable<Action> = this.actions$
    .ofType(groups.GroupActionTypes.GROUPS_BY_SUBJECT)
    .map((action: groups.GroupsBySubject) => action.payload)
    .switchMap((id) => this.svc.getGroupsBySubject(id))
    .map(res => new groups.GroupActionSuccess(res))
    .catch((err) => Observable.of(new groups.GroupActionFailed(err)));

  @Effect()
  groupsBySubjectTypeEffect$: Observable<Action> = this.actions$
    .ofType(groups.GroupActionTypes.GROUPS_BY_SUBJECT_TYPE)
    .map((action: groups.GroupsBySubjectType) => action.payload)
    .switchMap((payload) => this.svc.getGroupsBySubjectType(payload.types, payload.subjects))
    .map(res => new groups.GroupActionSuccess(res))
    .catch((err) => Observable.of(new groups.GroupActionFailed(err)));

  @Effect()
  groupsByAreaTypeEffect$: Observable<Action> = this.actions$
    .ofType(groups.GroupActionTypes.GROUPS_BY_AREA_TYPE)
    .map((action: groups.GroupsByAreaType) => action.payload)
    .switchMap((payload) => this.svc.getGroupsByAreaType(payload.areas, payload.types))
    .map(res => new groups.GroupActionSuccess(res))
    .catch((err) => Observable.of(new groups.GroupActionFailed(err)));

  @Effect()
  groupsByAreaSubjectEffect$: Observable<Action> = this.actions$
    .ofType(groups.GroupActionTypes.GROUPS_BY_AREA_SUBJECT)
    .map((action: groups.GroupsByAreaSubject) => action.payload)
    .switchMap((payload) => this.svc.getGroupsByAreaSubject(payload.areas, payload.subjects))
    .map(res => new groups.GroupActionSuccess(res))
    .catch((err) => Observable.of(new groups.GroupActionFailed(err)));

  @Effect()
  groupsByAreaSubjectTypeEffect$: Observable<Action> = this.actions$
    .ofType(groups.GroupActionTypes.GROUPS_BY_AREA_SUBJECT_TYPE)
    .map((action: groups.GroupsByAreaSubjectType) => action.payload)
    .switchMap((payload) => this.svc.getGroupsByAreaSubjectType(payload.areas, payload.subjects, payload.types))
    .map(res => new groups.GroupActionSuccess(res))
    .catch((err) => Observable.of(new groups.GroupActionFailed(err)));

}
