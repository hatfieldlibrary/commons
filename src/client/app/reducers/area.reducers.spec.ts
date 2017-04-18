import {getAreaInfo, reducer, State} from './area.reducers';
import {
  AreaAction, AreaActionSuccess, AreaInformation, AreaInformationSuccess
} from '../actions/area.actions';
import {Action} from '@ngrx/store';
import {AreaType} from '../shared/data-types/area.type';
/**
 * Created by mspalti on 3/24/17.
 */

const areaListTypeMock = [
  {
    id: 1,
    title: 'test area one',
    count: 2

  }, {
    id: 2,
    title: 'test area tw0',
    count: 1
  }
];

const areaMock = {
  id: 1,
  title:  'Archival Collections',
  linkLabel:  'Area Button Label',
  url:  'Area URL',
  searchUrl:  'Area Search URL',
  description:  'Description Two.',
  position: 2

};

const initialState = {
    id: 0,
    title: '',
    linkLabel: '',
    url: '',
    searchUrl: '',
    description: '',
    position: 0
};

class MockAction implements Action {
  type: string = '';
  payload: any;

}

describe('Area Reducer', () => {

  // it('should return the initial state and loading true.', () => {
  //   expect(
  //     reducer(undefined, new AreaAction('1'))
  //   ).toEqual(
  //     {
  //       area: <AreaType>{},
  //       loading: true
  //     })
  // });

  // it('should return state with area list', () => {
  //   expect(
  //     reducer(undefined, new AreaActionSuccess(areaListTypeMock))
  //   ).toEqual(
  //     {
  //       area: areaMock,
  //       loading: false
  //     })
  // });

  it('should return state with area information', () => {
    expect(
      reducer(undefined, new AreaInformation('1'))
    ).toEqual(
      {
        area: initialState,
        loading: true
      })
  });

  it('should return the current state', () => {
    let areaState: State = {area: areaMock, loading: false};

    expect(
      reducer(areaState, new MockAction())
    ).toEqual(
      {
        area: areaMock,
        loading: false
      })
  });

  it('should return state with updated area information', () => {

    let areaState: State = {area: areaMock, loading: true};
    expect(
      reducer(areaState, new AreaInformationSuccess(areaMock))
    ).toEqual(
      {
        area: areaMock,
        loading: false
      })
  });


});
