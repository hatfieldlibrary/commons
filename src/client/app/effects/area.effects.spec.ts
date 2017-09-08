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
import {AreaAction, AreaActionSuccess, AreaInformation, AreaInformationSuccess} from '../actions/area.actions';
import {AreaType} from '../shared/data-types/area.type';
import {AreaListItemType} from '../shared/data-types/area-list.type';
import {provideMockActions} from '@ngrx/effects/testing';
import {hot, cold} from 'jasmine-marbles';

describe('Area Effect', () => {

  let actions: Observable<any>;
  let areaEffects: AreaEffects;
  const mockAreasList: AreaListItemType[] = [
    {
      id: 1,
      title: 'test area one',
      count: 2
    }, {
      id: 2,
      title: 'test area two',
      count: 1
    }
  ];

  const mockAreaInfo: AreaType = {
    id: 1,
    title: 'test area',
    linkLabel: '',
    url: '',
    searchUrl: '',
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
      ],
    });

    areaEffects = TestBed.get(AreaEffects);

  });

  it('should call Area Success action after areaList loaded.', () => {

    const startAction = new AreaAction();
    const hotMarble = {a: startAction};
    actions = hot('--a-', hotMarble);
    const successAction = new AreaActionSuccess(mockAreasList);
    const expectedResults = cold('--b', {b: successAction});
    expect(areaEffects.areaListEffect$).toBeObservable(expectedResults);

  });

  it('should call Area Success action after areaInfo loaded.', () => {

    const startAction = new AreaInformation('1');
    const hotMarble = {a: startAction};
    actions = hot('--a-', hotMarble);
    const successAction = new AreaInformationSuccess([mockAreaInfo]);
    const expectedResults = cold('--b', {b: successAction});
    expect(areaEffects.areaInfoEffect$).toBeObservable(expectedResults);

  });


});
