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

import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {Action} from '../actions/action.interface';
import * as related from '../actions/related.actions';
import {RelatedService} from '../services/related.service';
/**
 * Created by mspalti on 4/10/17.
 */


@Injectable()
export class RelatedEffects {

  constructor(private svc: RelatedService, private actions$: Actions) {
  }

  @Effect()
  relatedEffect$: Observable<Action> = this.actions$
    .ofType(related.RelatedItemActionTypes.RELATED_COLLECTIONS)
    .map((action: related.ItemActionRelated) => action.payload)
    .switchMap((payload) => this.svc.getRelatedCollections(payload.id, payload.subjectIds))
    .map(res => new related.ItemActionRelatedSuccess(res))
    .catch((err) => Observable.of(new related.RelatedItemRequestFailed(err)));

}
