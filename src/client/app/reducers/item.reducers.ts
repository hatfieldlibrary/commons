import {ItemType} from "../shared/data-types/item.type";
import {ItemActions, ItemActionTypes} from "../actions/item.actions";
/**
 * Created by mspalti on 3/23/17.
 */

export interface State {
  item: ItemType;
  loading: boolean;
}

const initialState: State = {
    item: {
      collection: {
        id: '',
        title: '',
        url: '',
        desc: '',
        browseType: '',
        image: '',
        dates: '',
        ctype: '',
        repoType: '',
        restricted: false,
        published: false,
        createdAt: '',
        updatedAt: ''
      },
      categories: {
        id: 0,
        title: '',
        linkLabel: '',
        url: '',
        secondaryUrl: '',
        description: '',
        areaId: '',
        createdAt: '',
        updatedAt: ''
      },
      itemTypes:[ {
        id: 0,
        name: '',
        icon: '',
        createdAt: '',
        updatedAt: ''

      }]
    },
    loading: false
  }
;

export function reducer(state = initialState, action: ItemActions): State {

  switch (action.type) {

    case ItemActionTypes.ITEM_REQUEST: {
      return Object.assign({}, state, {
        loading: true
      });

    }

    case ItemActionTypes.ITEM_SUCCESS: {

      const result: ItemType = <ItemType>action.payload;
      return Object.assign({}, state, {
        item: result,
        loading: false
      });

    }

    default:
      return state;

  }
}

export const getItem = (state: State) => state.item;
