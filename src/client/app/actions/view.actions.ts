import {type} from '../shared/ngrx/type';
import {Action} from './action.interface';

export const ViewActionType = {
  VIEW_ACTION: type('[VIEW] Setting view type')
};

export class SetViewAction implements Action {
  type = ViewActionType.VIEW_ACTION;
  constructor(public payload: string) {
  }

}

export type ViewActions = SetViewAction;
