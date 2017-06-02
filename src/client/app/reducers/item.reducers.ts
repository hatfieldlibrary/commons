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

import {ItemType} from "../shared/data-types/item.type";
import {ItemActions, ItemActionTypes} from "../actions/item.actions";
/**
 * Created by mspalti on 3/23/17.
 */

export interface State {
  item: ItemType;
  loading: boolean;
}

const initialState: State = {
    item: {
      collection: {
        id: 0,
        title: '',
        image: '',
        url: '',
        searchUrl: '',
        desc: '',
        dates: '',
        items: '',
        linkOptions: '',
        searchOptions: '',
        assetType: '',
        restricted: false,
        published: false
      },
      category: {
        id: 0,
        title: '',
        linkLabel: '',
        url: '',
        secondaryUrl: '',
        description: '',
        areaId: ''
      },
      itemTypes: [{
        id: 0,
        name: '',
        icon: ''

      }],
      subjects: []
    },
    loading: false
  }
;

export function reducer(state = initialState, action: ItemActions): State {

  switch (action.type) {

    case ItemActionTypes.ITEM_REQUEST: {
      return Object.assign({}, state, {
        loading: true
      });

    }

    case ItemActionTypes.ITEM_SUCCESS: {

      const result: ItemType = <ItemType>action.payload;
      return Object.assign({}, state, {
        item: result,
        loading: false
      });

    }

    case ItemActionTypes.REQUEST_FAILED: {
      return state;

    }

    default:
      return state;

  }
}

export const getItem = (state: State) => state.item;
