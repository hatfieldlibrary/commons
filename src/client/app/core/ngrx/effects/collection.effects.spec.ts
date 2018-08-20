/*
 * Copyright (c) [2018] [Willamette University]
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * Author: Michael Spalti
 */


import {of as observableOf, Observable, throwError} from 'rxjs';

import {provideMockActions} from '@ngrx/effects/testing';
import {hot, cold} from 'jasmine-marbles';
import {TestBed} from '@angular/core/testing';
import {CollectionService} from '../../services/collection.service';
import {CollectionEffects} from './collection.effects';
import {
  AllCollectionsAction,
  CollectionsAreaAction,
  CollectionActionFailed,
  CollectionsSubjectAction,
  CollectionsAreaSubjectAction,
  CollectionsActionSuccess,
  CollectionsCategoryAreaTypeSubjectAction,
  CollectionsCategoryTypeSubjectAction,
  CollectionsCategoryAreaSubjectAction,
  CollectionsCategoryAreaTypeAction,
  CollectionsCategorySubjectAction, CollectionsCategoryTypeAction, CollectionsCategoryAreaAction
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
      parent: [],
      types: []
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
              return observableOf(mockCollections);
            };
            getCollectionsByAreaSubject = () => {
              return observableOf(mockCollections);
            };
            getCollectionsBySubject = () => {
              return observableOf(mockCollections);
            };
            getAllCollections = () => {
              return observableOf(mockCollections);
            };
            getCollectionsByCategoryArea = () => {
              return observableOf(mockCollections);
            };
            getCollectionsByCategoryType = () => {
              return observableOf(mockCollections);
            };
            getCollectionsByCategoryAreaType = () => {
              return observableOf(mockCollections);
            };
            getCollectionsByCategorySubject = () => {
              return observableOf(mockCollections);
            };
            getCollectionsByCategoryTypeSubject = () => {
              return observableOf(mockCollections);
            };
            getCollectionsByCategoryAreaSubject = () => {
              return observableOf(mockCollections);
            };
            getCollectionsByCategoryAreaTypeSubject = () => {
              return observableOf(mockCollections);
            }
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

    spyOn(collectionService, 'getCollectionsByAreaId').and.callFake(() => { return throwError('test')});
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

    spyOn(collectionService, 'getCollectionsByAreaSubject').and.callFake(() => { return throwError('test') });
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

    spyOn(collectionService, 'getCollectionsBySubject').and.callFake(() => {  return throwError('test') });
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

    spyOn(collectionService, 'getAllCollections').and.callFake(() => {  return throwError('test') });
    const startAction =  new AllCollectionsAction();
    const hotMarble = {a: startAction};
    actions = hot('--a-', hotMarble);
    const failAction = new CollectionActionFailed('test');
    // create error response and complete observable
    const expectedResults = cold('--(b|)',  {b: failAction});
    expect(collectionEffects.collectionsAll$).toBeObservable(expectedResults);

  });

  it('should call success action after collections are retrieved by category and area', () => {

    const startAction =  new CollectionsCategoryAreaAction('1', '1');
    const hotMarble = {a: startAction};
    actions = hot('--a-', hotMarble);
    const successAction = new CollectionsActionSuccess(mockCollections);
    const expectedResults = cold('--b', {b: successAction});
    expect(collectionEffects.collectionsByCategoryArea$).toBeObservable(expectedResults);
  });

  it('should fail collections by category, area', () => {

    spyOn(collectionService, 'getCollectionsByCategoryArea').and.callFake(() => {  return throwError('test') });
    const startAction =  new CollectionsCategoryAreaAction('1', '1');
    const hotMarble = {a: startAction};
    actions = hot('--a-', hotMarble);
    const failAction = new CollectionActionFailed('test');
    // create error response and complete observable
    const expectedResults = cold('--(b|)',  {b: failAction});
    expect(collectionEffects.collectionsByCategoryArea$).toBeObservable(expectedResults);

  });

  it('should call success action after collections are retrieved by category and type', () => {

    const startAction =  new CollectionsCategoryTypeAction('1', '1');
    const hotMarble = {a: startAction};
    actions = hot('--a-', hotMarble);
    const successAction = new CollectionsActionSuccess(mockCollections);
    const expectedResults = cold('--b', {b: successAction});
    expect(collectionEffects.collectionsByCategoryType$).toBeObservable(expectedResults);
  });

  it('should fail collections by category, type', () => {

    spyOn(collectionService, 'getCollectionsByCategoryType').and.callFake(() => {  return throwError('test') });
    const startAction =  new CollectionsCategoryTypeAction('1', '1');
    const hotMarble = {a: startAction};
    actions = hot('--a-', hotMarble);
    const failAction = new CollectionActionFailed('test');
    // create error response and complete observable
    const expectedResults = cold('--(b|)',  {b: failAction});
    expect(collectionEffects.collectionsByCategoryType$).toBeObservable(expectedResults);

  });

  it('should call success action after collections are retrieved by category and subject', () => {

    const startAction =  new CollectionsCategorySubjectAction('1', '1');
    const hotMarble = {a: startAction};
    actions = hot('--a-', hotMarble);
    const successAction = new CollectionsActionSuccess(mockCollections);
    const expectedResults = cold('--b', {b: successAction});
    expect(collectionEffects.collectionsByCategorySubject$).toBeObservable(expectedResults);
  });

  it('should fail collections by category, subject', () => {

    spyOn(collectionService, 'getCollectionsByCategorySubject').and.callFake(() => {  return throwError('test') });
    const startAction =  new CollectionsCategorySubjectAction('1', '1');
    const hotMarble = {a: startAction};
    actions = hot('--a-', hotMarble);
    const failAction = new CollectionActionFailed('test');
    // create error response and complete observable
    const expectedResults = cold('--(b|)',  {b: failAction});
    expect(collectionEffects.collectionsByCategorySubject$).toBeObservable(expectedResults);

  });

  it('should call success action after collections are retrieved by category, area and type', () => {

    const startAction =  new CollectionsCategoryAreaTypeAction('1', '1', '1');
    const hotMarble = {a: startAction};
    actions = hot('--a-', hotMarble);
    const successAction = new CollectionsActionSuccess(mockCollections);
    const expectedResults = cold('--b', {b: successAction});
    expect(collectionEffects.collectionsByCategoryAreaType$).toBeObservable(expectedResults);
  });

  it('should fail collections by category, area, type', () => {

    spyOn(collectionService, 'getCollectionsByCategoryAreaType').and.callFake(() => {  return throwError('test') });
    const startAction =  new CollectionsCategoryAreaTypeAction('1', '1', '1');
    const hotMarble = {a: startAction};
    actions = hot('--a-', hotMarble);
    const failAction = new CollectionActionFailed('test');
    // create error response and complete observable
    const expectedResults = cold('--(b|)',  {b: failAction});
    expect(collectionEffects.collectionsByCategoryAreaType$).toBeObservable(expectedResults);

  });

  it('should call success action after collections are retrieved by category, area and subject', () => {

    const startAction =  new CollectionsCategoryAreaSubjectAction('1', '1', '1');
    const hotMarble = {a: startAction};
    actions = hot('--a-', hotMarble);
    const successAction = new CollectionsActionSuccess(mockCollections);
    const expectedResults = cold('--b', {b: successAction});
    expect(collectionEffects.collectionsByCategoryAreaSubject$).toBeObservable(expectedResults);
  });

  it('should fail collections by category, area, subject', () => {

    spyOn(collectionService, 'getCollectionsByCategoryAreaSubject').and.callFake(() => {  return throwError('test') });
    const startAction =  new CollectionsCategoryAreaSubjectAction('1', '1', '1');
    const hotMarble = {a: startAction};
    actions = hot('--a-', hotMarble);
    const failAction = new CollectionActionFailed('test');
    // create error response and complete observable
    const expectedResults = cold('--(b|)',  {b: failAction});
    expect(collectionEffects.collectionsByCategoryAreaSubject$).toBeObservable(expectedResults);

  });

  it('should call success action after collections are retrieved by category, type and subject', () => {

    const startAction =  new CollectionsCategoryTypeSubjectAction('1', '1', '1');
    const hotMarble = {a: startAction};
    actions = hot('--a-', hotMarble);
    const successAction = new CollectionsActionSuccess(mockCollections);
    const expectedResults = cold('--b', {b: successAction});
    expect(collectionEffects.collectionsByCategoryTypeSubject$).toBeObservable(expectedResults);
  });


  it('should fail collections by category, type, subject', () => {

    spyOn(collectionService, 'getCollectionsByCategoryTypeSubject').and.callFake(() => {  return throwError('test') });
    const startAction =  new CollectionsCategoryTypeSubjectAction('1', '1', '1');
    const hotMarble = {a: startAction};
    actions = hot('--a-', hotMarble);
    const failAction = new CollectionActionFailed('test');
    // create error response and complete observable
    const expectedResults = cold('--(b|)',  {b: failAction});
    expect(collectionEffects.collectionsByCategoryTypeSubject$).toBeObservable(expectedResults);

  });

  it('should call success action after collections are retrieved by all fields', () => {

    const startAction =  new CollectionsCategoryAreaTypeSubjectAction('1', '1', '1', '1');
    const hotMarble = {a: startAction};
    actions = hot('--a-', hotMarble);
    const successAction = new CollectionsActionSuccess(mockCollections);
    const expectedResults = cold('--b', {b: successAction});
    expect(collectionEffects.collectionsByCategoryAreaTypeSubject$).toBeObservable(expectedResults);

  });

  it('should return error action for collections by all fields request', () => {

    spyOn(collectionService, 'getCollectionsByCategoryAreaTypeSubject').and.callFake(() => {  return throwError('test') });
    const startAction =  new CollectionsCategoryAreaTypeSubjectAction('1', '1', '1', '1');
    const hotMarble = {a: startAction};
    actions = hot('--a-', hotMarble);
    const failAction = new CollectionActionFailed('test');
    // create error response and complete observable
    const expectedResults = cold('--(b|)',  {b: failAction});
    expect(collectionEffects.collectionsByCategoryAreaTypeSubject$).toBeObservable(expectedResults);

  });


});

