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
 * Created by mspalti on 4/19/17.
 */
import { reducer} from "./related.reducers";
import {ClearRelatedItems, ItemActionRelated, ItemActionRelatedSuccess} from "../actions/item.actions";

import {getRelatedList} from "./related.reducers";


const relatedItemMock = {

  id: 1,
  title: 'related collection',
  image: ''

};


describe('Related Item Reducers', () => {

  it('should return the initial state and loading true.', () => {
    expect(
      reducer(undefined, new ItemActionRelated('1', '1,2'))
    ).toEqual({
        related: [],
        loading: true
      }
    )
  });

  it('should clear the related item list.', () => {
    expect(
      reducer(undefined, new ClearRelatedItems())
    ).toEqual({
        related: [],
        loading: false
      }
    )
  });

  it('should return related items', () => {
    expect(
      reducer(undefined, new ItemActionRelatedSuccess([relatedItemMock]))
    ).toEqual(
      {
        related: [relatedItemMock],
        loading: false
      })
  });

  it('should return item  information', () => {

    let state = reducer(undefined, new ItemActionRelatedSuccess([relatedItemMock]));
    let result = getRelatedList(state);
    expect(result).toEqual([relatedItemMock]);
  });

});