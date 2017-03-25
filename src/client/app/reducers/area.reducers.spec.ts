
import {getAreaInfo, getAreaList, reducer, State} from "./area.reducers";
import {
  AreaAction, AreaActionSuccess, AreaInformation, AreaInformationUpdate} from "../actions/area.actions";
import {Action} from "@ngrx/store";
/**
 * Created by mspalti on 3/24/17.
 */

const areaTypeMock = [
  {
    id: 1,
    title: 'test',
    linkLabel: 'link',
    url: 'url',
    searchUrl: '',
    description: 'description',
    position: 1
  },{
    id: 2,
    title: 'test 2',
    linkLabel: 'link',
    url: 'url',
    searchUrl: '',
    description: 'description',
    position: 1
  }
];

class MockAction implements Action {
  type: string = '';
  payload: any;

}

describe('Area Reducer', () => {

  it('should return the initial state and loading true.', () => {
    expect(
      reducer(undefined, new AreaAction('1'))
    ).toEqual(
      {
        areas: [],
        areaInfo: {},
        loading: true
      })
  });

  it('should return state with area list', () => {
    expect(
      reducer(undefined, new AreaActionSuccess(areaTypeMock))
    ).toEqual(
      {
        areas: areaTypeMock,
        areaInfo: {},
        loading: false
      })
  });

  it('should return state with area information', () => {
    expect(
      reducer(undefined, new AreaInformation(areaTypeMock, '1'))
    ).toEqual(
      {
        areas: areaTypeMock,
        areaInfo: areaTypeMock[0],
        loading: false
      })
  });

  it('should return the current state', () => {
    let areaState:State = {areas: areaTypeMock, areaInfo: areaTypeMock[0], loading: false};

    expect(
      reducer(areaState, new MockAction())
    ).toEqual(
      {
        areas: areaTypeMock,
        areaInfo: areaTypeMock[0],
        loading: false
      })
  });

  it('should return state with updated area information', () => {

    let areaState:State = {areas: areaTypeMock, areaInfo: areaTypeMock[0], loading: true};
    expect(
      reducer(areaState, new AreaInformationUpdate('2'))
    ).toEqual(
      {
        areas: areaTypeMock,
        areaInfo: areaTypeMock[1],
        loading: false
      })
  });

  it('should return area list', () => {

    let areaState:State = {areas: areaTypeMock, areaInfo: areaTypeMock[0], loading: true};
    let state = reducer(areaState, new AreaActionSuccess(areaTypeMock));
    let result = getAreaList(state);
    expect(result).toEqual(areaTypeMock);
  });

  it('should return area information', () => {

    let state = reducer(undefined, new AreaInformation(areaTypeMock, '1'));
    let result = getAreaInfo(state);
    expect(result).toEqual(areaTypeMock[0]);
  });

});
