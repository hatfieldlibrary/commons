import {Injectable} from "@angular/core";
import {Actions, Effect} from "@ngrx/effects";
import * as areas from '../actions/area.actions';
import {Observable} from "rxjs";
import {AreaService} from '../services/area.service';
import {Action} from "@ngrx/store";

@Injectable()
export class AreaEffects {

  constructor(private svc: AreaService, private actions$: Actions) {
  }

  @Effect()
  areaListEffect$: Observable<Action> = this.actions$
    .ofType(areas.AreaActionTypes.AREA_LIST)
    .map((action: areas.AreaAction) => action.payload)
    .switchMap(() => this.svc.getAreaList())
    .map(res => new areas.AreaActionSuccess(res) )
    .catch((err) => Observable.of(new areas.AreaActionFailed(err)));

  @Effect()
  areaInfoEffect$: Observable<Action> = this.actions$
    .ofType(areas.AreaActionTypes.AREA_INFORMATION)
    .map((action: areas.AreaInformation) => action.payload)
    .switchMap(id => this.svc.getAreaInfo(id))
    .map(res => new areas.AreaInformationSuccess(res) )
    .catch((err) => Observable.of(new areas.AreaActionFailed(err)));

}


