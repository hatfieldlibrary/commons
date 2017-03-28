
import {EffectsRunner, EffectsTestingModule} from "@ngrx/effects/testing";

import {inject, TestBed} from "@angular/core/testing";
import {Observable} from "rxjs";
import {HttpModule} from "@angular/http";
import {ItemEffects} from "./item.effects";
import {ItemService} from "../services/item.service";
import {ItemActionTypes, ItemRequest} from "../actions/item.actions";

describe('Item Effect', () => {
  let runner: EffectsRunner;
  let itemEffects: ItemEffects;
  let itemService: ItemService;

  const itemMock = {
    collection: {
      id: '',
      title: 'test collection',
      url: '',
      desc: '',
      browseType: '',
      image: '',
      dates: '',
      ctype: '',
      repoType: '',
      restricted: false,
      published: false,
      createdAt: '',
      updatedAt: ''
    },
    categories: {
      id: 1,
      title: 'test category',
      linkLabel: '',
      url: '',
      secondaryUrl: '',
      description: '',
      areaId: '',
      createdAt: '',
      updatedAt: ''
    },
    itemTypes: [{
      id: 0,
      name: 'test item type',
      icon: '',
      createdAt: '',
      updatedAt: ''
    }]
  };


  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      EffectsTestingModule,
      HttpModule
    ],
    providers: [
      ItemEffects, ItemService

    ]
  }));
  it('call Area Success action after areas loaded.',
    inject([
        EffectsRunner, ItemEffects, ItemService
      ],
      (_runner:EffectsRunner, _itemEffects:ItemEffects, _itemService:ItemService ) => {
        runner = _runner;
        itemEffects = _itemEffects;
        itemService = _itemService;
        spyOn(itemService, 'getItem')
          .and.returnValue(Observable.of(itemMock));
        runner.queue(new ItemRequest('1'));
        itemEffects.itemEffect$.subscribe(result => {
          expect(result.type).toEqual(ItemActionTypes.ITEM_SUCCESS);
          expect(result.payload.collection.title).toEqual('test collection');

        });
      })
  );
});

