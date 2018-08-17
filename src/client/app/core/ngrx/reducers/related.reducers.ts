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

import {RelatedType} from '../../data-types/related-collection';
import {RelatedItemActions, RelatedItemActionTypes} from '../actions/related.actions';

export interface State {
  related: RelatedType[];
  loading: boolean;

}

const initialState: State = {
  related: [],
  loading: false
};

export function reducer(state = initialState, action: RelatedItemActions): State {
  switch (action.type) {

    case RelatedItemActionTypes.RELATED_COLLECTIONS: {
      return Object.assign({}, state, {
        loading: true
      });

    }

    case RelatedItemActionTypes.RELATED_COLLECTIONS_SUCCESS: {

      const result: RelatedType[] = <RelatedType[]>action.payload;
      return Object.assign({}, state, {
        related: result,
        loading: false
      });

    }

    case RelatedItemActionTypes.CLEAR_RELATED_COLLECTIONS: {

      return Object.assign({}, state, {
        related: [],
        loading: false
      });
    }

    default:
      return state;

  }

}

export const getRelatedList = (state: State) => state.related;
