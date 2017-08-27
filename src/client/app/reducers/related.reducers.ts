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

import {RelatedType} from '../shared/data-types/related-collection';
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
