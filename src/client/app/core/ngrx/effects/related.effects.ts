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
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action} from '../actions/action.interface';
import * as related from '../actions/related.actions';
import {RelatedService} from '../../services/related.service';
import {RelatedType} from '../../data-types/related-collection';
import {RelatedItemsParams} from '../actions/related.actions';


/**
 * Created by mspalti on 4/10/17.
 */


@Injectable()
export class RelatedEffects {

  @Effect()
  relatedEffect$: Observable<Action> = this.actions$.pipe(
    ofType(related.RelatedItemActionTypes.RELATED_COLLECTIONS),
    map(
      (action: related.ItemActionRelated) => action.payload),
    switchMap(
      (payload: RelatedItemsParams) => this.svc.getRelatedCollections(payload.itemId, payload.subjectIds).pipe(
        map(
          res => new related.ItemActionRelatedSuccess(<RelatedType[]> res)
        ),
        catchError(
          err => observableOf(new related.RelatedItemRequestFailed(err))
        )
      )
    )
  );

  constructor(private svc: RelatedService, private actions$: Actions) {
  }

}
