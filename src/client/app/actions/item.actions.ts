/*
 * Copyright (c) 2017.
 *
 *   This program is free software: you can redistribute it and/or modify
 *    it under the terms of the GNU General Public License as published by
 *    the Free Software Foundation, either version 3 of the License, or
 *    (at your option) any later version.
 *
 *    This program is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU General Public License for more details.
 *
 *   You should have received a copy of the GNU General Public License
 *    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import {type} from "../shared/ngrx/type";
import {Action} from "@ngrx/store";
import {ItemType} from "../shared/data-types/item.type";
import {RelatedType} from "../shared/data-types/related-collection";

export const ItemActionTypes = {

  ITEM_REQUEST: type('[Item] Request Item.'),
  ITEM_SUCCESS: type('[Item] Item Request Response'),
  ITEM_RESET: type('[Item] Item Reset'),
  RELATED_COLLECTIONS: type('[Item] Find Related Collections'),
  RELATED_COLLECTIONS_SUCCESS: type('[Item] Related Collections'),
  CLEAR_RELATED_COLLECTIONS: type('[Item] Clear Related Collections'),
  REQUEST_FAILED: type('[Item] Request Failed'),
  SET_CURRENT_IMAGE: type('[Item] Set Current Image'),
  GET_PREVIOUS_IMAGE: type('[Item] Get Previous Image')

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

  constructor(err: string) {
    console.log(err)
  }
}

export class ItemReset implements Action {
  type = ItemActionTypes.ITEM_RESET;
  payload: void;
  constructor() {}
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

export class ItemActionRelatedSuccess implements Action {
  type = ItemActionTypes.RELATED_COLLECTIONS_SUCCESS;

  constructor(public payload: RelatedType[]) {
  }

}

export class ClearRelatedItems implements Action {
  type = ItemActionTypes.CLEAR_RELATED_COLLECTIONS;
  payload: void;

  constructor() {
  }
}


export type ItemActions =
  ItemRequest |
  ItemSuccess |
  ItemReset |
  ItemActionRelated |
  ItemActionRelatedSuccess |
  ItemRequestFailed ;
