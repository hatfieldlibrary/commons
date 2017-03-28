import {Injectable} from "@angular/core";
import {ItemService} from "../services/item.service";
import {Actions, Effect} from "@ngrx/effects";
import {Observable} from "rxjs";
import * as item from '../actions/item.actions';
import {Action} from "@ngrx/store";
import {ItemActions} from "../actions/item.actions";


@Injectable()
export class ItemEffects {

  constructor(private svc: ItemService, private actions$: Actions) {
  }

  @Effect()
  itemEffect$:Observable<Action> = this.actions$
    .ofType(item.ItemActionTypes.ITEM_REQUEST)
    .map((action: ItemActions) => action.payload)
    .switchMap((id:string) => this.svc.getItem(id))
    .map(res => new item.ItemSuccess(res))
    .catch((err) => Observable.of(new item.ItemRequestFailed(err)));
}
