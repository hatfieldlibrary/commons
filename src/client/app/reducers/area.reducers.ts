/**
 * Created by mspalti on 2/24/17.
 */
import {AreaActions, AreaActionTypes, IdentifersPayload} from "../actions/area.actions";
import {AreaType} from "../shared/data-types/area.type";

export interface State {
  areas: AreaType[];
  areaInfo: AreaType;
  loading: boolean;

}

const initialState: State = {
  areas: [],
  areaInfo: <AreaType>{},
  loading: false
};

export function reducer(state = initialState, action: AreaActions): State {
  switch (action.type) {

    case AreaActionTypes.AREA_LIST: {
      const payload = <string>action.payload;
      return Object.assign({}, state, {
        loading: true
      });

    }

    case AreaActionTypes.AREA_LIST_SUCCESS: {

      const result: AreaType[] = <AreaType[]>action.payload;
      return Object.assign({}, state, {
        areas: result,
        areaInfo: {},
        loading: false
      });

    }

    case AreaActionTypes.AREA_INFORMATION: {
      const payload = <IdentifersPayload>action.payload;

      return  Object.assign({}, state, {
        areas: payload.areas,
        areaInfo: payload.areas.find(x => x.id == +payload.areaId),
        loading: false
      });
    }

    case AreaActionTypes.AREA_INFORMATION_UPDATE: {
      const payload = <string>action.payload;

        return Object.assign({}, state,
          {
            areas: state.areas,
            areaInfo: state.areas.find(x => x.id == +payload),
            loading: false
          });
    }

    default:
      return state;

  }

}

export const getAreaList = (state: State) => state.areas;

export const getAreaInfo = (state: State) => state.areaInfo;
