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

const initialCollection = {
  id: 0,
  title: '',
  image: '',
  url: '',
  searchUrl: '',
  description: '',
  date: '',
  items: '',
  linkOptions: '',
  searchOptions: '',
  assetType: '',
  restricted: false,
  published: false
};

const initialCategory = {
  id: 0,
  title: '',
  linkLabel: '',
  url: '',
  secondaryUrl: '',
  description: '',
  areaId: ''
};

const initialItemTypes = [{
  id: 0,
  name: '',
  icon: ''

}];

const initialState: State = {
    item: {
      collection: initialCollection,
      category: initialCategory,
      itemTypes: initialItemTypes,
      subjects: []
    },
    loading: false
  };



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

    case ItemActionTypes.ITEM_RESET: {
      return Object.assign({},  {
        item: {
          collection: initialCollection,
          category: initialCategory,
          itemTypes: initialItemTypes,
          subjects: []
        },
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
