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

@Injectable()
export class AreaEffects {

  constructor(private svc: AreaService, private actions$: Actions) {
  }

  @Effect()
  areaListEffect$: Observable<Action> = this.actions$
    .ofType(areas.AreaActionTypes.AREA_LIST)
    .map((action: areas.AreaAction) => action.payload)
    .switchMap(() => this.svc.getAreaList())
    .map(res => { console.log(res); return new areas.AreaActionSuccess(res) })
    .catch((err) => Observable.of(new areas.AreaActionFailed(err)));

  @Effect()
  areaInfoEffect$: Observable<Action> = this.actions$
    .ofType(areas.AreaActionTypes.AREA_INFORMATION)
    .map((action: areas.AreaInformation) => action.payload)
    .switchMap(id => this.svc.getAreaInfo(id))
    .map(res => new areas.AreaInformationSuccess(res) )
    .catch((err) => Observable.of(new areas.AreaActionFailed(err)));

}


