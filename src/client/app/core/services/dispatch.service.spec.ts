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

import { TestBed } from '@angular/core/testing';

import { DispatchService } from './dispatch.service';
import {Action, Store} from '@ngrx/store';
import {NavigationServiceB} from './navigation-2/navigation.service';
import {Subject} from 'rxjs';
import {NavigationEnd, Router} from '@angular/router';
import {mockStore} from '../test/mock-store';
import {Observable} from 'rxjs/internal/Observable';
import {environment} from '../../environments/environment';

describe('DispatchService', () => {

  class MockRouterItem {
    public event = new NavigationEnd(0, '/' + environment.appRoot + 'item', '/'
      + environment.appRoot + 'item');
    public events = new Observable(observer => {
      observer.next(this.event);
      observer.complete();
    });
    public navigate = jasmine.createSpy('navigate');
  }

  let router: Router;
  let store;
  let navService;
  let service;
  const actions = new Subject<Action>();
  const states = new Subject<any>();
  const appStore = mockStore<any>({ actions, states });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DispatchService,
        NavigationServiceB,
        {
          provide: Router,
          useValue: new MockRouterItem()
        },
        {
          provide: Store,
          useValue: appStore
        }
      ]
    });
    service = TestBed.get(DispatchService);
    navService = TestBed.get(NavigationServiceB);
    router = TestBed.get(Router);
    store = TestBed.get(Store);

  });

  // it('should dispatch request for type data.', () => {
  //   spyOn(service, 'getCollectionsForType');
  //   spyOn(service, 'getSubjectsForType');
  //   spyOn(service, 'getCollectionGroupsByType');
  //   spyOn(service, 'getAllTypes');
  //   service.dispatchActions(undefined, '1', undefined, undefined);
  //   expect(service.getCollectionsForType).toHaveBeenCalled();
  //   expect(service.getSubjectsForType).toHaveBeenCalled();
  //   expect(service.getCollectionGroupsByType).toHaveBeenCalled();
  //   expect(service.getAllTypes).toHaveBeenCalled();
  // });
  //
  // it('should dispatch request for subject data.', () => {
  //   spyOn(service, 'getCollectionsForSubject');
  //   spyOn(service, 'getTypesForSubject');
  //   spyOn(service, 'getCollectionGroupsBySubject');
  //   spyOn(service, 'getAllSubjects');
  //   service.dispatchActions(undefined, undefined, '1', undefined);
  //   expect(service.getCollectionsForSubject).toHaveBeenCalled();
  //   expect(service.getTypesForSubject).toHaveBeenCalled();
  //   expect(service.getCollectionGroupsBySubject).toHaveBeenCalled();
  //   expect(service.getAllSubjects).toHaveBeenCalled();
  // });

  it('should dispatch request for area data.', () => {
    spyOn(service, 'getCollectionsForArea');
    spyOn(service, 'getTypesForArea');
    spyOn(service, 'getCollectionGroupsByArea');
    spyOn(service, 'getSubjectsForArea');
    service.dispatchActions('1', undefined, undefined, undefined);
    expect(service.getCollectionsForArea).toHaveBeenCalled();
    expect(service.getTypesForArea).toHaveBeenCalled();
    expect(service.getCollectionGroupsByArea).toHaveBeenCalled();
    expect(service.getSubjectsForArea).toHaveBeenCalled();
  });

  it('should dispatch request for area and group data.', () => {
    spyOn(service, 'getCollectionsForCategoryArea');
    spyOn(service, 'getTypesForAreaGroup');
    spyOn(service, 'getCollectionGroupsByArea');
    spyOn(service, 'getSubjectsForAreaGroup');
    service.dispatchActions('1', undefined, undefined, '1');
    expect(service.getCollectionsForCategoryArea).toHaveBeenCalled();
    expect(service.getTypesForAreaGroup).toHaveBeenCalled();
    expect(service.getCollectionGroupsByArea).toHaveBeenCalled();
    expect(service.getSubjectsForAreaGroup).toHaveBeenCalled();
  });

  it('should dispatch request for area and subject data.', () => {
    spyOn(service, 'getCollectionsForAreaSubject');
    spyOn(service, 'getTypesForAreaSubject');
    spyOn(service, 'getCollectionGroupsByAreaSubject');
    spyOn(service, 'getSubjectsForArea');
    service.dispatchActions('1', undefined, '1', undefined);
    expect(service.getCollectionsForAreaSubject).toHaveBeenCalled();
    expect(service.getTypesForAreaSubject).toHaveBeenCalled();
    expect(service.getCollectionGroupsByAreaSubject).toHaveBeenCalled();
    expect(service.getSubjectsForArea).toHaveBeenCalled();
  });

  it('should dispatch request for area and type data.', () => {
    spyOn(service, 'getCollectionsForAreaType');
    spyOn(service, 'getTypesForArea');
    spyOn(service, 'getCollectionGroupsByAreaType');
    spyOn(service, 'getSubjectsForAreaType');
    service.dispatchActions('1', '1', undefined, undefined);
    expect(service.getCollectionsForAreaType).toHaveBeenCalled();
    expect(service.getTypesForArea).toHaveBeenCalled();
    expect(service.getCollectionGroupsByAreaType).toHaveBeenCalled();
    expect(service.getSubjectsForAreaType).toHaveBeenCalled();
  });

  it('should dispatch request for area, group, and type data.', () => {
    spyOn(service, 'getCollectionsForCategoryAreaType');
    spyOn(service, 'getSubjectsForAreaGroupType');
    spyOn(service, 'getCollectionGroupsByAreaType');
    spyOn(service, 'getTypesForAreaGroup');
    service.dispatchActions('1', '1', undefined, '1');
    expect(service.getCollectionsForCategoryAreaType).toHaveBeenCalled();
    expect(service.getSubjectsForAreaGroupType).toHaveBeenCalled();
    expect(service.getCollectionGroupsByAreaType).toHaveBeenCalled();
    expect(service.getTypesForAreaGroup).toHaveBeenCalled();
  });

  it('should dispatch request for area, group, and subject data.', () => {
    spyOn(service, 'getCollectionsForCategoryAreaSubject');
    spyOn(service, 'getSubjectsForAreaGroup');
    spyOn(service, 'getTypesForAreaGroupSubject');
    spyOn(service, 'getCollectionGroupsByAreaSubject');
    service.dispatchActions('1', undefined, '1', '1');
    expect(service.getCollectionsForCategoryAreaSubject).toHaveBeenCalled();
    expect(service.getSubjectsForAreaGroup).toHaveBeenCalled();
    expect(service.getTypesForAreaGroupSubject).toHaveBeenCalled();
    expect(service.getCollectionGroupsByAreaSubject).toHaveBeenCalled();
  });

  it('should dispatch request for area, subject, and type data.', () => {
    spyOn(service, 'getCollectionsForTypeAreaSubject');
    spyOn(service, 'getCollectionGroupsByAreaSubjectType');
    spyOn(service, 'getSubjectsForAreaType');
    spyOn(service, 'getTypesForAreaSubject');
    service.dispatchActions('1', '1', '1', undefined);
    expect(service.getCollectionsForTypeAreaSubject).toHaveBeenCalled();
    expect(service.getCollectionGroupsByAreaSubjectType).toHaveBeenCalled();
    expect(service.getSubjectsForAreaType).toHaveBeenCalled();
    expect(service.getTypesForAreaSubject).toHaveBeenCalled();
  });

  it('should dispatch request for area, group, type, and subject data.', () => {
    spyOn(service, 'getCollectionsForCategoryAreaTypeSubject');
    spyOn(service, 'getSubjectsForAreaGroupType');
    spyOn(service, 'getTypesForAreaGroupSubject');
    spyOn(service, 'getCollectionGroupsByAreaSubjectType');
    service.dispatchActions('1', '1', '1', '1');
    expect(service.getCollectionsForCategoryAreaTypeSubject).toHaveBeenCalled();
    expect(service.getSubjectsForAreaGroupType).toHaveBeenCalled();
    expect(service.getTypesForAreaGroupSubject).toHaveBeenCalled();
    expect(service.getCollectionGroupsByAreaSubjectType).toHaveBeenCalled();
  });

  // it('should dispatch request for subject.', () => {
  //   spyOn(service, 'getCollectionsForSubject');
  //   spyOn(service, 'getAllSubjects');
  //   spyOn(service, 'getCollectionGroupsBySubject');
  //   spyOn(service, 'getTypesForSubject');
  //   service.dispatchActions('', '', '1', '');
  //   expect(service.getCollectionsForSubject).toHaveBeenCalled();
  //   expect(service.getAllSubjects).toHaveBeenCalled();
  //   expect(service.getCollectionGroupsBySubject).toHaveBeenCalled();
  //   expect(service.getTypesForSubject).toHaveBeenCalled();
  // });
  //
  // it('should dispatch request for type.', () => {
  //   spyOn(service, 'getCollectionsForType');
  //   spyOn(service, 'getSubjectsForType');
  //   spyOn(service, 'getCollectionGroupsByType');
  //   spyOn(service, 'getAllTypes');
  //   service.dispatchActions('', '1', '', '');
  //   expect(service.getCollectionsForType).toHaveBeenCalled();
  //   expect(service.getSubjectsForType).toHaveBeenCalled();
  //   expect(service.getCollectionGroupsByType).toHaveBeenCalled();
  //   expect(service.getAllTypes).toHaveBeenCalled();
  // });

});
