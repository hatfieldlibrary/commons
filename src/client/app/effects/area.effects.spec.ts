/*
 * Copyright (c) 2017.
 *
 *   This program is free software: you can redistribute it and/or modify
 *    it under the terms of the GNU General Public License as published by
 *    the Free Software Foundation, either version 3 of the License, or
 *    (at your option) any later version.
 *
 *    This program is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU General Public License for more details.
 *
 *   You should have received a copy of the GNU General Public License
 *    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */


import {AreaEffects} from './area.effects';
import {AreaService} from '../services/area.service';
import {TestBed} from '@angular/core/testing';
import {Observable, } from 'rxjs/Observable';
import {
  AreaListAction, AreaListActionFailed, AreaInformation,
  AreaInformationSuccess, AreaListSuccess
} from '../actions/area.actions';
import {AreaType} from '../shared/data-types/area.type';
import {AreaFilterType} from '../shared/data-types/area-filter.type';
import {provideMockActions} from '@ngrx/effects/testing';
import {hot, cold} from 'jasmine-marbles';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import {FieldFilterType} from '../shared/data-types/field-filter.type';

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
              return Observable.of(mockAreasList);
            };
            getAreaInfo = () => {
              return Observable.of([mockAreaInfo]);
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
    actions = hot('--a-', hotMarble);
    const successAction = new AreaListSuccess(mockAreasList);
    const expectedResults = cold('--b', {b: successAction});
    expect(areaEffects.areaListEffect$).toBeObservable(expectedResults);

  });

  it('should return error response action for all collections request', () => {

    spyOn(areaService, 'getAreaList').and.callFake(() => { return ErrorObservable.create('error')});
    const startAction =  new AreaListAction();
    const hotMarble = {a: startAction};
    actions = hot('--a-', hotMarble);
    const failAction = new AreaListActionFailed('test');
    // create error response and complete observable
    const expectedResults = cold('--(b|)',  {b: failAction});
    expect(areaEffects.areaListEffect$).toBeObservable(expectedResults);

  });

  it('should call Area Success action after areaInfo loaded.', () => {

    const startAction = new AreaInformation('1');
    const hotMarble = {a: startAction};
    actions = hot('--a-', hotMarble);
    const successAction = new AreaInformationSuccess(mockAreaInfo);
    const expectedResults = cold('--b', {b: successAction});
    expect(areaEffects.areaInfoEffect$).toBeObservable(expectedResults);

  });

  it('should return error response action for all collections request', () => {

    spyOn(areaService, 'getAreaInfo').and.callFake(() => { return ErrorObservable.create('error') });
    const startAction =  new AreaInformation('1');
    const hotMarble = {a: startAction};
    actions = hot('--a-', hotMarble);
    const failAction = new AreaListActionFailed('test');
    // create error response and complete observable
    const expectedResults = cold('--(b|)',  {b: failAction});
    expect(areaEffects.areaInfoEffect$).toBeObservable(expectedResults);

  });


});
