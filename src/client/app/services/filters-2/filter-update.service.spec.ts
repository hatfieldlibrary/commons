import {FieldTypeKey, FilterUpdateServiceB} from './filter-update.service';
import {mockStore} from '../../shared/test/mock-store';
import {Action, Store} from '@ngrx/store';
import {Subject} from 'rxjs/Subject';
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
    spyOn(service, 'getPositionInSelectedList').and.callThrough();
  });

  it('should update subjects filter by adding selected subject', () => {
    const selectedSubject = [{id: 1, name: 's1'}];
    const subjects = [{id: 1, name: 's1'}, {id: 2, name: 's2'}, {id: 3, name: 's3'}];
    const subjectId = 3;
    const key = FieldTypeKey.SUBJECT;
    spyOn(service, 'updateSelectedFields').and.callThrough();
    spyOn(service, 'removeDefaultCollections');
    spyOn(store, 'dispatch');
    const sub = service.updateSelectedSubjectsStore(selectedSubject, subjects, subjectId);
    expect(service.updateSelectedFields).toHaveBeenCalledWith(selectedSubject, subjects, 3, key);
    expect(service.removeDefaultCollections).toHaveBeenCalledWith(key);
    expect(service.getPositionInSelectedList).toHaveBeenCalledWith(3, key);
    expect(store.dispatch).toHaveBeenCalled();
    expect(sub).toEqual([{id: 1, name: 's1'}, {id: 3, name: 's3'}]);
  });

  it('should update subjects filter by removing selected subject', () => {
    const selectedSubject = [{id: 1, name: 's1'}, {id: 3, name: 's3'}];
    const subjects = [{id: 1, name: 's1'}, {id: 2, name: 's2'}, {id: 3, name: 's3'}];
    const subjectId = 3;
    const key = FieldTypeKey.SUBJECT;
    spyOn(service, 'updateSelectedFields').and.callThrough();
    spyOn(service, 'removeDefaultCollections');
    spyOn(store, 'dispatch');
    const sub = service.updateSelectedSubjectsStore(selectedSubject, subjects, subjectId);
    expect(service.updateSelectedFields).toHaveBeenCalledWith(selectedSubject, subjects, 3, key);
    expect(service.removeDefaultCollections).toHaveBeenCalledWith(key);
    expect(service.getPositionInSelectedList).toHaveBeenCalledWith(3, key);
    expect(store.dispatch).toHaveBeenCalled();
    expect(sub).toEqual([{id: 1, name: 's1'}]);
  });

  it('should update selected subject list with a 0 id entry', () => {
    const selectedSubject = [{id: 3, name: 's3'}];
    const subjects = [{id: 1, name: 's1'}, {id: 2, name: 's2'}, {id: 3, name: 's3'}];
    const subjectId = 3;
    const key = FieldTypeKey.SUBJECT;
    spyOn(service, 'updateSelectedFields').and.callThrough();
    spyOn(service, 'removeDefaultCollections');
    spyOn(store, 'dispatch');
    const sub = service.updateSelectedSubjectsStore(selectedSubject, subjects, subjectId);
    expect(service.updateSelectedFields).toHaveBeenCalledWith(selectedSubject, subjects, 3, key);
    expect(service.removeDefaultCollections).toHaveBeenCalledWith(key);
    expect(service.getPositionInSelectedList).toHaveBeenCalledWith(3, key);
    expect(store.dispatch).toHaveBeenCalled();
    expect(sub).toEqual([{id: 0, name: ''}]);
  });

  it('should update types filter by adding selected type.', () => {
    const selectedType = [{id: 1, name: 't1'}];
    const types = [{id: 1, name: 't1'}, {id: 2, name: 't2'}, {id: 3, name: 't3'}];
    const typeId = 3;
    const key = FieldTypeKey.TYPE;
    spyOn(service, 'updateSelectedFields').and.callThrough();
    spyOn(service, 'removeDefaultCollections');
    spyOn(store, 'dispatch');
    const type = service.updateSelectedTypeStore(selectedType, types, typeId);
    expect(service.updateSelectedFields).toHaveBeenCalledWith(selectedType, types, 3, key);
    expect(service.removeDefaultCollections).toHaveBeenCalledWith(key);
    expect(service.getPositionInSelectedList).toHaveBeenCalledWith(3, key);
    expect(store.dispatch).toHaveBeenCalled();
    expect(type).toEqual([{id: 1, name: 't1'}, {id: 3, name: 't3'} ]);
  });

  it('should update types filter by removing selected type.', () => {
    const selectedType = [{id: 1, name: 't1'}, {id: 3, name: 't3'}];
    const types = [{id: 1, name: 't1'}, {id: 2, name: 't2'}, {id: 3, name: 't3'}];
    const typeId = 3;
    const key = FieldTypeKey.TYPE;
    spyOn(service, 'updateSelectedFields').and.callThrough();
    spyOn(service, 'removeDefaultCollections');
    spyOn(store, 'dispatch');
    const type = service.updateSelectedTypeStore(selectedType, types, typeId);
    expect(service.updateSelectedFields).toHaveBeenCalledWith(selectedType, types, 3, key);
    expect(service.removeDefaultCollections).toHaveBeenCalledWith(key);
    expect(service.getPositionInSelectedList).toHaveBeenCalledWith(3, key);
    expect(store.dispatch).toHaveBeenCalled();
    expect(type).toEqual([{id: 1, name: 't1'}]);
  });

  it('should update types filter by updating selected list with a 0 id entry',
    () => {
    const selectedType = [{id: 3, name: 't3'}];
    const types = [{id: 1, name: 't1'}, {id: 2, name: 't2'}, {id: 3, name: 't3'}];
    const typeId = 3;
    const key = FieldTypeKey.TYPE;
    spyOn(service, 'updateSelectedFields').and.callThrough();
    spyOn(service, 'removeDefaultCollections');
    spyOn(store, 'dispatch');
    const type = service.updateSelectedTypeStore(selectedType, types, typeId);
      expect(service.updateSelectedFields).toHaveBeenCalledWith(selectedType, types, 3, key);
    expect(service.removeDefaultCollections).toHaveBeenCalledWith(key);
    expect(service.getPositionInSelectedList).toHaveBeenCalledWith(3, key);
    expect(store.dispatch).toHaveBeenCalled();
    expect(type).toEqual([{id: 0, name: ''}]);
  });

  it('should update groups filter by removing selected group', () => {
    const selectedGroup = [{id: 1, name: 'g1'}, {id: 3, name: 'g3'}];
    const groups = [{id: 1, name: 'g1'}, {id: 2, name: 'g2'}, {id: 3, name: 'g3'}];
    const groupId = 3;
    const key = FieldTypeKey.GROUP;
    spyOn(service, 'updateSelectedFields').and.callThrough();
    spyOn(service, 'removeDefaultCollections');
    spyOn(store, 'dispatch');
    const group = service.updateSelectedGroupsStore(selectedGroup, groups, groupId);
    expect(service.updateSelectedFields).toHaveBeenCalledWith(selectedGroup, groups, 3, key);
    expect(service.removeDefaultCollections).toHaveBeenCalledWith(key);
    expect(service.getPositionInSelectedList).toHaveBeenCalledWith(3, key);
    expect(store.dispatch).toHaveBeenCalled();
    expect(group).toEqual([{id: 1, name: 'g1'}]);
  });

  it('should update groups filter by updating selected list with a 0 id entry', () => {
    const selectedGroup = [{id: 3, name: 'g3'}];
    const groups = [{id: 1, name: 'g1'}, {id: 2, name: 'g2'}, {id: 3, name: 'g3'}];
    const groupId = 3;
    const key = FieldTypeKey.GROUP;
    spyOn(service, 'updateSelectedFields').and.callThrough();
    spyOn(service, 'removeDefaultCollections');
    spyOn(store, 'dispatch');
    const group = service.updateSelectedGroupsStore(selectedGroup, groups, groupId);
    expect(service.updateSelectedFields).toHaveBeenCalledWith(selectedGroup, groups, 3, key);
    expect(service.removeDefaultCollections).toHaveBeenCalledWith(key);
    expect(service.getPositionInSelectedList).toHaveBeenCalledWith(3, key);
    expect(store.dispatch).toHaveBeenCalled();
    expect(group).toEqual([{id: 0, name: ''}]);
  });

  it('should update groups filter by adding selected filter', () => {
    const selectedGroup = [{id: 1, name: 'g1'}];
    const groups = [{id: 1, name: 'g1'}, {id: 2, name: 'g2'}, {id: 3, name: 'g3'}];
    const groupId = 3;
    const key = FieldTypeKey.GROUP;
    spyOn(service, 'updateSelectedFields').and.callThrough();
    spyOn(service, 'removeDefaultCollections');
    spyOn(store, 'dispatch');
    const group = service.updateSelectedGroupsStore(selectedGroup, groups, groupId);
    expect(service.updateSelectedFields).toHaveBeenCalledWith(selectedGroup, groups, 3, key);
    expect(service.removeDefaultCollections).toHaveBeenCalledWith(key);
    expect(service.getPositionInSelectedList).toHaveBeenCalledWith(3, key);
    expect(store.dispatch).toHaveBeenCalled();
    expect(group).toEqual([{id: 1, name: 'g1'}, {id: 3, name: 'g3'}]);
  });

  it('should update area filter', () => {
    const areas = [{id: 1, name: 'a1'}, {id: 2, name: 'a2'}, {id: 3, name: 'a3'}];
    const areaId = 3;
    spyOn(service, 'getSelectedFieldObject').and.callThrough();
    spyOn(store, 'dispatch');
    const area = service.updateSelectSingleAreaStore( areas, areaId);
    expect(store.dispatch).toHaveBeenCalled();
    expect(area).toEqual([{id: 3, name: 'a3'}]);
  });

});
