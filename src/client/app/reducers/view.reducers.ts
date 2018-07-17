import {ViewActions, ViewActionType} from '../actions/view.actions';

export interface State {
  view: string;
}

const initialState = {
  view: 'list'
};

export function reducer(state = initialState, action: ViewActions): State {

  switch (action.type) {

    case ViewActionType.VIEW_ACTION: {
      const view = <string>action.payload;
      return Object.assign({}, state, {
        view: view
      });
    }

    default:
      return state;
  }
}

export const getViewType = (state: State) => state.view;
