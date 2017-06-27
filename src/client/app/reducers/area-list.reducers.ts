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

import {AreaListItemType} from "../shared/data-types/area-list.type";
import {AreaActions, AreaActionTypes} from "../actions/area.actions";
/**
 * Created by mspalti on 4/11/17.
 */


export interface State {
  areaList: AreaListItemType[];
  loading: boolean;

}

const initialState: State = {
  areaList: <AreaListItemType[]>[
    {
      id: 0,
      title: '',
      count: 0
    }
  ],
  loading: false
};


export function reducer(state = initialState, action: AreaActions): State {

  switch (action.type) {


    case AreaActionTypes.AREA_LIST: {
      return Object.assign({}, state, {
        areaList: initialState.areaList,
        loading: true
      });

    }

    case AreaActionTypes.AREA_LIST_SUCCESS: {

      const result: AreaListItemType[] = <AreaListItemType[]>action.payload;
      return Object.assign({}, state, {
        areaList: result,
        loading: false
      });

    }

    default:
      return state;
  }
}

export const getAreaList = (state: State) => state.areaList;