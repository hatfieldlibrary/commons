

import {type} from '../shared/ngrx/type';
import {Action} from '@ngrx/store';
import {RelatedType} from '../shared/data-types/related-collection';

export const RelatedItemActionTypes = {
  RELATED_COLLECTIONS: type('[Related] Find Related Collections'),
  RELATED_COLLECTIONS_SUCCESS: type('[Related] Related Collections'),
  CLEAR_RELATED_COLLECTIONS: type('[Related] Clear Related Collections'),
  REQUEST_FAILED: type('[Related] Request Failed'),
};

export class ItemActionRelated implements Action {
  type = RelatedItemActionTypes.RELATED_COLLECTIONS;
  payload;

  constructor(id: string, subjectIds: string) {
    this.payload = {
      id: id,
      subjectIds: subjectIds
    };
  }
}

export class ItemActionRelatedSuccess implements Action {
  type = RelatedItemActionTypes.RELATED_COLLECTIONS_SUCCESS;

  constructor(public payload: RelatedType[]) {
  }
}

export class ClearRelatedItems implements Action {
  type = RelatedItemActionTypes.CLEAR_RELATED_COLLECTIONS;
  payload: void;

  constructor() {
  }
}
export class RelatedItemRequestFailed implements Action {
  type = RelatedItemActionTypes.REQUEST_FAILED;
  payload: void;

  constructor(err: string) {
    console.log(err);
  }
}

export type RelatedItemActions =

  ItemActionRelated |
  ItemActionRelatedSuccess |
  ClearRelatedItems;
