import {AreaType} from "../shared/data-types/area.type";
import {AreaAction, AreaActionSuccess} from "../actions/area.actions";
import {getAreaList, reducer, State} from "./area-list.reducers";
/**
 * Created by mspalti on 4/15/17.
 */


const areaListTypeMock = [
  {
    id: 1,
    title: 'test area one',
    count: 2

  }, {
    id: 2,
    title: 'test area two',
    count: 1
  }
];

describe('Area List Reducer', () => {

  it('should return the initial area list state and loading true.', () => {
      expect(
        reducer(undefined, new AreaAction('1'))
      ).toEqual(
        {
          areaList: [],
          loading: true
        })
    });

  it('should return area list', () => {

    let areaState: State = {areaList: areaListTypeMock, loading: true};
    let state = reducer(areaState, new AreaActionSuccess(areaListTypeMock));
    let result = getAreaList(state);
    expect(result).toEqual(areaListTypeMock);
  });


});
