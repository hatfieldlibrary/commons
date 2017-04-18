import {AreaListItemType} from "../shared/data-types/area-list.type";
import {AreaActions, AreaActionTypes} from "../actions/area.actions";
/**
 * Created by mspalti on 4/11/17.
 */


export interface State {
  areaList: AreaListItemType[];
  loading: boolean;

}

const initialState: State = {
  areaList: <AreaListItemType[]>[
    {
      id: 0,
      title: '',
      count: 0
    }
  ],
  loading: false
};


export function reducer(state = initialState, action: AreaActions): State {

  switch (action.type) {


    case AreaActionTypes.AREA_LIST: {
      return Object.assign({}, state, {
        areaList: [],
        loading: true
      });

    }

    case AreaActionTypes.AREA_LIST_SUCCESS: {

      const result: AreaListItemType[] = <AreaListItemType[]>action.payload;
      return Object.assign({}, state, {
        areaList: result,
        loading: false
      });

    }

    default:
      return state;
  }
}

export const getAreaList = (state: State) => state.areaList;
