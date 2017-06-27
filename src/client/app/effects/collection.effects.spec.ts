
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

import {EffectsRunner, EffectsTestingModule} from "@ngrx/effects/testing";

import {inject, TestBed} from "@angular/core/testing";
import {Observable} from "rxjs";
import {HttpModule} from "@angular/http";
import {CollectionService} from "../services/collection.service";
import {CollectionEffects} from "./collection.effects";
import {
  AllCollectionsAction, AllCollectionSubjectAction, CollectionAction, CollectionActionTypes,
  CollectionSubjectAction
} from "../actions/collection.actions";

describe('Collections Effect', () => {
  let runner: EffectsRunner;
  let collectionEffects: CollectionEffects;
  let collectionService: CollectionService;

  const mockCollections = [
    {
      id: 1,
      title: 'test title',
      image: 'image',
      url: 'url',
      browseType: '',
      description: '',
      dates: '',
      items: '',
      ctype: '',
      repoType: '',
      restricted: true,
      published: false,
      createdAt: '',
      updatedAt: '',
      AreaId: 1,
      CollectionId: 1
    }
  ];

  const mockCollectionsForSubject = [
    {
      id: 2,
      title: 'test subject title',
      image: 'image',
      url: 'url',
      browseType: '',
      description: '',
      dates: '',
      items: '',
      ctype: '',
      repoType: '',
      restricted: true,
      published: false,
      createdAt: '',
      updatedAt: '',
      AreaId: 1,
      CollectionId: 1
    }
  ];

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      EffectsTestingModule,
      HttpModule
    ],
    providers: [
      CollectionEffects, CollectionService

    ]
  }));

  it('call Collection List Success action after collections by area are retrieved.',
    inject([
        EffectsRunner, CollectionEffects, CollectionService
      ],
      (_runner, _collectionEffects, _collectionService ) => {
        runner = _runner;
        collectionEffects = _collectionEffects;
        collectionService = _collectionService;
        spyOn(collectionService, 'getCollectionsByAreaId')
          .and.returnValue(Observable.of(mockCollections));
        runner.queue(new CollectionAction('1'));

        collectionEffects.collectionsByArea$.subscribe(result => {
          expect(result.type).toEqual(CollectionActionTypes.LIST_BY_AREA_SUCCESS);
          expect(result.payload.length).toBe(1);
          expect(result.payload[0].title).toEqual('test title');
        });
      })
  );

  it('call Collection List Success action after collections by subject are retrieved.',
    inject([
        EffectsRunner, CollectionEffects, CollectionService
      ],
      (_runner:EffectsRunner, _collectionEffects:CollectionEffects, _collectionService:CollectionService ) => {
        runner = _runner;
        collectionEffects = _collectionEffects;
        collectionService = _collectionService;
        spyOn(collectionService, 'getCollectionsByAreaSubject')
          .and.returnValue(Observable.of(mockCollectionsForSubject));
        runner.queue(new CollectionSubjectAction('1', '1'));

        collectionEffects.collectionsBySubjectArea$.subscribe(result => {
          expect(result.type).toEqual(CollectionActionTypes.LIST_BY_AREA_SUBJECT_SUCCESS);
          expect(result.payload.length).toBe(1);
          expect(result.payload[0].title).toEqual('test subject title');
        });
      })
  );

  it('call All Collection List Success action after all collections are retrieved.',
    inject([
        EffectsRunner, CollectionEffects, CollectionService
      ],
      (_runner:EffectsRunner, _collectionEffects:CollectionEffects, _collectionService:CollectionService ) => {
        runner = _runner;
        collectionEffects = _collectionEffects;
        collectionService = _collectionService;
        spyOn(collectionService, 'getAllCollections')
          .and.returnValue(Observable.of(mockCollectionsForSubject.concat(mockCollections)));
        runner.queue(new AllCollectionsAction());

        collectionEffects.collectionsAll$.subscribe(result => {
          expect(result.type).toEqual(CollectionActionTypes.LIST_ALL_SUCCESS_ACTION);
          expect(result.payload.length).toBe(2);
          expect(result.payload[0].title).toEqual('test subject title');
        });
      })
  );

  it('call All Collection List Success action after all collections by subject are retrieved.',
    inject([
        EffectsRunner, CollectionEffects, CollectionService
      ],
      (_runner:EffectsRunner, _collectionEffects:CollectionEffects, _collectionService:CollectionService ) => {
        runner = _runner;
        collectionEffects = _collectionEffects;
        collectionService = _collectionService;
        spyOn(collectionService, 'getCollectionsBySubject')
          .and.returnValue(Observable.of(mockCollectionsForSubject));
        runner.queue(new AllCollectionSubjectAction('1'));

        collectionEffects.collectionsBySubject$.subscribe(result => {
          expect(result.type).toEqual(CollectionActionTypes.LIST_ALL_BY_SUBJECT_SUCCESS);
          expect(result.payload.length).toBe(1);
          expect(result.payload[0].title).toEqual('test subject title');
        });
      })
  );
});
