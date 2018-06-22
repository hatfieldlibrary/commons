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
import * as areas from '../actions/area.actions';
import {Observable} from 'rxjs/Observable';
import {AreaService} from '../services/area.service';
import {Action} from '../actions/action.interface';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

@Injectable()
export class AreaEffects {

  constructor(private svc: AreaService, private actions$: Actions) {
  }

  @Effect()
  areaListEffect$: Observable<Action> = this.actions$
    .ofType(areas.AreaActionTypes.AREA_LIST)
    .switchMap(() => this.svc.getAreaList())
    .map(res =>   new areas.AreaListActionSuccess(res))
    .catch((err) => Observable.of(new areas.AreaListActionFailed(err)));

  @Effect()
  areaListSubjectEffect$: Observable<Action> = this.actions$
    .ofType(areas.AreaActionTypes.AREA_LIST_SUBJECT)
    .map((action: areas.AreaListByType) => action.payload)
    .switchMap((id) => this.svc.getAreaListBySubject(id))
    .map(res =>   new areas.AreaListSubjectSuccess(res))
    .catch((err) => Observable.of(new areas.AreaListActionFailed(err)));

  @Effect()
  areaListTypeEffect$: Observable<Action> = this.actions$
    .ofType(areas.AreaActionTypes.AREA_LIST_TYPE)
    .map((action: areas.AreaListBySubject) => action.payload)
    .switchMap((id) => this.svc.getAreaListByType(id))
    .map(res =>   new areas.AreaListTypeSuccess(res))
    .catch((err) => Observable.of(new areas.AreaListActionFailed(err)));

  @Effect()
  areaListTypeSubjectEffect$: Observable<Action> = this.actions$
    .ofType(areas.AreaActionTypes.AREA_LIST_TYPE_SUBJECT)
    .map((action: areas.AreaListByTypeSubject) => action.payload)
    .switchMap((payload) => this.svc.getAreaListByTypeSubject(payload.typeId, payload.subjectId))
    .map(res =>  new areas.AreaListTypeSubjectSuccess(res))
    .catch((err) => Observable.of(new areas.AreaListActionFailed(err)));

  // TODO: Tagger is built to return an array of areas.  This version of the Commons assumes one. Should Tagger change?
  @Effect()
  areaInfoEffect$: Observable<Action> = this.actions$
    .ofType(areas.AreaActionTypes.AREA_INFORMATION)
    .map((action: areas.AreaInformation) => action.payload)
    .switchMap(id => this.svc.getAreaInfo(id))
    .map(res => new areas.AreaInformationSuccess(res[0]) )
    .catch((err) => Observable.of(new areas.AreaListActionFailed(err)));

}


