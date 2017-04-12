import {getItem, reducer} from "./item.reducers";
import {ItemRequest, ItemSuccess} from "../actions/item.actions";
import {Action} from "@ngrx/store";
import {ItemTypesInterface} from "../shared/data-types/item.type";
/**
 * Created by mspalti on 3/24/17.
 */

const initializeItem = {
  collection: {
    id: 0,
    title: '',
    image: '',
    url: '',
    desc: '',
    dates: '',
    items: '',
    linkOptions: '',
    searchOptions: '',
    assetType: '',
    restricted: false,
    published: false
  },
  category: {
    id: 0,
    title: '',
    linkLabel: '',
    url: '',
    secondaryUrl: '',
    description: '',
    areaId: ''
  },
  itemTypes: [{
      id: 0,
      name: '',
      icon: ''
    }],
  subjects: [1]
};

const itemMock = {
  collection: {
    id: 0,
    title: '',
    image: '',
    url: '',
    desc: '',
    dates: '',
    items: '',
    linkOptions: '',
    searchOptions: '',
    assetType: '',
    restricted: false,
    published: false
  },
  category: {
    id: 1,
    title: 'test category',
    linkLabel: '',
    url: '',
    secondaryUrl: '',
    description: '',
    areaId: ''
  },
  itemTypes: [{
    id: 0,
    name: 'test item type',
    icon: ''
  }],
  subjects: [1]
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
