
import * as types from '../actions/type.actions';
import {Injectable} from '@angular/core';
import {TypesService} from '../services/types.service';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {Action} from '../actions/action.interface';
import {AreaSubjectParams} from '../actions/area-subject-parameters.interface';

@Injectable()
export class TypeEffects {

  constructor(private svc: TypesService, private actions$: Actions) {
  }

  @Effect()
  allTypesEffect$: Observable<Action> = this.actions$
    .ofType(types.ContentTypeActionTypes.TYPE_LIST)
   // .map((action: types.ContentTypesAllAction) => action.payload)
    .switchMap(() => this.svc.getTypesAll())
    .map(res => new types.ContentTypesAllSuccessAction(res))
    .catch((err) => Observable.of(new types.TypeActionFailed(err)));

  @Effect()
  typesByAreaEffect$: Observable<Action> = this.actions$
    .ofType(types.ContentTypeActionTypes.TYPE_AREA_LIST)
    .map((action: types.ContentTypesAreaAction) => action.payload)
    .switchMap((id) => this.svc.getTypesArea(id))
    .map(res => new types.ContentTypesAreaSuccessAction(res))
    .catch((err) => Observable.of(new types.TypeActionFailed(err)));

  @Effect()
  typesBySubjectEffect$: Observable<Action> = this.actions$
    .ofType(types.ContentTypeActionTypes.TYPE_SUBJECT_LIST)
    .map((action: types.ContentTypesSubjectAction) => action.payload)
    .switchMap((id) => this.svc.getTypesSubject(id))
    .map(res => new types.ContentTypesSubjectSuccessAction(res))
    .catch((err) => Observable.of(new types.TypeActionFailed(err)));

  @Effect()
  typesByAreaSubjectEffect$: Observable<Action> = this.actions$
    .ofType(types.ContentTypeActionTypes.TYPE_SUBJECT_AREA_LIST)
    .map((action: types.ContentTypesAreaSubjectAction) => action.payload)
    .switchMap((params: AreaSubjectParams) => this.svc.getTypesAreaSubject(params))
    .map(res => new types.ContentTypesSubjectSuccessAction(res))
    .catch((err) => Observable.of(new types.TypeActionFailed(err)));

}