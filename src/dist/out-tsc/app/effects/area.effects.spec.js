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
import { AreaEffects } from './area.effects';
import { AreaService } from '../services/area.service';
import { TestBed } from '@angular/core/testing';
import { Observable, } from 'rxjs/Observable';
import { AreaAction, AreaActionSuccess } from '../actions/area.actions';
import { provideMockActions } from '@ngrx/effects/testing';
import { hot, cold } from 'jasmine-marbles';
describe('Area Effect', function () {
    var actions;
    var areaEffects;
    var svc;
    var mockAreasList = [
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
    var mockAreaInfo = {
        id: 1,
        title: 'test area',
        linkLabel: '',
        url: '',
        searchUrl: '',
        description: '',
        position: 2
    };
    beforeEach(function () {
        TestBed.configureTestingModule({
            providers: [
                AreaEffects,
                {
                    provide: AreaService,
                    useClass: (function () {
                        function class_1() {
                            this.getAreaList = function () {
                                return Observable.of(mockAreasList);
                            };
                        }
                        return class_1;
                    }())
                },
                provideMockActions(function () { return actions; })
            ],
        });
        areaEffects = TestBed.get(AreaEffects);
    });
    it('call Area Success action after areaList loaded.', function () {
        var startAction = new AreaAction();
        var hotMarble = { a: startAction };
        actions = hot('--a-', hotMarble);
        var successAction = new AreaActionSuccess(mockAreasList);
        var expectedResults = cold('--b', { b: successAction });
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
//# sourceMappingURL=/Users/mspalti/willamette/commons/commons-6.28.17/src/client/app/effects/area.effects.spec.js.map