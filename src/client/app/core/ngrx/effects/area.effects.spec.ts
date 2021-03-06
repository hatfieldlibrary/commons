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


import {of as observableOf, Observable, throwError} from 'rxjs';

import {AreaEffects} from './area.effects';
import {AreaService} from '../../services/area.service';
import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {
  AreaListAction, AreaListActionFailed, AreaInformation,
  AreaInformationSuccess, AreaListSuccess, AreaListByTypeSubject
} from '../actions/area.actions';
import {AreaType} from '../../data-types/area.type';
import {AreaFilterType} from '../../data-types/area-filter.type';
import {provideMockActions} from '@ngrx/effects/testing';
import {hot, cold} from 'jasmine-marbles';

describe('Area Effect', () => {

  let actions: Observable<any>;
  let areaEffects: AreaEffects;
  let areaService;

  const mockAreasList: AreaFilterType[] = [
    {
      id: 1,
      title: 'test areas one',
      count: 1
    }, {
      id: 2,
      title: 'test areas two',
      count: 1
    }
  ];

  const mockAreaInfo: AreaType = {
    id: 1,
    title: 'test areas',
    linkLabel: '',
    url: '',
    searchUrl: '',
    image: '',
    description: '',
    position: 2
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AreaEffects,
        {
          provide: AreaService,
          useClass: class {
            getAreaList = () => {
              return observableOf(mockAreasList);
            };
            getAreaListByTypeSubject = () => {
              return observableOf(mockAreasList);
            };
            getAreaInfo = () => {
              return observableOf([mockAreaInfo]);
            };
          }
        },
        provideMockActions(() => actions)
      ]
    });

    areaEffects = TestBed.get(AreaEffects);
    areaService = TestBed.get(AreaService);
  });

  it('should call Area Success action after areaList loaded.', () => {

    const startAction = new AreaListAction();
    const hotMarble = {a: startAction};
    actions = hot('-^-a-', hotMarble);
    const successAction = new AreaListSuccess(mockAreasList);
    const expectedResults = cold('--b', {b: successAction});
    expect(areaEffects.areaListEffect$).toBeObservable(expectedResults);

  });

  it('should return error response action for all collections request', () => {

    spyOn(areaService, 'getAreaList').and.callFake(() => { return throwError('test')});

    const startAction =  new AreaListAction();
    const hotMarble = {a: startAction};
    actions = hot('-^-a-', hotMarble);
    const failAction = new AreaListActionFailed('test');
    // create error response and complete observable
    const expectedResults = cold('--b',  {b: failAction});
    expect(areaEffects.areaListEffect$).toBeObservable(expectedResults);

  });

  it('should return error response action for areas by subject and type request', () => {

    spyOn(areaService, 'getAreaListByTypeSubject').and.callFake(() => { return throwError('test')});

    const startAction =  new AreaListByTypeSubject({subjectId: '1', typeId: '1'});
    const hotMarble = {a: startAction};
    actions = hot('-^-a-', hotMarble);
    const failAction = new AreaListActionFailed('test');
    // create error response and complete observable
    const expectedResults = cold('--b',  {b: failAction});
    expect(areaEffects.areaListTypeSubjectEffect$).toBeObservable(expectedResults);

  });

  it('should call Area Success action after areaInfo loaded.', () => {

    const startAction = new AreaInformation('1');
    const hotMarble = {a: startAction};
    actions = hot('-^-a-', hotMarble);
    const successAction = new AreaInformationSuccess(mockAreaInfo);
    const expectedResults = cold('--b', {b: successAction});
    expect(areaEffects.areaInfoEffect$).toBeObservable(expectedResults);

  });

  it('should return error response for area information request', () => {

    spyOn(areaService, 'getAreaInfo').and.callFake(() => { return throwError('test') });
    const startAction =  new AreaInformation('1');
    const hotMarble = {a: startAction};
    actions = hot('-^-a-', hotMarble);
    const failAction = new AreaListActionFailed('test');
    // create error response and complete observable
    const expectedResults = cold('--b',  {b: failAction});
    expect(areaEffects.areaInfoEffect$).toBeObservable(expectedResults);

  });

});
