/**
 * Created by mspalti on 2/24/17.
 */
import {AreaActions, AreaActionTypes} from "../actions/area.actions";
import {AreaType} from "../shared/data-types/area.type";

export interface State {
  areas: AreaType[];
  loading: boolean;

}

const initialState: State = {
  areas: [],
  loading: false
};

export function reducer(state = initialState, action: AreaActions): State {
  switch (action.type) {

    case AreaActionTypes.AREA_LIST: {
      return Object.assign({}, state, {
        loading: true
      });

    }

    case AreaActionTypes.AREA_LIST_SUCCESS: {

      const result: AreaType[] = action.payload;
      return Object.assign({}, state, {
        areas: result,
        loading: false
      });

    }

    default:
      return state;

  }

}

export const getAreaList = (state: State) => state.areas;
