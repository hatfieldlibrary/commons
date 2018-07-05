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


import {provideMockActions} from '@ngrx/effects/testing';
import {hot, cold} from 'jasmine-marbles';
import {TestBed} from '@angular/core/testing';
import {Observable,} from 'rxjs/Observable';
import {CollectionService} from '../services/collection.service';
import {CollectionEffects} from './collection.effects';
import {
  AllCollectionsAction, CollectionsAreaAction, CollectionActionFailed,
  CollectionsSubjectAction, CollectionsAreaSubjectAction, CollectionsActionSuccess
} from '../actions/collection.actions';

describe('Collections Effect', () => {

  let collectionEffects: CollectionEffects;
  let actions: Observable<any>;
  let collectionService;

  const mockCollections = [
    {
      id: 1,
      title: 'test title',
      image: 'image',
      url: 'url',
      searchUrl: '',
      browseType: '',
      description: '',
      date: '',
      items: '',
      linkOptions: '',
      assetType: '',
      searchOptions: '',
      restricted: true,
      published: false,
      parent: []
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CollectionEffects,
        {
          provide: CollectionService,
          useClass: class {
            getCollectionsByAreaId = () => {
              return Observable.of(mockCollections);
            };
            getCollectionsByAreaSubject = () => {
              return Observable.of(mockCollections);
            };
            getCollectionsBySubject = () => {
              return Observable.of(mockCollections);
            };
            getAllCollections = () => {
              return Observable.of(mockCollections);
            };
          }
        },
        provideMockActions(() => actions)
      ]
    });

    collectionEffects = TestBed.get(CollectionEffects);
    collectionService = TestBed.get(CollectionService);

  });

  it('should call collection success action after collections by areas are retrieved', () => {

    const startAction = new CollectionsAreaAction('1');
    const hotMarble = {a: startAction};
    actions = hot('--a-', hotMarble);
    const successAction = new CollectionsActionSuccess(mockCollections);
    const expectedResults = cold('--b', {b: successAction});
    expect(collectionEffects.collectionsByArea$).toBeObservable(expectedResults);

  });

  it('should return error action for collections by areas', () => {

    spyOn(collectionService, 'getCollectionsByAreaId').and.callFake(() => { return Observable.throw('error') });
    const startAction = new CollectionsAreaAction('1');
    const hotMarble = {a: startAction};
    actions = hot('--a-', hotMarble);
    const failAction = new CollectionActionFailed('test');
    // create error response and complete observable
    const expectedResults = cold('--(b|)',  {b: failAction});
    expect(collectionEffects.collectionsByArea$).toBeObservable(expectedResults);

  });

  it('should call success action after collections by subject and areas are retrieved', () => {

    const startAction = new CollectionsAreaSubjectAction('1', '1');
    const hotMarble = {a: startAction};
    actions = hot('--a', hotMarble);
    const successAction = new CollectionsActionSuccess(mockCollections);
    const expectedResults = cold('--b', {b: successAction});
    expect(collectionEffects.collectionsBySubjectArea$).toBeObservable(expectedResults);

  });

  it('should return error action for collections by subject and areas', () => {

    spyOn(collectionService, 'getCollectionsByAreaSubject').and.callFake(() => { return Observable.throw('error') });
    const startAction = new CollectionsAreaSubjectAction('1', '1');
    const hotMarble = {a: startAction};
    actions = hot('--a-', hotMarble);
    const failAction = new CollectionActionFailed('test');
    // create error response and complete observable
    const expectedResults = cold('--(b|)',  {b: failAction});
    expect(collectionEffects.collectionsBySubjectArea$).toBeObservable(expectedResults);

  });

  it('should call success action after all collections for a subject retrieved', () => {

    const startAction = new CollectionsSubjectAction('1');
    const hotMarble = {a: startAction};
    actions = hot('--a-', hotMarble);
    const successAction = new CollectionsActionSuccess(mockCollections);
    const expectedResults = cold('--b', {b: successAction});
    expect(collectionEffects.collectionsBySubject$).toBeObservable(expectedResults);

  });

  it('should return error action for all collections for a given subject', () => {

    spyOn(collectionService, 'getCollectionsForSubject').and.callFake(() => { return Observable.throw('error') });
    const startAction = new CollectionsSubjectAction('1');
    const hotMarble = {a: startAction};
    actions = hot('--a-', hotMarble);
    const failAction = new CollectionActionFailed('test');
    // create error response and complete observable
    const expectedResults = cold('--(b|)',  {b: failAction});
    expect(collectionEffects.collectionsBySubject$).toBeObservable(expectedResults);

  });

  it('should call success action after all collections are retrieved', () => {

    const startAction = new AllCollectionsAction();
    const hotMarble = {a: startAction};
    actions = hot('--a-', hotMarble);
    const successAction = new CollectionsActionSuccess(mockCollections);
    const expectedResults = cold('--b', {b: successAction});
    expect(collectionEffects.collectionsAll$).toBeObservable(expectedResults);

  });

  it('should return error action for all collections request', () => {

    spyOn(collectionService, 'getAllCollections').and.callFake(() => { return Observable.throw('error') });
    const startAction =  new AllCollectionsAction();
    const hotMarble = {a: startAction};
    actions = hot('--a-', hotMarble);
    const failAction = new CollectionActionFailed('test');
    // create error response and complete observable
    const expectedResults = cold('--(b|)',  {b: failAction});
    expect(collectionEffects.collectionsAll$).toBeObservable(expectedResults);

  });

});

