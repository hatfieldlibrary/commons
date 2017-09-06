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
import {AreaAction,  AreaActionSuccess} from '../actions/area.actions';
import {AreaType} from '../shared/data-types/area.type';
import {AreaListItemType} from '../shared/data-types/area-list.type';
import {provideMockActions} from '@ngrx/effects/testing';
import {hot, cold} from 'jasmine-marbles';

describe('Area Effect', () => {


  let actions: Observable<any>;
  let areaEffects: AreaEffects;
  let svc: AreaService;
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
            }
          }
        },
        provideMockActions(() => actions)
      ],
    });

    areaEffects = TestBed.get(AreaEffects);

  });

  it('call Area Success action after areaList loaded.', () => {

    const startAction = new AreaAction();
    const hotMarble = {a: startAction};
    actions = hot('--a-', hotMarble);
    const successAction = new AreaActionSuccess(mockAreasList);
    const expectedResults = cold('--b', {b: successAction});
    expect(areaEffects.areaListEffect$).toBeObservable(expectedResults);

  });

  // it('call Area Info Success action after area info is retrieved.',
  //   inject([
  //       EffectsRunner, AreaEffects, AreaService
  //     ],
  //     (_runner: EffectsRunner, _areaEffects: AreaEffects, _areaService: AreaService) => {
  //       runner = _runner;
  //       areaEffects = _areaEffects;
  //       areaService = _areaService;
  //       spyOn(areaService, 'getAreaInfo')
  //         .and.returnValue(Observable.of(mockAreaInfo));
  //       runner.queue(new AreaInformation('1'));
  //
  //       areaEffects.areaInfoEffect$.subscribe(result => {
  //         expect(result.type).toEqual(AreaActionTypes.AREA_INFORMATION_SUCCESS);
  //         expect(result.payload).toEqual(mockAreaInfo);
  //
  //       });
  //     })
  // );
});
