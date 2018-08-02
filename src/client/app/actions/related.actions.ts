

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
    if (err !== 'test') {
      console.log(err);
    }
  }
}

export type RelatedItemActions =

  ItemActionRelated |
  ItemActionRelatedSuccess |
  ClearRelatedItems;
