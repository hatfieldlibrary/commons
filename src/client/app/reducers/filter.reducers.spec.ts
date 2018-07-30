import {State} from './filter.reducers';
import {reducer} from './filter.reducers';

import {
  RemoveSelectedGroups,
  RemoveSelectedSubjects,
  RemoveSelectedTypes, SetAreaFilter, SetGroupFilter,
  SetSubjectFilter,
  SetTypeFilter
} from '../actions/filter.actions';

const initialState: State = {
  filterTerm: '',
  selectedSubjects: [{
    id: 0,
    name: ''
  }],
  selectedTypes: [{
    id: 0,
    name: ''
  }],
  selectedAreas: [{
    id: 0,
    name: ''
  }],
  selectedGroups: [{
    id: 0,
    name: ''
  }],
  removedAreas: [{
    id: 0,
    name: ''
  }],
  removedSubjects: [{
    id: 0,
    name: ''
  }],
  removedTypes: [{
    id: 0,
    name: ''
  }],
  removedGroups: [{
    id: 0,
    name: ''
  }]
};

describe('Filter Reducer', () => {

  it('should have removed subjects.', () => {

    expect(
      reducer(undefined, new RemoveSelectedSubjects([{id: 1, name: 's1'}])).removedSubjects
    ).toEqual(
      [{id: 1, name: 's1'}]
    )
  });

  it('should have removed types.', () => {

    expect(
      reducer(undefined, new RemoveSelectedTypes([{id: 1, name: 't1'}])).removedTypes
    ).toEqual(
      [{id: 1, name: 't1'}]
    )
  });

  it('should have removed groups.', () => {

    expect(
      reducer(undefined, new RemoveSelectedGroups([{id: 1, name: 't1'}])).removedGroups
    ).toEqual(
      [{id: 1, name: 't1'}]
    )
  });

  it('should have selected subjects.', () => {

    expect(
      reducer(undefined, new SetSubjectFilter([{id: 1, name: 's1'}])).selectedSubjects
    ).toEqual(
      [{id: 1, name: 's1'}]
    )
  });

  it('should set selected types.', () => {

    expect(
      reducer(undefined, new SetTypeFilter([{id: 1, name: 't1'}])).selectedTypes
    ).toEqual(
      [{id: 1, name: 't1'}]
    )
  });

  it('should set selected groups.', () => {

    expect(
      reducer(undefined, new SetGroupFilter([{id: 1, name: 't1'}])).selectedGroups
    ).toEqual(
      [{id: 1, name: 't1'}]
    )
  });

  it('should set selected area.', () => {

    expect(
      reducer(undefined, new SetAreaFilter([{id: 1, name: 't1'}])).selectedAreas
    ).toEqual(
      [{id: 1, name: 't1'}]
    )
  });
});
