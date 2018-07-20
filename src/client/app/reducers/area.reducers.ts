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

/**
 * Created by mspalti on 2/24/17.
 */
import {AreaActions, AreaActionTypes} from '../actions/area.actions';
import {AreaType} from '../shared/data-types/area.type';
import {AreaFilterType} from '../shared/data-types/area-filter.type';

export interface State {
  area: AreaType;
  loading: boolean;

}

const initialState: State = {
  area: <AreaType>{
    id: 0,
    title: '',
    linkLabel: '',
    url: '',
    searchUrl: '',
    image: '',
    description: '',
    position: 0
  },
  loading: false
};

export function reducer(state = initialState, action: AreaActions): State {

  switch (action.type) {

    case AreaActionTypes.AREA_INFORMATION: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case AreaActionTypes.AREA_INFORMATION_SUCCESS: {
      const payload = <AreaType>action.payload;

      return Object.assign({}, state,
        {
          area: payload,
          loading: false
        });
    }

    default:
      return state;

  }

}

export const getAreaInfo = (state: State) => state.area;
