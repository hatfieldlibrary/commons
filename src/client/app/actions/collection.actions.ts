/**
 * Created by mspalti on 2/22/17.
 */

import {Action} from "@ngrx/store";
import {type} from "../shared/ngrx/type";
import {CollectionType} from "../shared/data-types/collection.type";
import {RelatedType} from "../shared/data-types/related-collection";

export interface IdentifersPayload {
  id: string,
  areaId: string
}

export const CollectionActionTypes = {
  LIST_ALL_ACTION: type('[Collections] List all Collections'),
  LIST_ALL_SUCCESS_ACTION: type('[Collections] List all Collections Success'),
  LIST_BY_AREA: type('[Collections] Search by AreaType'),
  LIST_BY_AREA_SUCCESS: type('[Collections] AreaType Collections'),
  LIST_BY_AREA_SUBJECT: type('[Collections] Search by SubjectType'),
  LIST_BY_AREA_SUBJECT_SUCCESS: type('[Collections] SubjectType Collections'),
  LIST_ALL_BY_SUBJECT: type('[Collections] All Collections by Subject'),
  LIST_ALL_BY_SUBJECT_SUCCESS: type('[Collections] All Collections by Subject Success'),
  REQUEST_FAILED: type('[Collections] Search Failed')

};

export class CollectionAction implements Action {
  type = CollectionActionTypes.LIST_BY_AREA;

  constructor(public payload: string) {
    this.payload = payload;
  }

}

export class AllCollectionsAction implements Action {
  type = CollectionActionTypes.LIST_ALL_ACTION;

  constructor() {}

}
export class AllCollectionsActionSuccess implements Action {
  type = CollectionActionTypes.LIST_ALL_SUCCESS_ACTION;

  constructor(public payload: CollectionType[]) {
  }

}

export class CollectionActionSuccess implements Action {
  type = CollectionActionTypes.LIST_BY_AREA_SUCCESS;
  payload: CollectionType[];

  constructor(searchResult: CollectionType[]) {
    this.payload = searchResult;
  }

}

export class CollectionSubjectAction implements Action {
  type = CollectionActionTypes.LIST_BY_AREA_SUBJECT;
  payload: IdentifersPayload;

  constructor(public id: string, public areaId: string) {
    this.payload = {
      id: id,
      areaId: areaId
    }
  }
}

export class CollectionSubjectActionSuccess implements Action {
  type = CollectionActionTypes.LIST_BY_AREA_SUBJECT_SUCCESS;
  payload: CollectionType[];

  constructor(searchResult: CollectionType[]) {
    this.payload = searchResult;
  }

}

export class AllCollectionSubjectAction implements Action {
  type = CollectionActionTypes.LIST_ALL_BY_SUBJECT;

  constructor(public payload: string) {

  }
}

export class AllCollectionSubjectActionSuccess implements Action {
  type = CollectionActionTypes.LIST_ALL_BY_SUBJECT_SUCCESS;
  payload: CollectionType[];

  constructor(searchResult: CollectionType[]) {

    this.payload = searchResult;
  }

}

export class CollectionActionFailed implements Action {
  type = CollectionActionTypes.REQUEST_FAILED;
  payload: void;

  constructor(err: string) {
    console.log(err)
  }

}


export type CollectionActions = CollectionAction | CollectionSubjectAction | CollectionActionSuccess |
  CollectionSubjectActionSuccess | CollectionActionFailed;
