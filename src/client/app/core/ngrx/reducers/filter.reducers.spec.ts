/*
 * Copyright (c) [2018] [Willamette University]
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * Author: Michael Spalti
 */

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
