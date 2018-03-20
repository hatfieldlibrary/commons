

import {Injectable} from '@angular/core';
import {AreaFilterType} from '../../shared/data-types/area-filter.type';
import {SetAreaFilter, SetSubjectFilter, SetTypeFilter} from '../../actions/filter.actions';
import * as fromRoot from '../../reducers';
import {Store} from '@ngrx/store';
import {TypesFilterType} from '../../shared/data-types/types-filter.type';

@Injectable()
export class FilterUpdateService {

  selectedAreas: AreaFilterType[];
  areaList: AreaFilterType[];
  selectedTypes: TypesFilterType[];
  typeList: TypesFilterType[];
  private AREA_KEY = 'areas';
  private TYPE_KEY = 'types';

  constructor(private store: Store<fromRoot.State>) {}

  removeSelectedAreaFilter(): void {
    this.store.dispatch(new SetSubjectFilter({id: 0, name: ''}));
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
      // Otherwise, just add the new area.
      this.selectedTypes.push(selectedType);
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

  /**
   * Gets the position index in selectedAreas for the area that
   * matches the provided id.
   * @param {number} areaId the id of the area
   * @param {string} type the type of filter
   * @returns {number}
   */
  private getPositionInSelectedList(id: number, type: string): number {
    if (type === this.AREA_KEY) {
      return this.selectedAreas.findIndex((current) => current.id === id);
    } else if (type === this.TYPE_KEY) {
      return this.selectedTypes.findIndex((current) => current.id === id);
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
      } else {
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
