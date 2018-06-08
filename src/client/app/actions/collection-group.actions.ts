

import {type} from '../shared/ngrx/type';
import {Action} from './action.interface';
import {CollectionGroupType} from '../shared/data-types/collection-group-type';

export const GroupActionTypes = {

  ALL_GROUP_REQUEST: type('[Group] Request Group.'),
  ALL_GROUP_REQUEST_SUCCESS: type('[Group] Request Group Success.'),
  GROUP_SUCCESS: type('[Group] Group Request Response'),
  REQUEST_FAILED: type('[Group] Request Failed'),
  GROUP_LIST_RESET: type('[Group] Reset the Group List to Empty'),

};


export class GroupsReset implements Action {
  type = GroupActionTypes.GROUP_LIST_RESET;
  payload: void;
  constructor() {}
}

export class AllGroupsAction implements Action {
  type = GroupActionTypes.ALL_GROUP_REQUEST;
  payload: void;
  constructor() {}

}

export class AllGroupsActionSuccess implements Action {
  type = GroupActionTypes.ALL_GROUP_REQUEST_SUCCESS;
  constructor(public payload: CollectionGroupType[]) {
  }

}

export class GroupActionFailed implements Action {
  type = GroupActionTypes.REQUEST_FAILED;
  payload: void;
  constructor(err: string) {
    console.log(err)
  }

}

