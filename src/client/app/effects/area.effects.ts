/**
 * Created by mspalti on 2/24/17.
 */
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
  areasEffect$: Observable<Action> = this.actions$
    .ofType(areas.AreaActionTypes.AREA_LIST)
    .switchMap(id => this.svc.getAreas())
    .map(res => new areas.AreaActionSuccess(res))
    .catch((err) => Observable.of(new areas.AreaActionFailed(err)));
}
