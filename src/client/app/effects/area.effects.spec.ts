
import {EffectsRunner, EffectsTestingModule} from "@ngrx/effects/testing";

import {AreaEffects} from "./area.effects";
import {AreaService} from "../services/area.service";
import {inject, TestBed} from "@angular/core/testing";
import {Observable} from "rxjs";
import {AreaAction, AreaActionTypes} from "../actions/area.actions";
import {HttpModule} from "@angular/http";
import {AreaType} from "../shared/data-types/area.type";

describe('Area Effect', () => {
  let runner: EffectsRunner;
  let areaEffects: AreaEffects;
  let areaService: AreaService;
  const mockAreas:AreaType[] = [
    {
      id: 1,
      title: 'test',
      linkLabel: 'link',
      url: 'url',
      searchUrl: '',
      description: 'description',
      position: 1
    }, {
      id: 2,
      title: 'test 2',
      linkLabel: 'link',
      url: 'url',
      searchUrl: '',
      description: 'description',
      position: 1
    }
  ];

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      EffectsTestingModule,
      HttpModule
    ],
    providers: [
      AreaEffects, AreaService

    ]
  }));
  it('call Area Success action after areas loaded.',
    inject([
        EffectsRunner, AreaEffects, AreaService
      ],
      (_runner:EffectsRunner, _areaEffects:AreaEffects, _areaService:AreaService ) => {
        runner = _runner;
        areaEffects = _areaEffects;
        areaService = _areaService;
        spyOn(areaService, 'getAreas')
          .and.returnValue(Observable.of({area: '1', response: mockAreas}));
        runner.queue(new AreaAction('1'));

        areaEffects.areasEffect$.subscribe(result => {
          expect(result.type).toEqual(AreaActionTypes.AREA_INFORMATION);
          expect(result.payload.areas.length).toBe(2);
          expect(result.payload.areaId).toEqual('1');
        });
      })
  );
});
