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

import {FieldTypeKey, FilterUpdateServiceB} from './filter-update.service';
import {mockStore} from '../../test/mock-store';
import {Action, Store} from '@ngrx/store';
import {Subject} from 'rxjs';
import {TestBed} from '@angular/core/testing';

describe('FilterUpdateServiceB', () => {

  let store;
  let service;
  const actions = new Subject<Action>();
  const states = new Subject<any>();
  const appStore = mockStore<any>({ actions, states });
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      providers: [
        FilterUpdateServiceB,
        {
          provide: Store,
          useValue: appStore
        }
      ]
    });
  });

  beforeEach( () => {
    service = TestBed.get(FilterUpdateServiceB);
    store = TestBed.get(Store);
    spyOn(service, 'removeDefaultCollection').and.callThrough();
    spyOn(service, 'getPositionInSelectedList').and.callThrough();
    spyOn(store, 'dispatch');
  });

  it('should update subjects filter by adding selected subject', () => {
    const selectedSubject = [{id: 1, name: 's1'}];
    const subjects = [{id: 1, name: 's1'}, {id: 2, name: 's2'}, {id: 3, name: 's3'}];
    const subjectId = 3;
    const key = FieldTypeKey.SUBJECT;
    const sub = service.updateSelectedFields(selectedSubject, subjects, subjectId, key);
    expect(service.removeDefaultCollection).toHaveBeenCalled();
    expect(service.getPositionInSelectedList).toHaveBeenCalledWith(selectedSubject, {id: 3, name: 's3'});
    expect(store.dispatch).toHaveBeenCalled();
    expect(sub).toEqual([{id: 1, name: 's1'}, {id: 3, name: 's3'}]);
  });

  it('should update subjects filter by removing selected subject', () => {
    const selectedSubject = [{id: 1, name: 's1'}, {id: 3, name: 's3'}];
    const subjects = [{id: 1, name: 's1'}, {id: 2, name: 's2'}, {id: 3, name: 's3'}];
    const subjectId = 3;
    const key = FieldTypeKey.SUBJECT;
    const sub = service.updateSelectedFields(selectedSubject, subjects, subjectId, key);
    expect(service.removeDefaultCollection).toHaveBeenCalled();
    expect(service.getPositionInSelectedList).toHaveBeenCalledWith(selectedSubject, {id: 3, name: 's3'});
    expect(store.dispatch).toHaveBeenCalled();
    expect(sub).toEqual([{id: 1, name: 's1'}]);
  });

  it('should update selected subject list with a 0 id entry', () => {
    const selectedSubject = [{id: 3, name: 's3'}];
    const subjects = [{id: 1, name: 's1'}, {id: 2, name: 's2'}, {id: 3, name: 's3'}];
    const subjectId = 3;
    const key = FieldTypeKey.SUBJECT;
    const sub = service.updateSelectedFields(selectedSubject, subjects, subjectId, key);
    expect(service.removeDefaultCollection).toHaveBeenCalled();
    expect(service.getPositionInSelectedList).toHaveBeenCalledWith(selectedSubject, {id: 3, name: 's3'});
    expect(store.dispatch).toHaveBeenCalled();
    expect(sub).toEqual([{id: 0, name: ''}]);
  });

  it('should update types filter by adding selected type.', () => {
    const selectedType = [{id: 1, name: 't1'}];
    const types = [{id: 1, name: 't1'}, {id: 2, name: 't2'}, {id: 3, name: 't3'}];
    const typeId = 3;
    const key = FieldTypeKey.TYPE;
    const type = service.updateSelectedFields(selectedType, types, typeId, key);
    expect(service.removeDefaultCollection).toHaveBeenCalled();
    expect(service.getPositionInSelectedList).toHaveBeenCalledWith(selectedType, {id: 3, name: 't3'});
    expect(store.dispatch).toHaveBeenCalled();
    expect(type).toEqual([{id: 1, name: 't1'}, {id: 3, name: 't3'} ]);
  });

  it('should update types filter by removing selected type.', () => {
    const selectedType = [{id: 1, name: 't1'}, {id: 3, name: 't3'}];
    const types = [{id: 1, name: 't1'}, {id: 2, name: 't2'}, {id: 3, name: 't3'}];
    const typeId = 3;
    const key = FieldTypeKey.TYPE;
    const type = service.updateSelectedFields(selectedType, types, typeId, key);
    expect(service.removeDefaultCollection).toHaveBeenCalled();
    expect(service.getPositionInSelectedList).toHaveBeenCalledWith(selectedType, {id: 3, name: 't3'});
    expect(store.dispatch).toHaveBeenCalled();
    expect(type).toEqual([{id: 1, name: 't1'}]);
  });

  it('should update types filter by updating selected list with a 0 id entry',
    () => {
    const selectedType = [{id: 3, name: 't3'}];
    const types = [{id: 1, name: 't1'}, {id: 2, name: 't2'}, {id: 3, name: 't3'}];
    const typeId = 3;
    const key = FieldTypeKey.TYPE;
    const type = service.updateSelectedFields(selectedType, types, typeId, key);
    expect(service.removeDefaultCollection).toHaveBeenCalled();
    expect(service.getPositionInSelectedList).toHaveBeenCalledWith(selectedType, {id: 3, name: 't3'});
    expect(store.dispatch).toHaveBeenCalled();
    expect(type).toEqual([{id: 0, name: ''}]);
  });

  it('should update groups filter by removing selected group', () => {
    const selectedGroup = [{id: 1, name: 'g1'}, {id: 3, name: 'g3'}];
    const groups = [{id: 1, name: 'g1'}, {id: 2, name: 'g2'}, {id: 3, name: 'g3'}];
    const groupId = 3;
    const key = FieldTypeKey.GROUP;
    const group = service.updateSelectedFields(selectedGroup, groups, groupId, key);
    expect(service.removeDefaultCollection).toHaveBeenCalled();
    expect(service.getPositionInSelectedList).toHaveBeenCalledWith(selectedGroup, {id: 3, name: 'g3'});
    expect(group).toEqual([{id: 1, name: 'g1'}]);
  });

  it('should update groups filter by updating selected list with a 0 id entry', () => {
    const selectedGroup = [{id: 3, name: 'g3'}];
    const groups = [{id: 1, name: 'g1'}, {id: 2, name: 'g2'}, {id: 3, name: 'g3'}];
    const groupId = 3;
    const key = FieldTypeKey.GROUP;
    const group = service.updateSelectedFields(selectedGroup, groups, groupId, key);
    expect(service.removeDefaultCollection).toHaveBeenCalled();
    expect(service.getPositionInSelectedList).toHaveBeenCalledWith(selectedGroup, {id: 3, name: 'g3'});
    expect(store.dispatch).toHaveBeenCalled();
    expect(group).toEqual([{id: 0, name: ''}]);
  });

  it('should update groups filter by adding selected filter', () => {
    const selectedGroup = [{id: 1, name: 'g1'}];
    const groups = [{id: 1, name: 'g1'}, {id: 2, name: 'g2'}, {id: 3, name: 'g3'}];
    const groupId = 3;
    const key = FieldTypeKey.GROUP;
    const group = service.updateSelectedFields(selectedGroup, groups, groupId, key);
    expect(service.removeDefaultCollection).toHaveBeenCalled();
    expect(service.getPositionInSelectedList).toHaveBeenCalledWith(selectedGroup, {id: 3, name: 'g3'});
    expect(store.dispatch).toHaveBeenCalled();
    expect(group).toEqual([{id: 1, name: 'g1'}, {id: 3, name: 'g3'}]);
  });

  it('should update area filter', () => {
    const areas = [{id: 1, name: 'a1'}, {id: 2, name: 'a2'}, {id: 3, name: 'a3'}];
    const areaId = 3;
    spyOn(service, 'getSelectedFieldObject').and.callThrough();
    const area = service.updateSelectSingleAreaStore( areas, areaId);
    expect(store.dispatch).toHaveBeenCalled();
    expect(area).toEqual([{id: 3, name: 'a3'}]);
  });

});
