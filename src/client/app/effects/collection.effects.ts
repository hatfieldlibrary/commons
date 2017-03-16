/**
 * Created by mspalti on 2/21/17.
 */
import {Injectable} from "@angular/core";
import {Actions, Effect} from "@ngrx/effects";
import {Observable} from "rxjs";
import {CollectionService} from "../services/collection.service";
import * as collection from '../actions/collection.actions';
import {Action} from "@ngrx/store";

@Injectable()
export class CollectionEffects {

  constructor(private svc: CollectionService, private actions$: Actions) {
  }

  @Effect()
  collectionsByArea$: Observable<Action> = this.actions$
    .ofType(collection.CollectionActionTypes.LIST_BY_AREA)
    .map((action: collection.CollectionAction) => action.payload)
    .switchMap(id => this.svc.getCollectionsByAreaId(id))
    .map(res => new collection.CollectionActionSuccess(res))
    .catch((err) => Observable.of(new collection.CollectionActionFailed(err)));

  @Effect()
  collectionsBySubjectArea$: Observable<Action> = this.actions$
    .ofType(collection.CollectionActionTypes.LIST_AREA_SUBJECT)
    .map((action: collection.CollectionSubjectAction) => action.payload)
    .switchMap((payload) => this.svc.getCollectionsByAreaSubject(payload.id, payload.areaId))
    .map((res) => new collection.CollectionSubjectActionSuccess(res))
    .catch((err) => Observable.of(new collection.CollectionActionFailed(err)));

}