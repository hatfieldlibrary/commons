import { Injectable } from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromRoot from '../reducers';
import * as typeActions from '../actions/type.actions';
import {AreaSubjectParams} from '../actions/area-subject-parameters.interface';
import * as subjectAction from '../actions/subject-actions';
import * as areaActions from '../actions/area.actions';
import {AreaParams} from '../actions/area.actions';
import * as listActions from '../actions/collection.actions';
import {TypeAreaSubjectParams} from '../actions/type-area-subject-parameters.interface';
import {NavigationService} from './navigation/navigation.service';

@Injectable()
export class DispatchService {

  constructor(private store: Store<fromRoot.State>,
              private navigation: NavigationService) { }

  dispatchActions(areaId: string, typeId: string, subjectId: string): void {
    this.getAreaInformation(areaId);
    if (areaId) {
      if (subjectId) {
        if (typeId) {
          this.getCollectionsForTypeAreaSubject(areaId, typeId, subjectId);
          this.getSubjectsForAreaType(areaId, typeId);
        } else {
          this.getCollectionsForAreaSubject(areaId, subjectId);
          this.getSubjectsForArea(areaId);
        }
        this.getTypesForAreaSubject(areaId, subjectId);
      } else {
        if (typeId) {
          this.getCollectionsForAreaType(areaId, typeId);
          this.getSubjectsForAreaType(areaId, typeId);
        } else {
          this.getCollectionsForArea(areaId);
          this.getSubjectsForArea(areaId);
        }
        this.getTypesForArea(areaId);
      }
    } else if (subjectId) {
      // this.areaScreen = true;
      if (typeId) {
        this.getCollectionsForTypeSubject(typeId, subjectId);
        this.getSubjectsForType(typeId);
      } else {
        this.getCollectionsForSubject(subjectId);
        this.getAllSubjects();
      }
      // this.setAllCollectionTitle();
      this.getTypesForSubject(subjectId);
    } else {
     // this.areaScreen = true;
      if (typeId) {
        this.getCollectionsForType(typeId);
        this.getSubjectsForType(typeId);
      } else {
        this.getAllCollections();
        this.getAllSubjects();
      }
      this.getAllTypes();
     // this.areaScreen = true;
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
      subject: subjectId
    };
    this.store.dispatch(new listActions.CollectionsTypeSubjectAction(params));
  }

  private getCollectionsForTypeAreaSubject(areaId: string, typeId: string, subjectId: string): void {
    const params: TypeAreaSubjectParams = {
      areas: areaId.split(','),
      types: typeId.split(','),
      subject: subjectId
    };
    this.store.dispatch(new listActions.CollectionsTypeAreaSubjectAction(params));
  }

  private getCollectionsForAreaType(areaId: string, typeId: string): void {
    const params: TypeAreaSubjectParams = {
      areas: areaId.split(','),
      types: typeId.split(','),
      subject: ''
    };
    this.store.dispatch(new listActions.CollectionsTypeAreaAction(params));
  }

}