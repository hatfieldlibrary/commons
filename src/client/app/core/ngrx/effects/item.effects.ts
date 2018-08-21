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
import {ItemService} from '../../services/item.service';
import {Actions, Effect, ofType} from '@ngrx/effects';
import * as item from '../actions/item.actions';
import {Action} from '../actions/action.interface';
import {ItemActions} from '../actions/item.actions';


@Injectable()
export class ItemEffects {

  @Effect()
  itemEffect$: Observable<Action> = this.actions$.pipe(
    ofType(item.ItemActionTypes.ITEM_REQUEST),
    map(
      (action: ItemActions) => action.payload),
    switchMap(
      (id: string) => this.svc.getItem(id).pipe(
        map(
          res => new item.ItemSuccess(res)),
        catchError(
          err => observableOf(new item.ItemRequestFailed(err))
        )
      )
    )
  );

  constructor(private svc: ItemService, private actions$: Actions) {
  }
}
