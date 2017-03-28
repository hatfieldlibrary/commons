import {Injectable} from "@angular/core";
import {Actions, Effect} from "@ngrx/effects";
import * as areas from '../actions/area.actions';
import {Observable} from "rxjs";
import {AreaService} from '../services/area.service';
import {Action} from "@ngrx/store";
import {AreaInformation} from "../actions/area.actions";

@Injectable()
export class AreaEffects {

  constructor(private svc: AreaService, private actions$: Actions) {
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
}

