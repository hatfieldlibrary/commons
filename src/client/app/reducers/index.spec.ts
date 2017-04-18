import {reducer} from "./";
import {SubjectActionSuccess} from "../actions/subject-actions";
import {getAreasState, getAreaListState, getCollectionssState, getItemState, getSubjectsState} from "./index";
import {ItemSuccess} from "../actions/item.actions";
import {AreaActionSuccess, AreaInformation, AreaInformationSuccess} from "../actions/area.actions";
import {CollectionActionSuccess} from "../actions/collection.actions";
import {AreaType} from "../shared/data-types/area.type";
import {AreaListItemType} from "../shared/data-types/area-list.type";
import {getAreaList} from "./area-list.reducers";

describe('Reducers ', () => {

  let subjectState;
  let itemState;
  let areaState;
  let areaListState;
  let collectionState;
  let areaInfoState;

  const expectedSubjects = [
    {
      id: 1,
      name: 'test subject',
      url: ''
    }
  ];

  const expectedAreas = [
    {
      id: 1,
      title: 'test',
      count: 2
    }, {
      id: 2,
      title: 'test 2',
      count: 1
    }
  ];

  const expectedItem = {
    collection: {
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

  const expectedCollections = [
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

  const expectedArea = {
    id: 1,
    title: 'Area One',
    linkLabel: '',
    url: '',
    searchUrl: '',
    description: '',
    position: 0
  } ;


  beforeEach(() => {
    subjectState = reducer(undefined, new SubjectActionSuccess(expectedSubjects));
    itemState = reducer(undefined, new ItemSuccess(expectedItem));
    areaState = reducer(undefined, new AreaInformationSuccess(expectedArea));
    areaListState = reducer(undefined, new AreaActionSuccess(expectedAreas)) ;
    collectionState = reducer(undefined, new CollectionActionSuccess(expectedCollections))

  });

  it('should return subject state', () => {

    let result = getSubjectsState(subjectState);
    expect(result).toEqual({
      subjects: expectedSubjects,
      loading: false
    });

  });

  it('should return item state.', () => {
    let result = getItemState(itemState);
    expect(result).toEqual({
      item: expectedItem,
      loading: false
    });

  });

  it('should return areaList state.', () => {
    let result = getAreaListState(areaListState);
    expect(result).toEqual({
      areaList: expectedAreas,
      loading: false
    });

  });

  it('should return collections state.', () => {
    let result = getCollectionssState(collectionState);
    expect(result).toEqual({
      collections: expectedCollections,
      loading: false
    });

  });


});
