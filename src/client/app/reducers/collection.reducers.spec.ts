import {Action} from "@ngrx/store";
import {getCollectionList, reducer, State} from "./collection.reducers";
import {
  AllCollectionsActionSuccess,
  AllCollectionSubjectAction, AllCollectionSubjectActionSuccess,
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
    desc: '',
    dates: '',
    items: '',
    linkOptions: '',
    searchOptions: '',
    assetType: '',
    restricted: false,
    published: false
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

  it('should return current empty state if no area id is provided to CollectionAction', () => {
    let collectionState: State = {collections: collectionListMock, loading: false};
    expect(
      reducer(collectionState, new CollectionAction(''))
    ).toEqual(
      {
        collections: [],
        loading: false
      })
  });

  it('should return empty state if either area or subject id is missing in CollectionSubjectAction.', () => {
    let collectionState: State = {collections: collectionListMock, loading: false};
    expect(
      reducer(collectionState, new CollectionSubjectAction('', '1'))
    ).toEqual(
      {
        collections: [],
        loading: false
      })
  });

  it('should return collection for area list.', () => {

    let state = reducer(undefined, new CollectionActionSuccess(collectionListMock));
    let result = getCollectionList(state);
    expect(result).toEqual(collectionListMock);
  });

  it('should return list of all collections by subject (all areas).', () => {
    let collectionState: State = {collections: [], loading: true};
    expect(
      reducer(collectionState, new AllCollectionSubjectActionSuccess(collectionListMock))
    ).toEqual(
      {
        collections: collectionListMock,
        loading: false
      })

  });


  it('should return list of all collections .', () => {
    let collectionState: State = {collections: [], loading: true};
    expect(
      reducer(collectionState, new AllCollectionsActionSuccess(collectionListMock))
    ).toEqual(
      {
        collections: collectionListMock,
        loading: false
      })

  });

});
