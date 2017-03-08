/**
 * Created by mspalti on 2/22/17.
 */
/**
 * Created by mspalti on 2/21/17.
 */

import { Action } from "@ngrx/store";
import { type } from "../shared/ngrx/type";
import {CollectionType} from "../shared/data-types/collection.type";


export const CollectionActionTypes = {
  LIST_BY_AREA: type('[Collections] Search by AreaType'),
  LIST_AREA_SUBJECT: type('[Collections] Search by SubjectType'),
  LIST_BY_AREA_SUCCESS: type('[Collections] AreaType Collections'),
  LIST_BY_SUBJECT_SUCCESS: type('[Collections] SubjectType Collections'),
  REQUEST_FAILED: type('[Collections] Search Failed')

};

export class CollectionAction implements Action {
  type = CollectionActionTypes.LIST_BY_AREA;

  constructor(public payload: string) {
  }

}

export class CollectionSubjectAction implements Action {
  type = CollectionActionTypes.LIST_AREA_SUBJECT;
  payload: {
    id: string;
    areaId: string;
  };


  constructor(public id: string, public areaId: string) {
    this.payload = {
      id: id,
      areaId: areaId
    }
  }
}

export class CollectionActionSuccess implements Action {
  type = CollectionActionTypes.LIST_BY_AREA_SUCCESS;
  payload: CollectionType[];

  constructor(searchResult: CollectionType[]) {
    this.payload = searchResult;
  }

}

export class CollectionSubjectActionSuccess implements Action {
  type = CollectionActionTypes.LIST_BY_SUBJECT_SUCCESS;
  payload: CollectionType[];

  constructor(searchResult: CollectionType[]) {
    this.payload = searchResult;
  }

}

export class CollectionActionFailed implements Action {
  type = CollectionActionTypes.REQUEST_FAILED;

  constructor(err) {
    console.log(err)
  }

}


export type CollectionActions = CollectionAction | CollectionSubjectAction | CollectionActionSuccess | CollectionSubjectActionSuccess | CollectionActionFailed;
