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
 * Created by mspalti on 5/2/17.
 */
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


import { Action } from "@ngrx/store";
import { type } from "../shared/ngrx/type";
import {AreaType} from "../shared/data-types/area.type";
import {AreaListItemType} from "../shared/data-types/area-list.type";
import {AuthType} from "../shared/data-types/auth.type";

export const AuthActionTypes = {
  GET_AUTH_STATUS: type('[Auth] Get Auth Status'),
  SET_AUTH_STATUS: type('[Auth] Set Auth Status')
};


/**
 * Factory for the request all areaList action.
 */
export class GetAuthStatus implements Action {
  type = AuthActionTypes.GET_AUTH_STATUS;

  constructor(public payload: void) {
  }

}

/**
 * Factory for the areaList received action.
 */
export class SetAuthStatus implements Action {
  type = AuthActionTypes.SET_AUTH_STATUS;

  constructor(public payload: AuthType) {
  }
}

/**
 * Union type.
 */
export type AuthActions = GetAuthStatus | SetAuthStatus;
