import {Actions, Effect} from '@ngrx/effects';
import * as groups from '../actions/collection-group.actions';
import {Observable} from 'rxjs/Observable';
import {Action} from '../actions/action.interface';
import {Injectable} from '@angular/core';
import {CollectionGroupServices} from '../services/collection-group.services';


@Injectable()
export class CollectionGroupEffects {

  constructor(private svc: CollectionGroupServices, private actions$: Actions) {
  }

  @Effect()
  allGroupEffect$: Observable<Action> = this.actions$
    .ofType(groups.GroupActionTypes.ALL_GROUP_REQUEST)
    .switchMap(() => this.svc.getAllGroups())
    .map(res => new groups.AllGroupsActionSuccess(res))
    .catch((err) => Observable.of(new groups.GroupActionFailed(err)));

}
