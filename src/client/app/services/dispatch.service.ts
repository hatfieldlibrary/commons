import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromRoot from '../reducers';
import * as typeActions from '../actions/type.actions';
import * as subjectAction from '../actions/subject-actions';
import * as areaActions from '../actions/area.actions';
import * as groupActions from '../actions/collection-group.actions';
import {AreaParams} from '../actions/area.actions';
import * as listActions from '../actions/collection.actions';
import {TypeAreaSubjectParams} from '../actions/type-area-subject-parameters.interface';
import {NavigationServiceB} from './navigation-2/navigation.service';
import {TypesFilterInterface} from '../actions/type.actions';

/**
 * This class handles all store dispatch requests for the application.
 */
@Injectable()
export class DispatchService {

  constructor(private store: Store<fromRoot.State>,
              private navigation: NavigationServiceB) {
  }

  dispatchActions(areaId: string, typeId: string, subjectId: string, groupId: string): void {
    this.getAreaInformation(areaId);

    // Empty collection reducer; prevents animation flicker.
    this.store.dispatch(new listActions.CollectionReset());

    if (areaId) {
      if (groupId) {
        if (subjectId) {
          if (typeId) {
            // area, grp, subject, type
            this.getCollectionsForCategoryAreaTypeSubject(groupId, areaId, typeId, subjectId);
            this.getSubjectsForAreaGroupType(areaId, groupId, typeId);
            this.getTypesForAreaGroupSubject(areaId, groupId, subjectId);
            this.getCollectionGroupsByAreaSubjectType(areaId, subjectId, typeId);
          } else {
            // area, grp, subject
            this.getCollectionsForCategoryAreaSubject(groupId, areaId, subjectId);
            this.getSubjectsForAreaGroup(areaId, groupId);
            this.getTypesForAreaGroupSubject(areaId, groupId, subjectId);
            this.getCollectionGroupsByAreaSubject(areaId, subjectId);
          }
        } else if (typeId) {
          // area, grp, type
          this.getCollectionsForCategoryAreaType(groupId, areaId, typeId);
          this.getSubjectsForAreaGroupType(areaId, groupId, typeId);
          this.getTypesForAreaGroup(areaId, groupId);
          this.getCollectionGroupsByAreaType(areaId, typeId);
        } else {
          // area, grp
          this.getCollectionsForCategoryArea(groupId, areaId);
          this.getSubjectsForAreaGroup(areaId, groupId);
          this.getTypesForAreaGroup(areaId, groupId);
          this.getCollectionGroupsByArea(areaId);
        }
      } else if (subjectId) {
        if (typeId) {
          // area, subject type
          this.getCollectionsForTypeAreaSubject(areaId, typeId, subjectId);
          this.getCollectionGroupsByAreaSubjectType(areaId, subjectId, typeId);
          this.getSubjectsForAreaType(areaId, typeId);
        } else {
          // area, subject
          this.getCollectionsForAreaSubject(areaId, subjectId);
          this.getCollectionGroupsBySubject(subjectId);
          this.getSubjectsForArea(areaId);
        }
        this.getTypesForAreaSubject(areaId, subjectId);
      } else if (typeId) {
        // area  type
        this.getCollectionsForAreaType(areaId, typeId);
        this.getSubjectsForAreaType(areaId, typeId);
        this.getCollectionGroupsByAreaType(areaId, typeId);
        this.getTypesForArea(areaId);
      } else {
        // area
        this.getCollectionsForArea(areaId);
        this.getSubjectsForArea(areaId);
        this.getCollectionGroupsByArea(areaId);
        this.getTypesForArea(areaId);
      }
    } else if (groupId) {
      if (subjectId) {
        if (typeId) {
          // grp , sub, type
        } else {
          // grp, sub
        }
      } else if (typeId) {
        // grp type
        this.getCollectionsForCategoryType(groupId, typeId);
        this.getSubjectsForType(typeId);
        this.getAllTypes();
      }
    } else if (subjectId) {
      if (typeId) {
        // subject , type
        this.getCollectionsForTypeSubject(typeId, subjectId);
        this.getSubjectsForType(typeId);
        this.getCollectionGroupsBySubjectType(subjectId, typeId);
      } else {
        this.getCollectionsForSubject(subjectId);
        this.getAllSubjects();
        this.getCollectionGroupsBySubject(subjectId);
      }
      this.getTypesForSubject(subjectId);
    } else if (typeId) {
      // type
      this.getCollectionsForType(typeId);
      this.getSubjectsForType(typeId);
      this.getCollectionGroupsByType(typeId);
      this.getAllTypes();
    } else {
      // all
      this.getAllCollections();
      this.getAllSubjects();
      this.getAllCollectionGroups();
      this.getAllTypes();
    }
  }

  //   if (groupId) {
  //     // Category lookups are provided with types and areas. This provides and
  //     // option for lookups by administrative units (e.g. HFMA or Archives).
  //     if (typeId) {
  //       if (areaId) {
  //         this.getCollectionsForCategoryAreaType(groupId, areaId, typeId);
  //         this.getSubjectsForAreaType(areaId, typeId);
  //         this.getTypesForArea(areaId);
  //       } else {
  //         this.getCollectionsForCategoryType(groupId, typeId);
  //         this.getSubjectsForType(typeId);
  //         this.getAllTypes();
  //       }
  //     } else if (subjectId) {
  //       this.
  //     } else if (areaId) {
  //       this.getCollectionsForCategoryArea(groupId, areaId);
  //       this.getSubjectsForAreaGroup(areaId, groupId);
  //       this.getTypesForAreaGroup(areaId, groupId);
  //     }
  //   } else if (areaId) {
  //     // Area lookups can be by subject, type, or all collections in an area.
  //     if (subjectId) {
  //       if (typeId) {
  //         this.getCollectionsForTypeAreaSubject(areaId, typeId, subjectId);
  //         this.getCollectionGroupsBySubjectType(subjectId, typeId);
  //         this.getSubjectsForAreaType(areaId, typeId);
  //       } else {
  //         this.getCollectionsForAreaSubject(areaId, subjectId);
  //         this.getCollectionGroupsBySubject(subjectId);
  //         this.getSubjectsForArea(areaId);
  //       }
  //       this.getTypesForAreaSubject(areaId, subjectId);
  //     } else {
  //       if (typeId) {
  //         this.getCollectionsForAreaType(areaId, typeId);
  //         this.getSubjectsForAreaType(areaId, typeId);
  //         this.getCollectionGroupsByType(typeId);
  //       } else {
  //         this.getCollectionsForArea(areaId);
  //         this.getSubjectsForArea(areaId);
  //         this.getCollectionGroupsByArea(areaId);
  //       }
  //       this.getTypesForArea(areaId);
  //     }
  //   } else if (subjectId) {
  //     // Subject lookups can be by type or all collections.
  //     if (typeId) {
  //       this.getCollectionsForTypeSubject(typeId, subjectId);
  //       this.getSubjectsForType(typeId);
  //       this.getCollectionGroupsBySubjectType(subjectId, typeId);
  //     } else {
  //       this.getCollectionsForSubject(subjectId);
  //       this.getAllSubjects();
  //       this.getCollectionGroupsBySubject(subjectId);
  //     }
  //     this.getTypesForSubject(subjectId);
  //   } else {
  //     // Type lookup (with fallback to all collections if type is missing.)
  //     if (typeId) {
  //       this.getCollectionsForType(typeId);
  //       this.getSubjectsForType(typeId);
  //       this.getCollectionGroupsByType(typeId);
  //       this.getAllTypes();
  //     } else {
  //       this
  //         .getAllCollections();
  //
  //       this
  //         .getAllSubjects();
  //
  //       this
  //         .getAllCollectionGroups();
  //
  //       this
  //         .getAllTypes();
  //     }
  //   }
  // }

  public getAllAreas(): void {
    this.store.dispatch(new areaActions.AreaListAction());
  }

  public getAreasByType(typeId: string): void {
    this.store.dispatch(new areaActions.AreaListByType(typeId))
  }

  public getAreasBySubject(subjectId: string): void {
    this.store.dispatch(new areaActions.AreaListBySubject(subjectId));
  }

  public  getAreasByTypeAndSubject(typeId: string, subjectId: string): void {
    const parameters: AreaParams = {typeId: typeId, subjectId: subjectId};
    this.store.dispatch(new areaActions.AreaListByTypeSubject(parameters));
  }

  private getAllSubjects(): void {
    this.store.dispatch(new subjectAction.AllSubjectAction());
  }

  private getSubjectsForArea(areaId: string): void {
    this.store.dispatch(new subjectAction.SubjectAction(areaId));
  }

  private getSubjectsForType(typeId: string): void {
    this.store.dispatch(new subjectAction.SubjectsForTypes(typeId));
  }

  private getSubjectsForAreaGroupType(areaId, groupId, typeId): void {
    const params = {
      areaId: areaId,
      groupId: groupId,
      subjectId: null,
      typeId: typeId
    };
    this.store.dispatch(new subjectAction.SubjectsForAreaGroupType(params))
  }

  private getSubjectsForAreaType(areaId: string, typeId: string): void {
    const params = {
      areaId: areaId,
      typeId: typeId,
      groupId: null
    };
    this.store.dispatch(new subjectAction.SubjectsForAreaTypes(params));
  }

  private getSubjectsForAreaGroup(areaId, groupId) {
    const params = {
      areaId: areaId,
      groupId: groupId,
      subjectId: null,
      typeId: null
    };
    this.store.dispatch(new subjectAction.SubjectsForAreaGroup(params))
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

  private getTypesForAreaGroup(areaId, groupId) {
    const params = {
      areaId: areaId,
      groupId: groupId,
      subjectId: null
    };
    this.store.dispatch(new typeActions.ContentTypesAreaGroupAction(params))
  }

  private getTypesForSubjectGroup(subjectId, groupId) {
    const params = {
      areaId: '',
      groupId: groupId,
      subjectId: subjectId
    };
    this.store.dispatch(new typeActions.ContentTypesSubjectGroupAction(params))
  }

  private getTypesForAreaSubjectGroup(areaId, groupId, subjectId) {
    const params = {
      areaId: areaId,
      groupId: groupId,
      subjectId: subjectId
    };
    this.store.dispatch(new typeActions.ContentTypesAreaSubjectGroupAction(params))
  }

  /**
   * Dispatches action to fetch all collections.
   */
  private getAllCollections(): void {
    // this.title = 'All Collections';
    this.store.dispatch(new listActions.AllCollectionsAction());
  }

  /**
   * Dispatches action for collections in an areas.
   * @param areaId
   */
  private getCollectionsForArea(areaId: string): void { // A
    this.store.dispatch(new listActions.CollectionsAreaAction(areaId));
  }

  private getCollectionsForType(typeId: string): void { // T
    this.store.dispatch(new listActions.CollectionsTypeAction(typeId));
  }

  /**
   * Dispatches action for collections by subject and areas.
   * @param subjectId
   * @param areaId
   */
  private getCollectionsForSubject(subjectId: string): void { //  S
    this.store.dispatch(new listActions.CollectionsSubjectAction(subjectId));
  }

  private getCollectionsByGroups(id: string) { // G

  }

  private getCollectionsForTypeSubject(typeId: string, subjectId: string): void { // TS
    const params
      :
      TypeAreaSubjectParams = {
      areas: [],
      types: typeId.split(','),
      subjects: subjectId
    };
    this.store.dispatch(new listActions.CollectionsTypeSubjectAction(params));
  }

  private getCollectionsForAreaType(areaId: string, typeId: string): void { // AT
    const params
      :
      TypeAreaSubjectParams = {
      areas: areaId.split(','),
      types: typeId.split(','),
      subjects: ''
    };
    this.store.dispatch(new listActions.CollectionsTypeAreaAction(params));
  }

  private getCollectionsForCategoryArea(categoryId: string, areaId: string) { // AG
    if (!this.navigation.isAreaSelected(areaId)) {
      areaId = '0';
    }
    this.store.dispatch(new listActions.CollectionsCategoryAreaAction(categoryId, areaId))
  }

  private getCollectionsForCategoryType(categoryId: string, typeId: string) { // GT
    this.store.dispatch(new listActions.CollectionsCategoryTypeAction(categoryId, typeId))
  }

  private getCollectionsForAreaSubject(areaId: string, subjectId: string): void { // AS
    this.store.dispatch(new listActions.CollectionsAreaSubjectAction(areaId, subjectId));
  }

  private getCollectionsForCategorySubject(areaId: string, subjectId: string): void { // SG
    this.store.dispatch(new listActions.CollectionsCategorySubjectAction(areaId, subjectId));
  }

  private getCollectionsForTypeAreaSubject(areaId: string, typeId: string, subjectId: string): void { // AST
    const params
      :
      TypeAreaSubjectParams = {
      areas: areaId.split(','),
      types: typeId.split(','),
      subjects: subjectId
    };
    this.store.dispatch(new listActions.CollectionsTypeAreaSubjectAction(params));
  }

  private getCollectionsForCategoryAreaType(categoryId: string, areaId: string, typeId: string) { // ATG
    if (!this.navigation.isAreaSelected(areaId)) {
      areaId = '0';
    }
    this.store.dispatch(new listActions.CollectionsCategoryAreaTypeAction(categoryId, areaId, typeId))
  }

  private getCollectionsForCategoryAreaSubject(categoryId: string, areaId: string, subjectId: string) { // ASG
    if (!this.navigation.isAreaSelected(areaId)) {
      areaId = '0';
    }
    this.store.dispatch(new listActions.CollectionsCategoryAreaSubjectAction(categoryId, areaId, subjectId))
  }

  private getCollectionsForCategoryTypeSubject(categoryId: string, areaId: string, typeId: string) { // TSG
    if (!this.navigation.isAreaSelected(areaId)) {
      areaId = '0';
    }
    this.store.dispatch(new listActions.CollectionsCategoryTypeAction(categoryId, typeId))
  }

  private getCollectionsForCategoryAreaTypeSubject(categoryId: string, areaId: string, typeId: string, subjectId: string) { // AGTS
    if (!this.navigation.isAreaSelected(areaId)) {
      areaId = '0';
    }
    this.store.dispatch(new listActions.CollectionsCategoryAreaTypeSubjectAction(categoryId, areaId, typeId, subjectId))
  }

  private getAllCollectionGroups() {
    this.store.dispatch(new groupActions.AllGroupsAction());
  }

  private getCollectionGroupsByAreaType(areaId: string, typeId: string) {
    this.store.dispatch(new groupActions.GroupsByAreaType(areaId, typeId));
  }

  private getCollectionGroupsBySubjectType(subjectId: string, typeId: string) {
    this.store.dispatch(new groupActions.GroupsBySubjectType(subjectId, typeId));
  }

  private getCollectionGroupsByType(id: string) { // GT redundant
    this.store.dispatch(new groupActions.GroupsByType(id));
  }

  private getCollectionGroupsBySubject(id: string) { // GS
    this.store.dispatch(new groupActions.GroupsBySubject(id));
  }

  private getCollectionGroupsByAreaSubject(areaId: string, subjectId) { // GS
    this.store.dispatch(new groupActions.GroupsByAreaSubject(areaId, subjectId));
  }

  private getCollectionGroupsByAreaSubjectType(areaId: string, subjectId: string, typeId: string) {
    this.store.dispatch(new groupActions.GroupsByAreaSubjectType(areaId, subjectId, typeId));
  }

  private getCollectionGroupsByArea(id: string) { // AG -- redundant
    this.store.dispatch(new groupActions.GroupsByArea(id));
  }

  // private getCollectionGroupsForAreaTypeSubject(areaId: string, typeId: string, subjectId: string) {
  //   this.store.dispatch(new groupActions.GroupsByAreaSubjectType(areaId, typeId, subjectId));
  // }

  private getTypesForAreaSubject(areaId: string, subjectId: string) {
    const requestParams: TypesFilterInterface = {areaId: areaId, subjectId: subjectId, groupId: ''};
    this.store.dispatch(new typeActions.ContentTypesAreaSubjectAction(requestParams));
  }

  private getTypesForAreaGroupSubject(areaId: string, groupId, subjectId: string) {
    const requestParams: TypesFilterInterface = {areaId: areaId, subjectId: subjectId, groupId: groupId};
    this.store.dispatch(new typeActions.ContentTypesAreaSubjectGroupAction(requestParams));
  }

  /**
   * Dispatches action for areas information and for list of
   * subjects assigned to the areas..
   * @param areaId
   */
  private getAreaInformation(areaId: string): void {
    if (!
      this.navigation.isAreaSelected(areaId)
    ) {
      areaId = '0';
    }
    this.store.dispatch(new areaActions.AreaInformation(areaId));
  }

}
