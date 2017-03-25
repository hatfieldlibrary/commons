import {Action} from "@ngrx/store";
import {getCollectionList, reducer, State} from "./collection.reducers";
import {
  CollectionAction, CollectionActionFailed, CollectionActionSuccess, CollectionSubjectAction,
  CollectionSubjectActionSuccess
} from "../actions/collection.actions";
/**
 * Created by mspalti on 3/24/17.
 */

const collectionListMock = [
  {
    id: 1,
    title: 'test title',
    image: 'image',
    url: 'url',
    browseType: '',
    description: '',
    dates: '',
    items: '',
    ctype: '',
    repoType: '',
    restricted: true,
    published: false,
    createdAt: '',
    updatedAt: '',
    AreaId: 1,
    CollectionId: 1
  }
];

class MockAction implements Action {
  type: string = '';
  payload: any;

}

describe('Collection Reducer', () => {

  it('should return the initial state and loading true.', () => {
    expect(
      reducer(undefined, new CollectionAction('1'))
    ).toEqual(
      {
        collections: [],
        loading: true
      })
  });

  it('should return the current state if action not found', () => {
    expect(
      reducer(undefined, new MockAction())
    ).toEqual(
      {
        collections: [],
        loading: false
      })
  });

  it('should return the collection list for area.', () => {
    expect(
      reducer(undefined, new CollectionActionSuccess(collectionListMock))
    ).toEqual(
      {
        collections: collectionListMock,
        loading: false
      })
  });

  it('should request collection list for area and subject.', () => {
    expect(
      reducer(undefined, new CollectionSubjectAction('1', '1'))
    ).toEqual(
      {
        collections: [],
        loading: true
      })
  });

  it('should return the collection list for area and subject.', () => {
    expect(
      reducer(undefined, new CollectionSubjectActionSuccess(collectionListMock))
    ).toEqual(
      {
        collections: collectionListMock,
        loading: false
      })
  });

  it('should return current state on request failure', () => {
    let collectionState: State = {collections: collectionListMock, loading: false};
    expect(
      reducer(collectionState, new CollectionActionFailed('error'))
    ).toEqual(
      {
        collections: collectionListMock,
        loading: false
      })
  });

  it('should return current state if no area id is provided', () => {
    let collectionState: State = {collections: collectionListMock, loading: false};
    expect(
      reducer(collectionState, new CollectionAction(''))
    ).toEqual(
      {
        collections: [],
        loading: false
      })
  });

  it('should return current state if either area or subject id is missing.', () => {
    let collectionState: State = {collections: collectionListMock, loading: false};
    expect(
      reducer(collectionState, new CollectionSubjectAction('', '1'))
    ).toEqual(
      {
        collections: [],
        loading: false
      })
  });

  it('should return collection list information', () => {

    let state = reducer(undefined, new CollectionActionSuccess(collectionListMock));
    let result = getCollectionList(state);
    expect(result).toEqual(collectionListMock);
  });

});
