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

import {TestBed} from '@angular/core/testing';

import {NavigationServiceB} from './navigation.service';
import { Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {Action, Store} from '@ngrx/store';
import {Subject} from 'rxjs/Subject';
import {mockStore} from '../../shared/test/mock-store';
import {FieldValues} from '../../shared/enum/field-names';

describe('NavigationService', () => {
  let router: Router;
  let store;
  let service;
  const actions = new Subject<Action>();
  const states = new Subject<any>();
  const appStore = mockStore<any>({actions, states});

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        NavigationServiceB,
        {
          provide: Router,
          useClass: class {
            navigate = jasmine.createSpy('navigate');
          }
        },
        {
          provide: Store,
          useValue: appStore
        }
      ]
    });
  });

  beforeEach(() => {
    service = TestBed.get(NavigationServiceB);
    router = TestBed.get(Router);
    store = TestBed.get(Store);
    service.removedSubs = [{id: 0, name: ''}];
    service.removedTypes = [{id: 0, name: ''}];
    service.removedGroups = [{id: 0, name: ''}];

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get ids for field list', () => {
    const ids = service.getIds([{id: 1, name: 'test one'}, {id: 2, name: 'test two'}]);
    expect(ids).toEqual('1,2');
  });

  it('should throw error invalid id list', () => {
    expect(() => {service.getIds([{noId: ''}])}).toThrowError()
  });

  it('should navigate to item', () => {
    service.navigateItemRoute('1', '1');
    expect(router.navigate).toHaveBeenCalledWith(['/',
      service.urlRootPath,
      'item',
      'id',
      '1',
      '1'
    ])
  });

  it('should set the subject ids used for routing within service', () => {
    spyOn(service, 'updateStoreWithRemovedFilter');
    service.removedSubs = [{id: 1, name: 's1'}];
    const id = service.setIdFields('1,2', '', '');
    expect(service.updateStoreWithRemovedFilter).toHaveBeenCalledWith(FieldValues.SUBJECT);
    expect(id).toEqual({subjectId: '2', typeId: '', groupId: ''});
  });

  it('should set the type ids used for routing within service', () => {
    spyOn(service, 'updateStoreWithRemovedFilter');
    service.removedTypes = [{id: 1, name: 't1'}];
    const id = service.setIdFields('', '1,2', '');
    expect(service.updateStoreWithRemovedFilter).toHaveBeenCalledWith(FieldValues.TYPE);
    expect(id).toEqual({subjectId: '', typeId: '2', groupId: ''});
  });

  it('should set the group ids used for routing within service', () => {
    spyOn(service, 'updateStoreWithRemovedFilter');
    service.removedGroups = [{id: 1, name: 'g1'}];
    const id = service.setIdFields('', '', '1,2');
    expect(service.updateStoreWithRemovedFilter).toHaveBeenCalledWith(FieldValues.GROUP);
    expect(id).toEqual({subjectId: '', typeId: '', groupId: '2'});
  });

  it('should navigate using all test fields', () => {
    spyOn(service, 'setIdFields').and.callThrough();
    service.navigateRoute('1', '1', '1', '1');
    expect(service.setIdFields).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/',
      service.urlRootPath,
      'collection',
      'category', '1',
      'area', '1',
      'type', '1',
      'subject', '1'
    ], {queryParams: {}})
  });


  it('should navigate using area, type and subject', () => {
    spyOn(service, 'setIdFields').and.callThrough();
    service.navigateRoute('1', '1', '1', '');
    expect(service.setIdFields).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/',
      service.urlRootPath,
      'collection',
      'area', '1',
      'type', '1',
      'subject', '1'
    ], {queryParams: {}})
  });


  it('should navigate using area, type and group', () => {
    spyOn(service, 'setIdFields').and.callThrough();
    service.navigateRoute('1', '1', '', '1');
    expect(service.setIdFields).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/',
      service.urlRootPath,
      'collection',
      'category', '1',
      'area', '1',
      'type', '1',
    ], {queryParams: {}})
  });


  it('should navigate using area, subject and grouo', () => {
    spyOn(service, 'setIdFields').and.callThrough();
    service.navigateRoute('1', '', '1', '1');
    expect(service.setIdFields).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/',
      service.urlRootPath,
      'collection',
      'category', '1',
      'area', '1',
      'subject', '1'
    ], {queryParams: {}})
  });

  it('should navigate using area and subject', () => {
    spyOn(service, 'setIdFields').and.callThrough();
    service.navigateRoute('1', '', '1', '');
    expect(service.setIdFields).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/',
      service.urlRootPath,
      'collection',
      'area', '1',
      'subject', '1'
    ], {queryParams: {}})
  });

  it('should navigate using area and type', () => {
    spyOn(service, 'setIdFields').and.callThrough();
    service.navigateRoute('1', '1', '', '');
    expect(service.setIdFields).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/',
      service.urlRootPath,
      'collection',
      'area', '1',
      'type', '1'
    ], {queryParams: {}})
  });

  it('should navigate using area and group', () => {
    spyOn(service, 'setIdFields').and.callThrough();
    service.navigateRoute('1', '', '', '1');
    expect(service.setIdFields).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/',
      service.urlRootPath,
      'collection',
      'category', '1',
      'area', '1'
    ], {queryParams: {}})
  });

  it('should navigate using area', () => {
    spyOn(service, 'setIdFields').and.callThrough();
    service.navigateRoute('1', '', '', '');
    expect(service.setIdFields).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/',
      service.urlRootPath,
      'collection',
      'area', '1'
    ], {queryParams: {}})
  });

  it('should navigate using with query params', () => {
    spyOn(service, 'setIdFields').and.callThrough();
    service.navigateRoute('1', '', '', '', 'list');
    expect(service.setIdFields).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/',
      service.urlRootPath,
      'collection',
      'area', '1'
    ], {queryParams: {view: 'list'}})
  });

  it('should navigate area and type using with query params', () => {
    spyOn(service, 'setIdFields').and.callThrough();
    service.navigateRoute('1', '1', '', '', 'list');
    expect(service.setIdFields).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/',
      service.urlRootPath,
      'collection',
      'area', '1',
      'type', '1'
    ], {queryParams: {view: 'list'}})
  });

  it('should return back link area, group, type, subject', () => {
    const link = service.getBackLink('1', '1', '1', '1');
    expect(link).toEqual('/commons/collection/category/1/area/1/type/1/subject/1')
  });

  it('should return back link area, group', () => {
    const link = service.getBackLink('1', '1', '', '');
    expect(link).toEqual('/commons/collection/category/1/area/1')
  });

  it('should return back link area, group, subject', () => {
    const link = service.getBackLink('1', '1', '1', '');
    expect(link).toEqual('/commons/collection/category/1/area/1/subject/1')
  });

  it('should return back link area, group, type', () => {
    const link = service.getBackLink('1', '1', '', '1');
    expect(link).toEqual('/commons/collection/category/1/area/1/type/1')
  });

  it('should return back link area, subject, type', () => {
    const link = service.getBackLink('1', '', '1', '1');
    expect(link).toEqual('/commons/collection/area/1/type/1/subject/1')
  });

  it('should return back link area, type', () => {
    const link = service.getBackLink('1', '', '', '1');
    expect(link).toEqual('/commons/collection/area/1/type/1')
  });

  it('should return back link area, subject', () => {
    const link = service.getBackLink('1', '', '1', '');
    expect(link).toEqual('/commons/collection/area/1/subject/1')
  });



  it('should return field selected false', () => {
    let selected = service.isFieldSelected('0');
    expect(selected).toBeFalsy();
    selected = service.isFieldSelected(undefined);
    expect(selected).toBeFalsy();
    selected = service.isFieldSelected(null);
    expect(selected).toBeFalsy();
    selected = service.isFieldSelected('');
    expect(selected).toBeFalsy();
  });

});
