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

import {ItemType} from '../../data-types/item.type';
import {ItemActions, ItemActionTypes} from '../actions/item.actions';
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
  published: false,
  parent: []
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
