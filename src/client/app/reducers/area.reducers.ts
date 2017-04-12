/**
 * Created by mspalti on 2/24/17.
 */
import {AreaActions, AreaActionTypes} from "../actions/area.actions";
import {AreaType} from "../shared/data-types/area.type";

export interface State {
  area: AreaType;
  loading: boolean;

}

const initialState: State = {
  area: <AreaType>{
    id: 0,
    title: '',
    linkLabel: '',
    url: '',
    searchUrl: '',
    description: '',
    position: 0
  },
  loading: false
};

export function reducer(state = initialState, action: AreaActions): State {

  switch (action.type) {

    case AreaActionTypes.AREA_INFORMATION: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case AreaActionTypes.AREA_INFORMATION_SUCCESS: {
      const payload = <AreaType>action.payload;

      return Object.assign({}, state,
        {
          area: payload,
          loading: false
        });
    }

    default:
      return state;

  }

}

export const getAreaInfo = (state: State) => state.area;
