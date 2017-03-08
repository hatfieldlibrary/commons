/**
 * Created by mspalti on 2/24/17.
 */
import {SubjectActions, SubjectActionTypes} from "../actions/subject-actions";
import {SubjectType} from "../shared/data-types/subject.type";

export interface State {
  subjects: SubjectType[];
  loading: boolean;

}

const initialState: State = {
  subjects: [],
  loading: false
};

export function reducer(state = initialState, action: SubjectActions): State {
  switch (action.type) {

    case SubjectActionTypes.SUBJECT_LIST: {
      return Object.assign({}, state, {
        loading: true
      });

    }

    case SubjectActionTypes.SUBJECT_LIST_SUCCESS: {

      const result: SubjectType[] = action.payload;
      return Object.assign({}, state, {
        subjects: result,
        loading: false
      });

    }

    default:
      return state;

  }

}

export const getSubjectList = (state: State) => state.subjects;
