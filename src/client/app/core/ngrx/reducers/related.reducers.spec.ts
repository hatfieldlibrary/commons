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
 * Created by mspalti on 4/19/17.
 */
import { reducer} from './related.reducers';
import {ClearRelatedItems, ItemActionRelated, ItemActionRelatedSuccess} from '../actions/related.actions';

import {getRelatedList} from './related.reducers';


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
      });
  });

  it('should return item  information', () => {

    const state = reducer(undefined, new ItemActionRelatedSuccess([relatedItemMock]));
    const result = getRelatedList(state);
    expect(result).toEqual([relatedItemMock]);
  });


  it('should return default state', () => {
    expect(
      reducer(undefined, {type: undefined, payload: undefined})
    ).toEqual({
      related: [],
      loading: false
    })

  });

});
