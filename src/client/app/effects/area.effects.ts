/**
 * Created by mspalti on 2/24/17.
 */
import {Injectable} from "@angular/core";
import {Actions, Effect} from "@ngrx/effects";
import * as areas from '../actions/area.actions';
import {Observable} from "rxjs";
import {AreaService} from '../services/area.service';
import {Action} from "@ngrx/store";
import {AreaInformation} from "../actions/area.actions";
import {Store} from "@ngrx/store";
import * as fromRoot from '../reducers';

@Injectable()
export class AreaEffects {

  constructor(private svc: AreaService, private actions$: Actions, private store$: Store<fromRoot.State>) {
  }

  @Effect()
  areasEffect$: Observable<Action> = this.actions$
    .ofType(areas.AreaActionTypes.AREA_LIST)
    .map((action: areas.AreaAction) => action.payload)
    .switchMap(id => this.svc.getAreas(id))
    .mergeMap(res => {
      const id: string = res.area;
      return Observable.from([new AreaInformation(res.response, id)])
    })
    .catch((err) => Observable.of(new areas.AreaActionFailed(err)));

  /**
   * This handles the potential problem of the state being undefined.  This might
   * happen at component initialization. During initialization, the AREA_INFORMATION_UPDATE
   * action redundant. The component nevertheless dispatches the action, and that might
   * lead to problems if the the areas are not already available in the store.
   * @type {"../../Observable".Observable<R>}
   */
  @Effect()
  areaUpdate: Observable<Action> = this.actions$
    .ofType(areas.AreaActionTypes.AREA_INFORMATION_UPDATE)
    .withLatestFrom(this.store$)
    .filter(([payload, state]) => state.areas == null)
    .map(res => new areas.AreaActionFailed('null area list'))

}
