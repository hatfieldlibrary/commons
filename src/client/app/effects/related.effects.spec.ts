/**
 * Created by mspalti on 4/19/17.
 */

import {EffectsRunner, EffectsTestingModule} from "@ngrx/effects/testing";

import {inject, TestBed} from "@angular/core/testing";
import {Observable} from "rxjs";
import {HttpModule} from "@angular/http";
import {RelatedService} from "../services/related.service";
import {ItemActionRelated, ItemActionTypes} from "app/actions/item.actions";
import {RelatedEffects} from "./related.effects";

describe('Related Items Effect', () => {
  let runner: EffectsRunner;
  let relatedEffects: RelatedEffects;
  let relatedService: RelatedService;

  const relatedMock = [
    {
      id: 1,
      name: 'test subject',
      image: ''
    }
  ];


  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      EffectsTestingModule,
      HttpModule
    ],
    providers: [
      RelatedEffects, RelatedService

    ]
  }));
  it('call Area Success action after areaList loaded.',
    inject([
        EffectsRunner, RelatedEffects, RelatedService
      ],
      (_runner:EffectsRunner, _relatedEffects:RelatedEffects, _relatedService:RelatedService ) => {
        runner = _runner;
        relatedEffects = _relatedEffects;
        relatedService = _relatedService;
        spyOn(relatedService, 'getRelatedCollections')
          .and.returnValue(Observable.of(relatedMock));
        runner.queue(new ItemActionRelated('1', '1,2'));
        relatedEffects.relatedEffect$.subscribe(result => {
          expect(result.type).toEqual(ItemActionTypes.RELATED_COLLECTIONS_SUCCESS);
          expect(result.payload[0].name).toEqual('test subject');

        });
      })
  );
});

