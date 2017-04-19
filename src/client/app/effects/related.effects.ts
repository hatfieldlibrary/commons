import {Injectable} from "@angular/core";
import {Actions, Effect} from "@ngrx/effects";
import {Observable} from "rxjs";
import {Action} from "@ngrx/store";
import * as related from '../actions/item.actions';
import {RelatedService} from "../services/related.service";
/**
 * Created by mspalti on 4/10/17.
 */


@Injectable()
export class RelatedEffects {

  constructor(private svc: RelatedService, private actions$: Actions) {
  }

  @Effect()
  relatedEffect$: Observable<Action> = this.actions$
    .ofType(related.ItemActionTypes.RELATED_COLLECTIONS)
    .map((action: related.ItemActionRelated) => action.payload)
    .switchMap((payload) => this.svc.getRelatedCollections(payload.id, payload.subjectIds))
    .map(res => new related.ItemActionRelatedSuccess(res))
    .catch((err) => Observable.of(new related.ItemRequestFailed(err)));

}
