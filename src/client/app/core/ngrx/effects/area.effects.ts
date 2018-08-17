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

import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import * as areas from '../actions/area.actions';
import {Observable} from 'rxjs/Observable';
import {AreaService} from '../../services/area.service';
import {Action} from '../actions/action.interface';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

@Injectable()
export class AreaEffects {

  @Effect()
  areaListEffect$: Observable<Action> = this.actions$
    .ofType(areas.AreaActionTypes.AREA_LIST)
    .switchMap(() => this.svc.getAreaList())
    .map(res => new areas.AreaListSuccess(res))
    .catch((err) => Observable.of(new areas.AreaListActionFailed(err)));

  @Effect()
  areaListSubjectEffect$: Observable<Action> = this.actions$
    .ofType(areas.AreaActionTypes.AREA_LIST_SUBJECT)
    .map((action: areas.AreaListByType) => action.payload)
    .switchMap((id) => this.svc.getAreaListBySubject(id))
    .map(res =>   new areas.AreaListSuccess(res))
    .catch((err) => Observable.of(new areas.AreaListActionFailed(err)));

  @Effect()
  areaListTypeEffect$: Observable<Action> = this.actions$
    .ofType(areas.AreaActionTypes.AREA_LIST_TYPE)
    .map((action: areas.AreaListBySubject) => action.payload)
    .switchMap((id) => this.svc.getAreaListByType(id))
    .map(res =>   new areas.AreaListSuccess(res))
    .catch((err) => Observable.of(new areas.AreaListActionFailed(err)));

  @Effect()
  areaListTypeSubjectEffect$: Observable<Action> = this.actions$
    .ofType(areas.AreaActionTypes.AREA_LIST_TYPE_SUBJECT)
    .map((action: areas.AreaListByTypeSubject) => action.payload)
    .switchMap((payload) => this.svc.getAreaListByTypeSubject(payload.typeId, payload.subjectId))
    .map(res =>  new areas.AreaListSuccess(res))
    .catch((err) => Observable.of(new areas.AreaListActionFailed(err)));

  // TODO: Tagger is built to return an array of areas.  This version of the Commons assumes one. Should Tagger change?
  @Effect()
  areaInfoEffect$: Observable<Action> = this.actions$
    .ofType(areas.AreaActionTypes.AREA_INFORMATION)
    .map((action: areas.AreaInformation) => action.payload)
    .switchMap(id => this.svc.getAreaInfo(id))
    .map(res => new areas.AreaInformationSuccess(res[0]) )
    .catch((err) => Observable.of(new areas.AreaListActionFailed(err)));

  constructor(private svc: AreaService, private actions$: Actions) {
  }

}


