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

import {reducer} from './collection-group.reducers';
import {
  AllGroupsAction,
  GroupActionSuccess, GroupsByArea,
  GroupsByAreaSubject,
  GroupsByAreaSubjectType,
  GroupsByAreaType, GroupsBySubject, GroupsBySubjectType, GroupsByType
} from '../actions/collection-group.actions';


const mockGroups = [
  {id: 1, name: 'g1'},
  {id: 2, name: 'g2'}
];

describe('Collection Group Reducer', () => {

  it('should init request for all groups.', () => {
    expect(
      reducer(undefined, new AllGroupsAction())
    ).toEqual(
      {
        groups: [],
        loading: true
      })
  });
  it('should return the collection group list.', () => {
    expect(
      reducer(undefined, new GroupActionSuccess(mockGroups))
    ).toEqual(
      {
        groups: mockGroups,
        loading: false
      })
  });

  it('should init request for the collection group list by area, subject, type.', () => {
    expect(
      reducer(undefined, new GroupsByAreaSubjectType('1', '1', '1'))
    ).toEqual(
      {
        groups: [],
        loading: true
      })
  });

  it('should init request for the collection group list by area, type.', () => {
    expect(
      reducer(undefined, new GroupsByAreaType('1', '1'))
    ).toEqual(
      {
        groups: [],
        loading: true
      })
  });

  it('should init request for the collection group list by area, subject.', () => {
    expect(
      reducer(undefined, new GroupsByAreaSubject('1', '1'))
    ).toEqual(
      {
        groups: [],
        loading: true
      })
  });

  it('should init request for the collection group list by type, subject.', () => {
    expect(
      reducer(undefined, new GroupsBySubjectType('1', '1'))
    ).toEqual(
      {
        groups: [],
        loading: true
      })
  });

  it('should init request for the collection group list by type.', () => {
    expect(
      reducer(undefined, new GroupsByType('1'))
    ).toEqual(
      {
        groups: [],
        loading: true
      })
  });

  it('should init request for the collection group list by subject.', () => {
    expect(
      reducer(undefined, new GroupsBySubject('1'))
    ).toEqual(
      {
        groups: [],
        loading: true
      })
  });

  it('should init request for the collection group list by area.', () => {
    expect(
      reducer(undefined, new GroupsByArea('1'))
    ).toEqual(
      {
        groups: [],
        loading: true
      })
  });
});
