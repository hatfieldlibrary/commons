import {type} from "../shared/ngrx/type";
import {Action} from "@ngrx/store";
import {ItemType} from "../shared/data-types/item.type";
import {RelatedType} from "../shared/data-types/related-collection";

export const ItemActionTypes = {

  ITEM_REQUEST: type('[Item] Request Item.'),
  ITEM_SUCCESS: type('[Item] Item Request Response'),
  RELATED_COLLECTIONS: type('[Item] Find Related Collections'),
  RELATED_COLLECTIONS_SUCCESS: type('[Item] Related Collections'),
  CLEAR_RELATED_COLLECTIONS: type('[Item] Clear Related Collections'),
  REQUEST_FAILED: type('[Item] Request Failed')

};

export class ItemRequest implements Action {
  type = ItemActionTypes.ITEM_REQUEST;

  constructor(public payload: string) {
  }

}

export class ItemSuccess implements Action {
  type = ItemActionTypes.ITEM_SUCCESS;
  payload: ItemType;

  constructor(item: ItemType) {
    this.payload = item;

  }
}

export class ItemRequestFailed implements Action {
  type = ItemActionTypes.REQUEST_FAILED;
  payload: void;

  constructor(err:string) {
    console.log(err)
  }
}


export class ItemActionRelated implements Action {
  type = ItemActionTypes.RELATED_COLLECTIONS;
  payload;

  constructor(id: string, subjectIds: string) {
    this.payload = {
      id: id,
      subjectIds: subjectIds
    }
  }

}

export class ClearRelatedItems implements Action {
  type = ItemActionTypes.CLEAR_RELATED_COLLECTIONS;
  constructor() {}
}

export class ItemActionRelatedSuccess implements Action {
  type = ItemActionTypes.RELATED_COLLECTIONS_SUCCESS;
  payload: RelatedType[];

  constructor(related: RelatedType[]) {
    this.payload = related;
  }

}


export type ItemActions = ItemRequest | ItemSuccess | ItemActionRelated | ItemActionRelatedSuccess | ItemRequestFailed;
