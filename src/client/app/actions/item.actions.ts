/*
 * Copyright (c) [2018] [Willamette University]
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * Author: Michael Spalti
 */

import {type} from '../shared/ngrx/type';
import {Action} from './action.interface';
import {ItemType} from '../shared/data-types/item.type';

export const ItemActionTypes = {

  ITEM_REQUEST: type('[Item] Request Item.'),
  ITEM_SUCCESS: type('[Item] Item Request Response'),
  ITEM_RESET: type('[Item] Item Reset'),
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
    if (err !== 'test') {
      console.log(err);
    }
  }
}

export class ItemReset implements Action {
  type = ItemActionTypes.ITEM_RESET;
  payload: void;
  constructor() {}
}

export type ItemActions =
  ItemRequest |
  ItemSuccess |
  ItemReset |
  ItemRequestFailed;
