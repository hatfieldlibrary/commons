import {type} from "../shared/ngrx/type";
import {Action} from "@ngrx/store";
import {ItemType} from "../shared/data-types/item.type";

export const ItemActionTypes = {

  ITEM_REQUEST: type('[ItemType] Request Item.'),
  ITEM_SUCCESS: type('[ItemType] Item Request Response'),
  REQUEST_FAILED: type('[ItemType] Request Failed')

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

export type ItemActions = ItemRequest | ItemSuccess | ItemRequestFailed;
