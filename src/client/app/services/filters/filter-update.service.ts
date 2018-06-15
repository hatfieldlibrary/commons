

import {Injectable} from '@angular/core';
import {AreaFilterType} from '../../shared/data-types/area-filter.type';
import {SetAreaFilter, SetGroupFilter, SetSubjectFilter, SetTypeFilter} from '../../actions/filter.actions';
import * as fromRoot from '../../reducers';
import {Store} from '@ngrx/store';
import {TypesFilterType} from '../../shared/data-types/types-filter.type';
import {SubjectType} from '../../shared/data-types/subject.type';
import {CollectionGroupType} from '../../shared/data-types/collection-group-type';

@Injectable()
export class FilterUpdateService {

  private selectedAreas: AreaFilterType[];
  private areaList: AreaFilterType[];
  private selectedTypes: TypesFilterType[];
  private typeList: TypesFilterType[];
  private subjectList: SubjectType[];
  private selectedSubjects: SubjectType[];
  private groupList: CollectionGroupType[];
  private selectedGroups: CollectionGroupType[];
  private AREA_KEY = 'areas';
  private TYPE_KEY = 'types';
  private SUBJECT_KEY = 'subjects';
  private GROUP_KEY = 'groups';

  constructor(private store: Store<fromRoot.State>) {}

  removeSelectedAreaFilter(): void {
    this.store.dispatch(new SetSubjectFilter([{id: 0, name: ''}]));
  }

  /**
   * Updates the selected area Store and returns the new selected areas array.
   * @param {AreaFilterType[]} selectedAreas the current selected areas
   * @param {AreaFilterType[]} areaList the list of all areas
   * @param {number} areaId the selected area
   * @returns {AreaFilterType[]} the updated list of selected areas.
   */
   updateSelectedAreaStore(selectedAreas: AreaFilterType[], areaList: AreaFilterType[], areaId: number): AreaFilterType[] {
     this.selectedAreas = selectedAreas;
     this.areaList = areaList;
    // Get area filter information for the selected areaId.
    const selectedArea: AreaFilterType = this.getSelectedAreaObject(areaId);
    if (selectedArea) {
      this.removeDefaultCollections(this.AREA_KEY);
      // Update selectedAreas.
      this.updateSelectedAreas(selectedArea, areaId);
      // Update the store.
      this.store.dispatch(new SetAreaFilter(this.selectedAreas));
      return this.selectedAreas;
    }
  }

  /**
   * This function updates the selected types store.
   * @param {number} areaId
   */
  updateSelectedTypeStore(selectedTypes: TypesFilterType[], typeList: TypesFilterType[], typeId: number): TypesFilterType[] {
    this.selectedTypes = selectedTypes;
    this.typeList = typeList;
    // Get area filter information for the selected areaId.
    const selectedType: TypesFilterType = this.getSelectedTypeObject(typeId);
    if (selectedType) {
      // Update selectedAreas.
      this.updateSelectedTypes(selectedType, typeId);
      // Make sure the default id: '0' does not creep in!
      this.removeDefaultCollections(this.TYPE_KEY);
      // Update the store.
      this.store.dispatch(new SetTypeFilter(this.selectedTypes));
      return this.selectedTypes;
    }
  }

  /**
   * This function updates the selected subject store.
   * @param {number} areaId
   */
  updateSelectedSubjectsStore(selectedSubjects: SubjectType[], subjectList: SubjectType[], subjectId: number): SubjectType[] {
    this.selectedSubjects = selectedSubjects;
    this.subjectList = subjectList;
    // Get area filter information for the selected areaId.
    const selectedSubject: SubjectType = this.getSelectedSubjectObject(subjectId);
    if (selectedSubject) {
      // Update selectedAreas.
      this.updateSelectedSubjects(selectedSubject, subjectId);
      // Make sure the default id: '0' does not creep in!
      this.removeDefaultCollections(this.SUBJECT_KEY);
      // Update the store.
      this.store.dispatch(new SetSubjectFilter(this.selectedSubjects));
      return this.selectedSubjects;
    }
  }

  updateSelectedGroupsStore(selectedGroups: CollectionGroupType[],
                            groupList: CollectionGroupType[],
                            groupId: number): CollectionGroupType[] {
    this.selectedGroups = selectedGroups;
    this.groupList = groupList;
    // Get area filter information for the selected areaId.
    const selectedGroup: CollectionGroupType = this.getSelectedSubjectObject(groupId);
    if (selectedGroups) {
      // Update selectedAreas.
      this.updateSelectedGroups(selectedGroup, groupId);
      // Make sure the default id: '0' does not creep in!
      this.removeDefaultCollections(this.GROUP_KEY);
      // Update the store.
      this.store.dispatch(new SetGroupFilter(this.selectedGroups));
      return this.selectedGroups;
    }
  }

  // /**
  //  * Generates the comma-separated list of ids. The string returned can
  //  * be empty. This function accepts an array of objects that include
  //  * an id field. If the id field is missing, an empty string is returned
  //  * and an illegal type message is logged to console.
  //  * @param {any[]} list list of filters
  //  * @returns {string}
  //  */
  // getIds(list: any[]): string {
  //   // do runtime check of the list shape.
  //   if (this.isIllegalType(list)) {
  //     throw new Error('Illegal type: The Array must contain objects that have an id field.');
  //   }
  //   let ids = '';
  //   if (typeof list !== 'undefined' && typeof list[0] !== 'undefined') {
  //     list.forEach(item => {
  //       ids = ids + item.id + ','
  //     });
  //   }
  //   return ids.slice(0, -1);
  // }
  //
  // /**
  //  * Verifies that the request is an array of objects that
  //  * include and id field. All filter types must include an
  //  * id (AreaFilterTypes, TypesFilterType, SubjectFilterType).
  //  * These objects to not have an identical shape, to all do
  //  * include the id field.
  //  * @param list the list of objects
  //  * @returns {boolean}
  //  */
  // private isIllegalType(list) {
  //   if (list.length > 0) {
  //     return typeof list[0].id === 'undefined';
  //   }
  //   return false;
  // }

  /**
   * Update selected types.
   * @param {TypesFilterType} selectedType
   * @param {number} areaId
   */
  private updateSelectedTypes(selectedType: TypesFilterType, typeId: number): void {
    const currentIndex = this.getPositionInSelectedList(typeId, this.TYPE_KEY);
    if (currentIndex >= 0) {
      // If the currently selected index is in the list, remove.
      this.selectedTypes.splice(currentIndex, 1);
      // If the selected list is empty, set to default (all collections).
      if (this.selectedTypes.length === 0) {
        this.selectedTypes.push({id: 0, name: ''});
      }
    } else {
      // Otherwise, just add the new type.
      this.selectedTypes.push(selectedType);
    }
  }

  private updateSelectedSubjects(selectedSubject: SubjectType, subjectId: number): void {
    const currentIndex = this.getPositionInSelectedList(subjectId, this.SUBJECT_KEY);
    if (currentIndex >= 0) {
      // If the currently selected index is in the list, remove.
      this.selectedSubjects.splice(currentIndex, 1);
      // If the selected list is empty, set to default (all collections).
      if (this.selectedSubjects.length === 0) {
        this.selectedSubjects.push({id: 0, name: ''});
      }
    } else {
      // Otherwise, just add the new subject.
      this.selectedSubjects.push(selectedSubject);
    }
  }

  private updateSelectedGroups(selectedGroup: CollectionGroupType, groupId: number): void {
    const currentIndex = this.getPositionInSelectedList(groupId, this.GROUP_KEY);
    if (currentIndex >= 0) {
      // If the currently selected index is in the list, remove.
      this.selectedGroups.splice(currentIndex, 1);
      // If the selected list is empty, set to default (all collections).
      if (this.selectedGroups.length === 0) {
        this.selectedGroups.push({id: 0, name: ''});
      }
    } else {
      // Otherwise, just add the new group.
      this.selectedGroups.push(selectedGroup);
    }
  }

  /**
   * Gets the area list item with the provided id from the list of all areas.
   * @param {number} areaId the id of the area to retrieve
   * @returns {AreaFilterType}
   */
  private getSelectedAreaObject(areaId: number): AreaFilterType {
    return this.areaList.find((current) => current.id === areaId);
  }

  private getSelectedTypeObject(typeId: number): TypesFilterType {
    return this.typeList.find((current) => current.id === typeId);
  }

  private getSelectedSubjectObject(subjectId: number): SubjectType {
    return this.subjectList.find((current) => current.id === subjectId);
  }

  private getSelectedGroupObject(groupId: number): CollectionGroupType {
    return this.groupList.find((current) => current.id === groupId);
  }

  /**
   * Gets the position index in id string that matches the provided id.
   * @param {number} id the id of the resource
   * @param {string} type the type constant for the resource
   * @returns {number}
   */
  private getPositionInSelectedList(id: number, type: string): number {
    if (type === this.AREA_KEY) {
      return this.selectedAreas.findIndex((current) => current.id === id);
    } else if (type === this.SUBJECT_KEY) {
      return this.selectedSubjects.findIndex((current) => current.id === id);
    }  else if (type === this.TYPE_KEY) {
      return this.selectedTypes.findIndex((current) => current.id === id);
    } else if (type === this.GROUP_KEY) {
      return this.selectedGroups.findIndex((current) => current.id === id);
    } else {
      return 0;
    }
  }

  /**
   * Removes the all collections area (id: 0) from selectedAreas
   * (if it is present). The collection with 0 id will always be
   * present when no collection filter is currently selected.
   */
  private removeDefaultCollections(type: string): void {
    const zeroIndex = this.getPositionInSelectedList(0, type);
    if (zeroIndex === 0) {
      if (type === this.AREA_KEY) {
        this.selectedAreas.shift();
      } else if (type === this.SUBJECT_KEY) {
        this.selectedSubjects.shift();
      }  else {
        this.selectedTypes.shift();
      }
    }
  }

  /**
   * Update selected areas.
   * @param {AreaFilterType} selectedArea
   * @param {number} areaId
   */
  private updateSelectedAreas(selectedArea: AreaFilterType, areaId: number) {
    const currentIndex = this.getPositionInSelectedList(areaId, this.AREA_KEY);
    if (currentIndex >= 0) {
      // If the currently selected index is in the list, remove.
      this.selectedAreas.splice(currentIndex, 1);
      // If the selected list is empty, set to default (all collections).
      if (this.selectedAreas.length === 0) {
        this.selectedAreas.push({id: 0, title: '', count: 0});
      }
    } else {
      // Otherwise, just add the new area.
      this.selectedAreas.push(selectedArea);
    }
  }


}
