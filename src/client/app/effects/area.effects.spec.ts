import {EffectsRunner, EffectsTestingModule} from "@ngrx/effects/testing";

import {AreaEffects} from "./area.effects";
import {AreaService} from "../services/area.service";
import {inject, TestBed} from "@angular/core/testing";
import {Observable} from "rxjs";
import {AreaAction, AreaActionTypes, AreaInformation} from "../actions/area.actions";
import {HttpModule} from "@angular/http";
import {AreaType} from "../shared/data-types/area.type";
import {AreaListItemType} from "../shared/data-types/area-list.type";

describe('Area Effect', () => {
  let runner: EffectsRunner;
  let areaEffects: AreaEffects;
  let areaService: AreaService;
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

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      EffectsTestingModule,
      HttpModule
    ],
    providers: [
      AreaEffects, AreaService

    ]
  }));

  it('call Area Success action after areaList loaded.',
    inject([
        EffectsRunner, AreaEffects, AreaService
      ],
      (_runner: EffectsRunner, _areaEffects: AreaEffects, _areaService: AreaService) => {
        runner = _runner;
        areaEffects = _areaEffects;
        areaService = _areaService;
        spyOn(areaService, 'getAreaList')
          .and.returnValue(Observable.of(mockAreasList));
        runner.queue(new AreaAction('1'));

        areaEffects.areaListEffect$.subscribe(result => {
          expect(result.type).toEqual(AreaActionTypes.AREA_LIST_SUCCESS);
          expect(result.payload.length).toBe(2);

        });
      })
  );

  it('call Area Info Success action after area info is retrieved.',
    inject([
        EffectsRunner, AreaEffects, AreaService
      ],
      (_runner: EffectsRunner, _areaEffects: AreaEffects, _areaService: AreaService) => {
        runner = _runner;
        areaEffects = _areaEffects;
        areaService = _areaService;
        spyOn(areaService, 'getAreaInfo')
          .and.returnValue(Observable.of(mockAreaInfo));
        runner.queue(new AreaInformation('1'));

        areaEffects.areaInfoEffect$.subscribe(result => {
          expect(result.type).toEqual(AreaActionTypes.AREA_INFORMATION_SUCCESS);
          expect(result.payload).toEqual(mockAreaInfo);

        });
      })
  );
});
