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

import {type} from './type';

describe ('ngrx action type checking', () => {
  const testLabel = '[test label] one';

  it('should return the unique label', () => {
    expect(type(testLabel)).toEqual(testLabel);

  });

  it('should throw error for duplicate label', () =>{
    expect(() => { type(testLabel) }).toThrowError('Action type "[test label] one" is not unique');
  });

});
