import {TestBed, inject, fakeAsync} from '@angular/core/testing';

import { SetSelectedService } from './set-selected.service';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import * as filterActions from '../actions/filter.actions';

describe('SetSelectedService', () => {
  let service;
  let store;

  const mockList = [
    {
      id: 1, name: 'first',
    },
    {
      id: 2, name: 'second'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        SetSelectedService,
        {
          provide: Store,
          useClass: class {
            dispatch = jasmine.createSpy('dispatch');
            select = () => {
              return Observable.of(mockList);
            };
          }
        }]
    });
  });

  beforeEach(() => {
    store = TestBed.get(Store);
    service = TestBed.get(SetSelectedService);
  });

  it('should update store with selected subject', () => {
    spyOn(service.watchers, 'add');
    service.setSelectedSubject('1');
    expect(store.dispatch).toHaveBeenCalledWith(new filterActions.SetSubjectFilter([mockList[0]]));
    expect(service.watchers.add).toHaveBeenCalled();
    expect(service).toBeTruthy();
  });

  it('should update store with default subject field', () => {
    service.setSelectedSubject('');
    expect(store.dispatch).toHaveBeenCalledWith(new filterActions.SetSubjectFilter([{ id: 0, name: '' }]))

  });

  it('should update store with selected type', () => {
    spyOn(service.watchers, 'add');
    service.setSelectedSubject('1');
    service.setSelectedTypes('1');
    expect(store.dispatch).toHaveBeenCalledWith(new filterActions.SetTypeFilter([mockList[0]]))
  });

  it('should update store with default type field', () => {
    service.setSelectedTypes('');
    expect(store.dispatch).toHaveBeenCalledWith(new filterActions.SetTypeFilter([{ id: 0, name: '' }]))

  });

  it('should update store with selected group', () => {
    spyOn(service.watchers, 'add');
    service.setSelectedSubject('1');
    service.setSelectedGroups('1');
    expect(store.dispatch).toHaveBeenCalledWith(new filterActions.SetGroupFilter([mockList[0]]))
  });

  it('should update store with default groups field', () => {
    service.setSelectedGroups('');
    expect(store.dispatch).toHaveBeenCalledWith(new filterActions.SetGroupFilter([{ id: 0, name: '' }]))

  });

  it('should update store with selected area', () => {
    spyOn(service.watchers, 'add');
    service.setSelectedSubject('1');
    service.setSelectedArea('1');
    expect(store.dispatch).toHaveBeenCalledWith(new filterActions.SetAreaFilter([mockList[0]]))
  });

  it('should update store with default areas field', () => {
    service.setSelectedArea('');
    expect(store.dispatch).toHaveBeenCalledWith(new filterActions.SetAreaFilter([{ id: 0, name: '' }]))

  });

  it ('should unsubscribe', () => {
    spyOn(service.watchers, 'unsubscribe');
    service.unsubscribe();
    expect(service.watchers.unsubscribe).toHaveBeenCalled();

  });

});
