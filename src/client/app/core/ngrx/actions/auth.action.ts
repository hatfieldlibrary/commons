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
 * Created by mspalti on 5/2/17.
 */


import {Action} from './action.interface';
import { type } from '../type';
import {AuthType} from '../../data-types/auth.type';

export const AuthActionTypes = {
  GET_AUTH_STATUS: type('[Auth] Get Auth Status'),
  SET_AUTH_STATUS: type('[Auth] Set Auth Status')
};


/**
 * Factory for authentication check action.
 */
export class GetAuthStatus implements Action {
  type = AuthActionTypes.GET_AUTH_STATUS;
  payload: void;

  constructor() {
  }

}

/**
 * Factory for the authentication response.
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
