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

import {AuthType} from '../shared/data-types/auth.type';
import {GetAuthStatus, SetAuthStatus} from '../actions/auth.action';
import {getAuthStatus, reducer} from './auth.reducers';

const mockAuthStatus: AuthType = {
    auth: true

};
const mockCurrentAuthState: AuthType = {
    auth: false

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
    const state = reducer(undefined,  {type: undefined, payload: undefined});
    const result = getAuthStatus(state);
    expect(result).toEqual(mockCurrentAuthState);
  });

});
