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

import {AuthType} from "../shared/data-types/auth.type";
import {GetAuthStatus, SetAuthStatus} from "../actions/auth.action";
import {getAuthStatus, reducer} from "./auth.reducers";

const mockAuthStatus: AuthType = {
    status: true

};
const mockCurrentAuthState: AuthType = {
    status: false

};

describe('Authentication Status Reducer', () => {

  it('should return the current auth status.', () => {
    expect(
      reducer(undefined, new GetAuthStatus())
    ).toEqual(
      {
        auth: mockCurrentAuthState
      })
  });

  it('should set the auth status', () => {

    expect(
      reducer(undefined, new SetAuthStatus(mockAuthStatus))
    ).toEqual({
      auth: mockAuthStatus
    });

  });

  it('should return default state', () => {
    let state = reducer(undefined,  {type: undefined, payload: undefined});
    let result = getAuthStatus(state);
    expect(result).toEqual(mockCurrentAuthState);
  });

});
