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

/**
 * Created by mspalti on 2/24/17.
 */
import {AreaActions, AreaActionTypes} from '../actions/area.actions';
import {AreaType} from '../shared/data-types/area.type';

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
