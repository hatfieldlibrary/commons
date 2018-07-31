import {Injectable} from '@angular/core';
import {SetAreaFilter, SetGroupFilter, SetSubjectFilter, SetTypeFilter} from '../../actions/filter.actions';
import * as fromRoot from '../../reducers';
import {Store} from '@ngrx/store';
import {FieldFilterType} from '../../shared/data-types/field-filter.type';

export enum FieldTypeKey {
  AREA,
  TYPE,
  SUBJECT,
  GROUP
}

/**
 * The filter selection components use this service to update the state of the application filters.
 * After updating the store, the public functions return an updated selected filters list
 * to the calling component.
 */
@Injectable()
export class FilterUpdateServiceB {

  private selectedAreas: FieldFilterType[];
  private selectedTypes: FieldFilterType[];
  private selectedSubjects: FieldFilterType[];
  private selectedGroups: FieldFilterType[];

  constructor(private store: Store<fromRoot.State>) {
  }

  /**
   * Public method for updating the selected area. The current application permits only a single area
   * to be selected at any time. If multiple areas are needed, this function will look
   * like the functions for other filter types.
   * @param {FieldFilterType[]} areaList
   * @param {number} areaId
   * @returns {FieldFilterType[]} the updated selected area list
   */
  updateSelectSingleAreaStore(areaList: FieldFilterType[], areaId: number): FieldFilterType[] {
    const selectedArea: FieldFilterType = this.getSelectedFieldObject(areaId, areaList);
    if (selectedArea) {
      this.store.dispatch(new SetAreaFilter([selectedArea]));
      return [selectedArea];
    }
  }

  /**
   * Public method for updating selected types in the application state.
   * @param {FieldFilterType[]} selectedTypes the currently selected types.
   * @param {FieldFilterType[]} typeList the list of all available types
   * @param {number} typeId the id of the newly selected type
   * @returns {FieldFilterType[]} the updated selected types list
   */
  updateSelectedTypeStore(selectedTypes: FieldFilterType[],
                          typeList: FieldFilterType[],
                          typeId: number): FieldFilterType[] {
    this.selectedTypes = selectedTypes;
    return this.updateSelectedFields(selectedTypes, typeList, typeId, FieldTypeKey.TYPE);
  }

  /**
   * Public method for updating selected subjects in the application state.
   * @param {FieldFilterType[]} selectedSubjects the currently selected subjects.
   * @param {FieldFilterType[]} subjectList the list of all available subjects
   * @param {number} subjectId the id of the newly selected subject
   * @returns {FieldFilterType[]} the updated selected subjects list
   */
  updateSelectedSubjectsStore(selectedSubjects: FieldFilterType[],
                              subjectList: FieldFilterType[],
                              subjectId: number): FieldFilterType[] {
    this.selectedSubjects = selectedSubjects;
    return this.updateSelectedFields(selectedSubjects, subjectList, subjectId, FieldTypeKey.SUBJECT);
  }

  /**
   * Public method for updating selected groups in the application state.
   * @param {FieldFilterType[]} selectedGroups the currently selected groups.
   * @param {FieldFilterType[]} groupList this list of all available groups
   * @param {number} groupId the newly selected group
   * @returns {FieldFilterType[]} the updated selected groups list
   */
  updateSelectedGroupsStore(selectedGroups: FieldFilterType[],
                            groupList: FieldFilterType[],
                            groupId: number): FieldFilterType[] {
    this.selectedGroups = selectedGroups;
    return this.updateSelectedFields(selectedGroups, groupList, groupId, FieldTypeKey.GROUP);
  }

  /**
   * Handles filter updates for all field types.
   * @param {FieldFilterType[]} selectedFields the current selected fields
   * @param {FieldFilterType[]} fields all available fields
   * @param {number} fieldId the field id for the newly selected field
   * @param {FieldTypeKey} type the field type
   * @returns {FieldFilterType[]}
   */
  private updateSelectedFields(selectedFields: FieldFilterType[],
                               fields: FieldFilterType[],
                               fieldId: number,
                               type: FieldTypeKey) {

    const selectedField: FieldFilterType = this.getSelectedFieldObject(fieldId, fields);

    switch (type) {
      case FieldTypeKey.TYPE: {
        this.updateSelectedTypes(selectedField);
        // Make sure the default id: '0' does not creep in!
        this.removeDefaultCollections(FieldTypeKey.TYPE);
        // Update the store.
        this.store.dispatch(new SetTypeFilter(selectedFields));
        return this.selectedTypes;
      }
      case FieldTypeKey.SUBJECT: {
        this.updateSelectedSubjects(selectedField);
        this.removeDefaultCollections(FieldTypeKey.SUBJECT);
        this.store.dispatch(new SetSubjectFilter(selectedFields));
        return this.selectedSubjects;
      }
      case FieldTypeKey.GROUP: {
        this.updateSelectedGroups(selectedField);
        this.removeDefaultCollections(FieldTypeKey.GROUP);
        this.store.dispatch(new SetGroupFilter(selectedFields));
        return this.selectedGroups;
      }
      default: {
        console.log('Error: Unrecognized field type.');
      }
    }
  }

  /**
   * Updates the local selected types field.
   * @param {TypesFilterType} selectedType the newly selected field object.
   * @param {number} typeId
   */
  private updateSelectedTypes(selectedType: FieldFilterType): void {
    const currentIndex = this.getPositionInSelectedList(selectedType.id, FieldTypeKey.TYPE);
   this.selectedTypes = this.modifyFieldList(this.selectedTypes, selectedType, currentIndex);
  }

  /**
   * Updates the local selected subjects field.
   * @param {FieldFilterType} selectedSubject the newly selected subject object
   * @param {number} subjectId  new selected subject id
   */
  private updateSelectedSubjects(selectedSubject: FieldFilterType): void {
    const currentIndex = this.getPositionInSelectedList(selectedSubject.id, FieldTypeKey.SUBJECT);
    this.selectedSubjects = this.modifyFieldList(this.selectedSubjects, selectedSubject, currentIndex);
  }

  /**
   * Updates the local selected groups field.
   * @param {FieldFilterType} selectedGroup complete list of group
   * @param {number} groupId  new selected group id
   */
  private updateSelectedGroups(selectedGroup: FieldFilterType): void {
    const currentIndex = this.getPositionInSelectedList(selectedGroup.id, FieldTypeKey.GROUP);
    this.selectedGroups = this.modifyFieldList(this.selectedGroups, selectedGroup, currentIndex);
  }

  /**
   * Supports adding or removing filters from selected list.  Removes the filter if a valid index position
   * is provided (i.e. the item was previously selected and is now being de-selected). Otherwise returns
   * list with additional member.
   * @param {FieldFilterType[]} list field filter list
   * @param {number} position the array index (or -1)
   * @returns {FieldFilterType[]}
   */
  private modifyFieldList(list: FieldFilterType[], selected: FieldFilterType, position: number) {
    if (position >= 0) {
      // If the currently selected index is in the list, remove.
      list.splice(position, 1);
      // If the selected list is empty, set to default (all collections).
      if (list.length === 0) {
        list.push({id: 0, name: ''});
      }
      return list;
    }
    list.push(selected);
    return list;
  }

  /**
   * Gets the FieldFilterType object with id value from the provided list.
   * @param {number} fieldId
   * @param {FieldFilterType[]} list
   * @returns {FieldFilterType}
   */
  private getSelectedFieldObject(fieldId: number, list: FieldFilterType[]): FieldFilterType {
    return list.find((current) => current.id === fieldId);
  }

  /**
   * Gets the position index in id string that matches the provided id. Depends on the
   * local member variable for the corresponding field type.
   * @param {number} id the id of the resource
   * @param {string} type the type constant for the resource
   * @returns {number}
   */
  private getPositionInSelectedList(id: number, type: FieldTypeKey): number {
    if (type === FieldTypeKey.AREA) {
      return this.selectedAreas.findIndex((current) => current.id === id);
    } else if (type === FieldTypeKey.SUBJECT) {
      return this.selectedSubjects.findIndex((current) => current.id === id);
    } else if (type === FieldTypeKey.TYPE) {
      return this.selectedTypes.findIndex((current) => current.id === id);
    } else if (type === FieldTypeKey.GROUP) {
      return this.selectedGroups.findIndex((current) => current.id === id);
    } else {
      return 0;
    }
  }

  /**
   * The removes any Fields with id of zero.
   */
  private removeDefaultCollections(type: FieldTypeKey): void {
    const zeroIndex = this.getPositionInSelectedList(0, type);
    if (zeroIndex === 0) {
      if (type === FieldTypeKey.AREA) {
        this.selectedAreas.shift();
      } else if (type === FieldTypeKey.SUBJECT) {
        this.selectedSubjects.shift();
      } else if (type === FieldTypeKey.GROUP) {
        this.selectedGroups.shift();
      } else if (type === FieldTypeKey.TYPE) {
        this.selectedTypes.shift();
      }
    }
  }

}
