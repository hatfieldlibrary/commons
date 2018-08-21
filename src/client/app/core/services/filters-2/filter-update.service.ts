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

import {Injectable} from '@angular/core';
import {SetAreaFilter, SetGroupFilter, SetSubjectFilter, SetTypeFilter} from '../../ngrx/actions/filter.actions';
import * as fromRoot from '../../ngrx/reducers';
import {Store} from '@ngrx/store';
import {FieldFilterType} from '../../data-types/field-filter.type';

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
@Injectable({
  providedIn: 'root'
})
export class FilterUpdateServiceB {

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
   * Handles filter updates for all field types.
   * @param {FieldFilterType[]} selectedFields the current selected fields
   * @param {FieldFilterType[]} fields all available fields
   * @param {number} fieldId the field id for the newly selected field
   * @param {FieldTypeKey} type the field type
   * @returns {FieldFilterType[]}
   */
   updateSelectedFields(selectedFields: FieldFilterType[],
                               fields: FieldFilterType[],
                               fieldId: number,
                               type: FieldTypeKey) {
    // Remove the default field from the selected fields list if it exists.
    selectedFields = this.removeDefaultCollection(selectedFields);
    // Get the FieldFilerType object for the newly selected field.
    const selectedField: FieldFilterType = this.getSelectedFieldObject(fieldId, fields);
    // Get the index of the selected field from the array of currently selected fields.
    // The index value will be positive if the field is being de-selected.
    const currentIndex = this.getPositionInSelectedList(selectedFields, selectedField);
    // Now update based on type.
    switch (type) {
      case FieldTypeKey.TYPE: {
        this.selectedTypes = this.modifyFieldList(selectedFields, selectedField, currentIndex);
        this.store.dispatch(new SetTypeFilter(selectedFields));
        return this.selectedTypes;
      }
      case FieldTypeKey.SUBJECT: {
        this.selectedSubjects = this.modifyFieldList(selectedFields, selectedField, currentIndex);
        this.store.dispatch(new SetSubjectFilter(selectedFields));
        return this.selectedSubjects;
      }
      case FieldTypeKey.GROUP: {
        this.selectedGroups = this.modifyFieldList(selectedFields, selectedField, currentIndex);
        this.store.dispatch(new SetGroupFilter(selectedFields));
        return this.selectedGroups;
      }
      default: {
        console.log('Error: Unrecognized field type.');
      }
    }
  }

  /**
   * Supports adding or removing filters from selected list.  Removes the filter if a positive index position
   * is provided (i.e. the item was previously selected and is now being de-selected). Otherwise returns
   * list with the additional member.
   * @param {FieldFilterType[]} list selected filter list
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
   * Gets the position index in id string that matches the provided id.
   * @param {FieldFilterType} field the id of the resource
   * @param {string} type the type constant for the resource
   * @returns {number}
   */
  private getPositionInSelectedList(selectedFields: FieldFilterType[], field: FieldFilterType): number {
    return (selectedFields.findIndex((current) => current.id === field.id))
  }

  /**
   * The removes the default field value (if it exists) from the first position in the array.
   */
  private removeDefaultCollection(fieldList: FieldFilterType[]): FieldFilterType[] {
    const zeroIndex = this.getPositionInSelectedList(fieldList, {id: 0, name: ''});
    if (zeroIndex === 0) {
      fieldList.shift();
    }
    return fieldList;
  }

}
