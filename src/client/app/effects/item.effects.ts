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

import {Injectable} from "@angular/core";
import {ItemService} from "../services/item.service";
import {Actions, Effect} from "@ngrx/effects";
import {Observable} from "rxjs";
import * as item from '../actions/item.actions';
import {Action} from '../actions/action.interface';
import {ItemActions} from "../actions/item.actions";


@Injectable()
export class ItemEffects {

  constructor(private svc: ItemService, private actions$: Actions) {
  }

  @Effect()
  itemEffect$: Observable<Action> = this.actions$
    .ofType(item.ItemActionTypes.ITEM_REQUEST)
    .map((action: ItemActions) => action.payload)
    .switchMap((id: string) => this.svc.getItem(id))
    .map(res => new item.ItemSuccess(res))
    .catch((err) => Observable.of(new item.ItemRequestFailed(err)));
}
