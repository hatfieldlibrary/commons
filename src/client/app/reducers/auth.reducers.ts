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

import {AuthActions, AuthActionTypes} from "../actions/auth.action";
import {AuthType} from "../shared/data-types/auth.type";
/**
 * Created by mspalti on 5/2/17.
 */
export interface State {
  auth:  {
    status: boolean
  }
}

const initialState: State = {
  auth:  {
    status: false
  }

};

export function reducer(state = initialState, action: AuthActions): State {
  switch (action.type) {

    case AuthActionTypes.GET_AUTH_STATUS: {
      return state;

    }

    case AuthActionTypes.SET_AUTH_STATUS: {
      const result: AuthType = <AuthType>action.payload;
      return Object.assign({}, state, {auth: result }
      );

    }

    default:
      return state;

  }

}

export const getAuthStatus = (state: State) => state.auth;
