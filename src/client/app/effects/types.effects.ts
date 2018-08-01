
import * as types from '../actions/type.actions';
import {Injectable} from '@angular/core';
import {TypesService} from '../services/types.service';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {Action} from '../actions/action.interface';
import {IdentifersPayload} from '../actions/payload-parameters.interface';

@Injectable()
export class TypeEffects {

  constructor(private svc: TypesService, private actions$: Actions) {
  }

  @Effect()
  allTypesEffect$: Observable<Action> = this.actions$
    .ofType(types.ContentTypeActionTypes.TYPE_LIST)
   // .map((action: types.ContentTypesAllAction) => action.payload)
    .switchMap(() => this.svc.getTypesAll())
    .map(res => new types.ContentTypesActionSuccess(res))
    .catch((err) => Observable.of(new types.TypeActionFailed(err)));

  @Effect()
  typesByAreaEffect$: Observable<Action> = this.actions$
    .ofType(types.ContentTypeActionTypes.TYPE_AREA_LIST)
    .map((action: types.ContentTypesAreaAction) => action.payload)
    .switchMap((id) => this.svc.getTypesArea(id))
    .map(res => new types.ContentTypesActionSuccess(res))
    .catch((err) => Observable.of(new types.TypeActionFailed(err)));

  @Effect()
  typesBySubjectEffect$: Observable<Action> = this.actions$
    .ofType(types.ContentTypeActionTypes.TYPE_SUBJECT_LIST)
    .map((action: types.ContentTypesSubjectAction) => action.payload)
    .switchMap((id) => this.svc.getTypesSubject(id))
    .map(res => new types.ContentTypesActionSuccess(res))
    .catch((err) => Observable.of(new types.TypeActionFailed(err)));

  @Effect()
  typesByAreaSubjectEffect$: Observable<Action> = this.actions$
    .ofType(types.ContentTypeActionTypes.TYPE_SUBJECT_AREA_LIST)
    .map((action: types.ContentTypesAreaSubjectAction) => action.payload)
    .switchMap((params: IdentifersPayload) => this.svc.getTypesAreaSubject(params.areaId, params.subjectId))
    .map(res => new types.ContentTypesActionSuccess(res))
    .catch((err) => Observable.of(new types.TypeActionFailed(err)));

  @Effect()
  typesByAreaGroupEffect$: Observable<Action> = this.actions$
    .ofType(types.ContentTypeActionTypes.TYPE_AREA_GROUP_LIST)
    .map((action: types.ContentTypesAreaGroupAction) => action.payload)
    .switchMap((params: IdentifersPayload) => this.svc.getTypesAreaGroup(params.areaId, params.categoryId))
    .map(res => new types.ContentTypesActionSuccess(res))
    .catch((err) => Observable.of(new types.TypeActionFailed(err)));

  @Effect()
  typesByAreaGroupSubjectEffect$: Observable<Action> = this.actions$
    .ofType(types.ContentTypeActionTypes.TYPE_AREA_SUBJECT_GROUP_LIST)
    .map((action: types.ContentTypesAreaSubjectGroupAction) => action.payload)
    .switchMap((params: IdentifersPayload) => this.svc.getTypesAreaGroupSubject(params.areaId, params.categoryId, params.subjectId))
    .map(res => new types.ContentTypesActionSuccess(res))
    .catch((err) => Observable.of(new types.TypeActionFailed(err)));
}
