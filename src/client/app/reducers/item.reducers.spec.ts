import {getItem, reducer} from "./item.reducers";
import {ItemRequest, ItemSuccess} from "../actions/item.actions";
import {Action} from "@ngrx/store";
/**
 * Created by mspalti on 3/24/17.
 */

const initializeItem = {
  collection: {
    id: '',
    title: '',
    url: '',
    desc: '',
    browseType: '',
    image: '',
    dates: '',
    ctype: '',
    repoType: '',
    restricted: false,
    published: false,
    createdAt: '',
    updatedAt: ''
  },
  categories: {
    id: 0,
    title: '',
    linkLabel: '',
    url: '',
    secondaryUrl: '',
    description: '',
    areaId: '',
    createdAt: '',
    updatedAt: ''
  },
  itemTypes: [{
    id: 0,
    name: '',
    icon: '',
    createdAt: '',
    updatedAt: ''

  }]
};

const itemMock = {
  collection: {
    id: '1',
    title: 'test collection',
    url: '',
    desc: '',
    browseType: '',
    image: '',
    dates: '',
    ctype: '',
    repoType: '',
    restricted: false,
    published: false,
    createdAt: '',
    updatedAt: ''
  },
  categories: {
    id: 1,
    title: 'test category',
    linkLabel: '',
    url: '',
    secondaryUrl: '',
    description: '',
    areaId: '',
    createdAt: '',
    updatedAt: ''
  },
  itemTypes: [{
    id: 1,
    name: 'test type',
    icon: '',
    createdAt: '',
    updatedAt: ''
  }]
};

class MockAction implements Action {
  type: string = '';
  payload: any;

}


describe('Item Reducers', () => {

  it('should return the initial state and loading true.', () => {
    expect(
      reducer(undefined, new ItemRequest('1'))
    ).toEqual({
        item: initializeItem,
        loading: true
      }
    )
  });

  it('should return the initial state and loading true.', () => {
    expect(
      reducer(undefined, new ItemSuccess(itemMock))
    ).toEqual({
        item: itemMock,
        loading: false
      }
    )
  });

  it('should return the current state if action not found', () => {
    expect(
      reducer(undefined, new MockAction())
    ).toEqual(
      {
        item: initializeItem,
        loading: false
      })
  });

  it('should return item  information', () => {

    let state = reducer(undefined, new ItemSuccess(itemMock));
    let result = getItem(state);
    expect(result).toEqual(itemMock);
  });

});
