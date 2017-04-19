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
