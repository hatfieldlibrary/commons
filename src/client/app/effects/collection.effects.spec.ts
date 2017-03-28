
import {EffectsRunner, EffectsTestingModule} from "@ngrx/effects/testing";

import {inject, TestBed} from "@angular/core/testing";
import {Observable} from "rxjs";
import {HttpModule} from "@angular/http";
import {CollectionService} from "../services/collection.service";
import {CollectionEffects} from "./collection.effects";
import {CollectionAction, CollectionActionTypes, CollectionSubjectAction} from "../actions/collection.actions";

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
      (_runner, _collectionEffects, _collectionService ) => {
        runner = _runner;
        collectionEffects = _collectionEffects;
        collectionService = _collectionService;
        spyOn(collectionService, 'getCollectionsByAreaSubject')
          .and.returnValue(Observable.of(mockCollectionsForSubject));
        runner.queue(new CollectionSubjectAction('1', '1'));

        collectionEffects.collectionsByArea$.subscribe(result => {
          expect(result.type).toEqual(CollectionActionTypes.LIST_BY_SUBJECT_SUCCESS);
          expect(result.payload.length).toBe(1);
          expect(result.payload[0].title).toEqual('test subject title');
        });
      })
  );
});

