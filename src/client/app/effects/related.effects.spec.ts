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

