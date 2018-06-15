import { Injectable } from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromRoot from '../reducers';
import * as typeActions from '../actions/type.actions';
import {AreaSubjectParams} from '../actions/area-subject-parameters.interface';
import * as subjectAction from '../actions/subject-actions';
import * as areaActions from '../actions/area.actions';
import * as groupActions from '../actions/collection-group.actions';
import {AreaParams} from '../actions/area.actions';
import * as listActions from '../actions/collection.actions';
import {TypeAreaSubjectParams} from '../actions/type-area-subject-parameters.interface';
import {NavigationService} from './navigation/navigation.service';

/**
 * This class handles all store dispatch requests for the application.
 */
@Injectable()
export class DispatchService {

  constructor(private store: Store<fromRoot.State>,
              private navigation: NavigationService) { }

  dispatchActions(areaId: string, typeId: string, subjectId: string, categoryId: string): void {
    this.getAreaInformation(areaId);
    if (categoryId) {
      // Category lookups are provided with types and areas. This provides and
      // option for lookups by administrative units (e.g. HFMA or Archives).
      if (typeId) {
        if (areaId) {
          this.getCollectionsForCategoryAreaType(categoryId, areaId, typeId);
          this.getSubjectsForAreaType(areaId, typeId);
          this.getTypesForArea(areaId);
        } else {
          this.getCollectionsForCategoryType(categoryId, typeId);
          this.getSubjectsForType(typeId);
          this.getAllTypes();
        }
      }
    } else if (areaId) {
      // Area lookups can be by subject, type, or all collections in an area.
      if (subjectId) {
        if (typeId) {
          console.log('all 3')
          this.getCollectionsForTypeAreaSubject(areaId, typeId, subjectId);
          this.getCollectionGroupsBySubjectType(subjectId, typeId);
          this.getSubjectsForAreaType(areaId, typeId);
        } else {
          console.log('just 2')
          this.getCollectionsForAreaSubject(areaId, subjectId);
          this.getCollectionGroupsBySubject(subjectId);
          this.getSubjectsForArea(areaId);
        }
        this.getTypesForAreaSubject(areaId, subjectId);
      } else {
        if (typeId) {
          this.getCollectionsForAreaType(areaId, typeId);
          this.getSubjectsForAreaType(areaId, typeId);
          this.getCollectionGroupsByType(typeId);
        } else {
          this.getCollectionsForArea(areaId);
          this.getSubjectsForArea(areaId);
          this.getCollectionGroupsByArea(areaId);
        }
        this.getTypesForArea(areaId);
      }
    } else if (subjectId) {
      // Subject lookups can be by type or all collections.
      if (typeId) {
        console.log('here?')
        this.getCollectionsForTypeSubject(typeId, subjectId);
        this.getSubjectsForType(typeId);
        this.getCollectionGroupsBySubjectType(subjectId, typeId);
      } else {
        this.getCollectionsForSubject(subjectId);
        this.getAllSubjects();
        this.getCollectionGroupsBySubject(subjectId);
      }
      this.getTypesForSubject(subjectId);
    } else {
     // Type lookup (with fallback to all collections if type is missing.)
      if (typeId) {
        this.getCollectionsForType(typeId);
        this.getSubjectsForType(typeId);
        this.getCollectionGroupsByType(typeId);
        this.getAllTypes();
      } else {
        this.getAllCollections();
        this.getAllSubjects();
        this.getAllCollectionGroups();
        this.getAllTypes();
      }
    }
  }

  getAllAreas(): void {
    this.store.dispatch(new areaActions.AreaListAction());
  }

  getAreasByType(typeId: string): void {
    this.store.dispatch(new areaActions.AreaListByType(typeId))
  }

  getAreasBySubject(subjectId: string): void {
    this.store.dispatch(new areaActions.AreaListBySubject(subjectId));
  }

  getAreasByTypeAndSubject(typeId: string, subjectId: string): void {
    const parameters: AreaParams = {typeId: typeId, subjectId: subjectId};
    this.store.dispatch(new areaActions.AreaListByTypeSubject(parameters));
  }

  private getAllSubjects(): void {
    this.store.dispatch(new subjectAction.AllSubjectAction());
  }

  private getSubjectsForArea(areaId: string): void {
    this.store.dispatch((new subjectAction.SubjectAction((areaId))));
  }

  private getSubjectsForType(typeId: string): void {
    this.store.dispatch(new subjectAction.SubjectsForTypes(typeId));
  }

  private getSubjectsForAreaType(areaId: string, typeId: string): void {
    this.store.dispatch(new subjectAction.SubjectsForAreaTypes(areaId, typeId));
  }

  private getAllTypes() {
    this.store.dispatch(new typeActions.ContentTypesAllAction());
  }

  private getTypesForArea(areaId) {
    this.store.dispatch(new typeActions.ContentTypesAreaAction(areaId));
  }

  private getTypesForSubject(subjectId) {
    this.store.dispatch(new typeActions.ContentTypesSubjectAction(subjectId));
  }

  private getAllCollectionGroups() {
    this.store.dispatch(new groupActions.AllGroupsAction());
  }

  private getCollectionGroupsByArea(id: string) {
    this.store.dispatch(new groupActions.GroupsByArea(id));
  }

  private getCollectionGroupsByType(id: string) {
    this.store.dispatch(new groupActions.GroupsByType(id));
  }

  private getCollectionGroupsBySubject(id: string) {
    this.store.dispatch(new groupActions.GroupsBySubject(id));
  }

  private getCollectionGroupsByAreaSubject(areaId: string, subjectId: string) {
    this.store.dispatch(new groupActions.GroupsByAreaSubject(areaId, subjectId));
  }

  private getCollectionGroupsByAreaType(areaId: string, typeId: string) {
    this.store.dispatch(new groupActions.GroupsByAreaType(areaId, typeId));
  }

  private getCollectionGroupsBySubjectType(subjectId: string, typeId: string) {
    this.store.dispatch(new groupActions.GroupsBySubjectType(subjectId, typeId));
  }


  private getCollectionGroupsByAreaSubjectType(areaId: string, subjectId: string, typeId: string) {
    this.store.dispatch(new groupActions.GroupsByAreaSubjectType(areaId, subjectId, typeId));
  }

  private getTypesForAreaSubject(areaId: string, subjectId: string) {
    const areaIds: Array<string> = areaId.split(',');
    const requestParams: AreaSubjectParams = {areas: areaIds, subject: subjectId};
    this.store.dispatch(new typeActions.ContentTypesAreaSubjectAction(requestParams));
  }
  /**
   * Dispatches action for areas information and for list of
   * subjects assigned to the areas..
   * @param areaId
   */
  private getAreaInformation(areaId: string): void {
    if (!this.navigation.isAreaSelected(areaId)) {
      areaId = '0';
    }
    this.store.dispatch(new areaActions.AreaInformation(areaId));
  }

  private getCollectionsForCategoryAreaType(categoryId: string, areaId: string, typeId: string) {
    if (!this.navigation.isAreaSelected(areaId)) {
      areaId = '0';
    }
    this.store.dispatch(new listActions.CollectionsCategoryAreaTypeAction(categoryId, areaId, typeId))
  }

  private getCollectionsForCategoryType(categoryId: string, typeId: string) {
    this.store.dispatch(new listActions.CollectionsCategoryTypeAction(categoryId, typeId))
  }
  /**
   * Dispatches action for collections by subject and areas.
   * @param subjectId
   * @param areaId
   */
  private getCollectionsForSubject(subjectId: string): void {
    this.store.dispatch(new listActions.CollectionsSubjectAction(subjectId));
  }

  private getCollectionsForAreaSubject(areaId: string, subjectId: string): void {
    this.store.dispatch(new listActions.CollectionsAreaSubjectAction(areaId, subjectId));
  }
  /**
   * Dispatches action for collections in an areas.
   * @param areaId
   */
  private getCollectionsForArea(areaId: string): void {
    this.store.dispatch(new listActions.CollectionsAreaAction(areaId));
  }
  /**
   * Dispatches action to fetch all collections.
   */
  private getAllCollections(): void {
     // this.title = 'All Collections';
    this.store.dispatch(new listActions.AllCollectionsAction());
  }

  private getCollectionsForType(typeId: string): void {
    this.store.dispatch(new listActions.CollectionsTypeAction(typeId));
  }

  private getCollectionsForTypeSubject(typeId: string, subjectId: string): void {
    const params: TypeAreaSubjectParams = {
      areas: [],
      types: typeId.split(','),
      subjects: subjectId
    };
    this.store.dispatch(new listActions.CollectionsTypeSubjectAction(params));
  }

  private getCollectionsForTypeAreaSubject(areaId: string, typeId: string, subjectId: string): void {
    const params: TypeAreaSubjectParams = {
      areas: areaId.split(','),
      types: typeId.split(','),
      subjects: subjectId
    };
    this.store.dispatch(new listActions.CollectionsTypeAreaSubjectAction(params));
  }

  private getCollectionsForAreaType(areaId: string, typeId: string): void {
    const params: TypeAreaSubjectParams = {
      areas: areaId.split(','),
      types: typeId.split(','),
      subjects: ''
    };
    this.store.dispatch(new listActions.CollectionsTypeAreaAction(params));
  }

}
