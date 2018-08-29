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
import {environment} from '../../../environments/environment';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
import * as fromRoot from '../../ngrx/reducers';
import {select, Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {
  RemoveSelectedGroups,
  RemoveSelectedSubjects,
  RemoveSelectedTypes
} from '../../ngrx/actions/filter.actions';
import {FieldFilterType} from '../../data-types/field-filter.type';
import {FieldValues} from '../../enum/field-names';

interface RouterIds {
  subjectId: string;
  typeId: string;
  groupId: string;
}

@Injectable({
  providedIn: 'root'
})
export class NavigationServiceB {

  urlRootPath = environment.appRoot;
  removedSubjects$: Subscription;
  removedGroups$: Subscription;
  removedTypes$: Subscription;
  removedSubs: FieldFilterType[];
  removedGroups: FieldFilterType[];
  removedTypes: FieldFilterType[];
  previousUrl = '';
  currentUrl = '';
  initialNavigation = true;

  constructor(private router: Router, private store: Store<fromRoot.State>) {
    // Keep track of removed fields in application state (added by AreaFiltersComponent).
    // Before navigation takes place, the selected field ids are checked to verify that
    // they have not been removed. (Field removal is initiated in the AreaFiltersComponent component.)
    // No need to unsubscribe. We're in a singleton.
    this.removedSubjects$ = store.pipe(select(fromRoot.getRemovedSubject)).subscribe(rem => {
      this.removedSubs = rem;
    });
    this.removedTypes$ = store.pipe(select(fromRoot.getRemovedType)).subscribe(rem => {
      this.removedTypes = rem;
    });
    this.removedGroups$ = store.pipe(select(fromRoot.getRemovedGroup)).subscribe(rem => {
      this.removedGroups = rem;
    });

    // This tracks the previous url. Used by to determine whether
    // to dispatch a request for new collection data.
    this.router.events.subscribe((event: any) => {
      // Use NavigationStart (not NavigationEnd) to assure that all
      // route changes are detected before the context is checked.
      if (event instanceof NavigationStart) {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      }
    });
  }

  /**
   * Determines whether the context requires a new request for data. If an this is not the
   * initial collection navigation event and the previous url was an item route, there is no need
   * to update the collection state.
   * @returns {boolean}
   */
  shouldFetchCollectionData(): boolean {
    // When this method is called for the first time, should fetch collection data.
    if (this.initialNavigation) {
      this.initialNavigation = false;
      return true;
    }
    // Should not fetch collection data if navigating from an item view.
    const regex = /\/commons\/item/;
    if (this.previousUrl.match(regex)) {
      return false;
    }
    return true;
  }

  /**
   * Used by components that need to navigate back to the current list. The condition for the zero
   * selectedArea value is for global browsing.  Since we currently do not use global browsing,
   * the implementation is incomplete for now.
   */
  getBackLink(selectedArea: string, selectedGroup: string, selectedSubject: string, selectedTypes: string): string {
    if (selectedArea && selectedArea !== '0') {
      return this._handleAreaBackLinks(selectedArea, selectedGroup, selectedSubject, selectedTypes);
    } else if (selectedArea === '0') {
      return this._handleGlobalBackLinks(selectedSubject, selectedGroup, selectedTypes);
    }
  }

  /**
   * Verifies that the request is an array of objects that
   * include and id field. All filter types must include an
   * id (AreaFilterTypes, TypesFilterType, SubjectType).
   * These objects to not have an identical shape, but all
   * include the id field.
   * @param list the array of objects
   * @returns {boolean}
   */
  private isIllegalType(list: any[]) {
    if (typeof list === 'undefined') {
      return false;
    }
    if (list.length > 0) {
      return typeof list[0].id === 'undefined';
    }
    return false;
  }

  /**
   * Generates the comma-separated list of ids. The string returned can
   * be empty. This function accepts an array of objects that include
   * an id field. If the id field is missing, an empty string is returned
   * and an illegal type message is logged to console.
   * @param {any[]} list list of filters
   * @returns {string}
   */
  getIds(list: FieldFilterType[]): string {
    // do runtime check of the list shape.
    if (this.isIllegalType(list)) {
      throw new Error('Illegal type: The Array must contain objects that have an id field.');
    }
    let ids = '';
    if (typeof list !== 'undefined' && typeof list[0] !== 'undefined' && list[0].id !== 0) {
      list.forEach(item => {
        ids = ids + item.id + ','
      });
    }
    return ids.slice(0, -1);
  }

  public navigateItemRoute(itemId: string): void {
    this.router.navigate([ '/',
      this.urlRootPath,
      'item',
      'id', itemId
    ]);
  }

  public getItemLink(itemId: number): string {
    return '/' + this.urlRootPath + '/item/id/' + itemId;
  }

  public getAreaLink(areaId: number): string {
    return '/' + this.urlRootPath + '/collection/area/' + areaId;
  }

  /**
   * Sets the field ids used for routing. Checks the removed field
   * status and alters the route if fields have been removed by
   * the filter component.
   * @param {string} subjectId
   * @param {string} typeId
   * @param {string} groupId
   * @returns {RouterIds}
   */
  private setIdFields(subjectId: string, typeId: string, groupId: string): RouterIds {
    const ids = {
      subjectId: subjectId,
      typeId: typeId,
      groupId: groupId
    };
    if (this.removedSubs[0].id !== 0) {
      ids.subjectId = this.removeIds(subjectId, this.removedSubs, FieldValues.SUBJECT);
      // Finished removing fields...update store to the default state.
      this.updateStoreWithRemovedFilter(FieldValues.SUBJECT);
    }
    if (this.removedTypes[0].id !== 0) {
      ids.typeId = this.removeIds(typeId, this.removedTypes, FieldValues.TYPE);
      this.updateStoreWithRemovedFilter(FieldValues.TYPE);
    }
    if (this.removedGroups[0].id !== 0) {
      ids.groupId = this.removeIds(groupId, this.removedGroups, FieldValues.GROUP);
      this.updateStoreWithRemovedFilter(FieldValues.GROUP);
    }
    return ids;
  }

  /**
   * This function removes ids if they appear in the provided array of removed fields.
   * @param {string} fieldIds the comma separated list of subject ids
   * @param removedFields fields obtained from the store
   * @param type the field type
   * @returns {string}
   */
  private removeIds(fieldIds: string, removedFields: FieldFilterType[], type: string) {
    let updatedId = '';
    if (fieldIds !== null && typeof fieldIds !== 'undefined') {
      const idList = fieldIds.split(',');
      const removedList = removedFields.map((field) => String(field.id));
      idList.forEach(id => {
        // Add id from field Id list only if it is not one of the removed fields.
        const checkedId = this.checkId(String(id), removedList);
        if (checkedId !== null) {
          updatedId += checkedId + ',';
        }
      });
      // remove comma at end of the string.
      updatedId = updatedId.slice(0, -1);
    }
    return updatedId;
  }

  /**
   * Once fields have been removed from the route, return the removed filter to
   * the default state.
   * @param {string} type
   */
  private updateStoreWithRemovedFilter(type: string): void {

    switch (type) {
      case FieldValues.SUBJECT: {
        this.store.dispatch(new RemoveSelectedSubjects([{id: 0, name: ''}]));
        break;
      }
      case FieldValues.TYPE: {
        this.store.dispatch(new RemoveSelectedTypes([{id: 0, name: ''}]));
        break;
      }
      case FieldValues.GROUP: {
        this.store.dispatch(new RemoveSelectedGroups([{id: 0, name: ''}]));
        break;
      }
      default: {
        console.log('value not allowed.');
      }
    }
  }

  /**
   * Checks whether the provided field id has been removed.
   * @param {string} fieldId
   * @param {string[]} removedFields
   * @returns {any}
   */
  private checkId(fieldId: string, removedFields: string[]) {
    const test = removedFields.indexOf(fieldId);
    // return field only if not in list of removed fields.
    if (test === -1) {
      return fieldId;
    }
    return null;
  }

  /**
   * Uses router to navigate a route based on the provided query values.
   * @param {string} areaId area id (can be comma-separated list).
   * @param {string} typeId the type id (can be comma-separated list).
   * @param {string} subjectId the subject id.
   * TODO: Incomplete global search routing (area is always using in current application routing).
   * TODO: Ignoring the promise returned by router.navigate (needs review, it may be ok).
   */
  navigateRoute(areaId: string, typeId: string, subjectId: string, groupId: string, view?: string): void {

    const queryParams = {queryParams: {}};
    if (view) {
      queryParams.queryParams = {view: view}
    }

    // Important: this call will remove any removed filter ids from the navigation path.
    const fields: RouterIds = this.setIdFields(subjectId, typeId, groupId);

    if (this.isFieldSelected(fields.subjectId)
      && this.isFieldSelected(fields.typeId)
      && this.isFieldSelected(areaId)
      && this.isFieldSelected(fields.groupId)) {

      this.router.navigate(['/',
        this.urlRootPath,
        'collection',
        'category', groupId,
        'area', areaId,
        'type', typeId,
        'subject', subjectId
      ], queryParams);
    } else if (this.isFieldSelected(fields.typeId)
      && this.isFieldSelected(fields.subjectId)
      && this.isFieldSelected(fields.groupId)) {
      this.router.navigate(['/',
        this.urlRootPath,
        'collection',
        'category', groupId,
        'type', typeId,
        'subject', subjectId
      ], queryParams);
    } else if (this.isFieldSelected(areaId)
      && this.isFieldSelected(fields.typeId)
      && this.isFieldSelected(fields.groupId)) {
      this.router.navigate(['/',
        this.urlRootPath,
        'collection',
        'category', groupId,
        'area', areaId,
        'type', typeId
      ], queryParams);
    } else if (this.isFieldSelected(areaId)
      && this.isFieldSelected(fields.subjectId)
      && this.isFieldSelected(fields.groupId)) {
      this.router.navigate(['/',
        this.urlRootPath,
        'collection',
        'category', groupId,
        'area', areaId,
        'subject', subjectId
      ], queryParams);
    } else if (this.isFieldSelected(fields.subjectId)
      && this.isFieldSelected(fields.typeId)
      && this.isFieldSelected(areaId)) {
      this.router.navigate(['/',
        this.urlRootPath,
        'collection',
        'area', areaId,
        'type', typeId,
        'subject', subjectId
      ], queryParams);
    } else if (this.isFieldSelected(fields.groupId) && this.isFieldSelected(areaId)) {
      this.router.navigate(['/',
        this.urlRootPath,
        'collection',
        'category', groupId,
        'area', areaId
      ], queryParams);
    } else if (this.isFieldSelected(fields.subjectId) && this.isFieldSelected(areaId)) {
      this.router.navigate(['/',
        this.urlRootPath,
        'collection',
        'area', areaId,
        'subject', subjectId
      ], queryParams);
    } else if (this.isFieldSelected(fields.typeId) && this.isFieldSelected(areaId)) {
      this.router.navigate(['/',
        this.urlRootPath,
        'collection',
        'area', areaId,
        'type', typeId
      ], queryParams);
    } else if (this.isFieldSelected(fields.typeId) && this.isFieldSelected(fields.subjectId)) {
      this.router.navigate(['/',
        this.urlRootPath,
        'collection',
        'type', typeId,
        'subject', subjectId
      ], queryParams);
    } else if (this.isFieldSelected(fields.typeId)) {
      this.router.navigate(['/', this.urlRootPath, 'collection', 'type', typeId], queryParams);
    } else if (this.isFieldSelected(areaId)) {
      this.router.navigate(['/', this.urlRootPath, 'collection', 'area', areaId], queryParams);
    } else if (this.isFieldSelected(fields.subjectId)) {
      this.router.navigate(['/', this.urlRootPath, 'collection', 'subject', subjectId], queryParams);
    } else {
      this.router.navigate(['/', this.urlRootPath, 'collection'], queryParams);
    }
  }

  public isFieldSelected(id: string): boolean {
    return (typeof id !== 'undefined') && (id !== null) && (id.length) !== 0 && (id !== '0');
  }

  private _handleAreaBackLinks(selectedArea: string,
                               selectedGroup: string,
                               selectedSubject: string,
                               selectedTypes: string): string {
    if (this.isFieldSelected(selectedSubject) && selectedTypes && selectedGroup) {

      return this._areaGroupSubjectTypeLink(selectedArea, selectedGroup, selectedSubject, selectedTypes);
    } else if (selectedGroup && selectedTypes) {
      return this._areaGroupTypeLink(selectedArea, selectedGroup, selectedTypes);
    } else if (this.isFieldSelected(selectedSubject) && selectedGroup) {
      return this._areaGroupSubjectLink(selectedArea, selectedGroup, selectedSubject);
    } else if (this.isFieldSelected(selectedSubject) && this.isFieldSelected(selectedTypes)) {
      return this._areaSubjectTypeLink(selectedArea, selectedSubject, selectedTypes);
    } else if (this.isFieldSelected(selectedTypes)) {
      return this._areaTypeLink(selectedArea, selectedTypes);
    } else if (this.isFieldSelected(selectedSubject)) {
      return this._areaSubjectLink(selectedArea, selectedSubject)
    } else if (selectedGroup) {
      return this._areaGroupLink(selectedArea, selectedGroup)
    } else {
      return this._areaLink(selectedArea);
    }
  }

  // currently unused and incomplete.
  private _handleGlobalBackLinks(selectedSubject: string, selectedGroup: string, selectedTypes: string): string {
    if (this.isFieldSelected(selectedSubject) && selectedTypes) {
      return this._globalSubjectTypeLink(selectedSubject, selectedTypes);
    } else if (this.isFieldSelected(selectedSubject)) {
      return this._globalSubjectLink(selectedSubject);
    } else if (this.isFieldSelected(selectedTypes)) {
      return this._globalTypeLink(selectedTypes);
    } else {
      return this._globalLink();
    }
  }

  private _areaGroupSubjectTypeLink(selectedArea: string,
                                    selectedGroup: string,
                                    selectedSubject: string,
                                    selectedTypes: string): string {
    return '/' + this.urlRootPath +
      `/collection/category/${selectedGroup}/area/${selectedArea}/type/${selectedTypes}/subject/${selectedSubject}`;
  }

  private _areaGroupSubjectLink(selectedArea: string, selectedGroup: string, selectedSubject: string): string {
    return '/' + this.urlRootPath +
      `/collection/category/${selectedGroup}/area/${selectedArea}/subject/${selectedSubject}`;
  }

  private _areaGroupTypeLink(selectedArea: string, selectedGroup: string, selectedTypes: string): string {
    return '/' + this.urlRootPath +
      `/collection/category/${selectedGroup}/area/${selectedArea}/type/${selectedTypes}`;
  }

  private _areaGroupLink(selectedArea: string, selectedGroup: string): string {
    return '/' + this.urlRootPath +
      `/collection/category/${selectedGroup}/area/${selectedArea}`;
  }

  // private _groupTypeLink(selectedGroup: string, selectedTypes: string): string {
  //   return '/' + this.urlRootPath +
  //     `/collection/category/${selectedGroup}/type/${selectedTypes}`;
  // }
  //
  // private _groupSubjectLink(selectedGroup: string, selectedSubject: string): string {
  //   return '/' + this.urlRootPath +
  //     `/collection/category/${selectedGroup}/subject/${selectedSubject}`;
  // }
  //
  // private _groupLink(selectedGroup: string): string {
  //   return '/' + this.urlRootPath +
  //     `/collection/category/${selectedGroup}`;
  // }

  private _areaSubjectTypeLink(selectedArea: string, selectedSubject: string, selectedTypes: string): string {
    return '/' + this.urlRootPath + `/collection/area/${selectedArea}/type/${selectedTypes}/subject/${selectedSubject}`;
  }

  private _areaSubjectLink(selectedArea: string, selectedSubject: string): string {
    return '/' + this.urlRootPath + `/collection/area/${selectedArea}/subject/${selectedSubject}`;
  }

  private _areaTypeLink(selectedArea: string, selectedTypes: string): string {
    return '/' + this.urlRootPath + `/collection/area/${selectedArea}/type/${selectedTypes}`;
  }

  private _areaLink(selectedArea: string): string {
    return '/' + this.urlRootPath + `/collection/area/${selectedArea}`;
  }

  private _globalLink(): string {
    return '/' + this.urlRootPath + '/collection'
  }

  private _globalTypeLink(selectedTypes: string): string {
    return '/' + this.urlRootPath + `/collection/type/${selectedTypes}`;
  }

  private _globalSubjectLink(selectedSubject: string): string {
    return '/' + this.urlRootPath + `/collection/subject/${selectedSubject}`;
  }

  private _globalSubjectTypeLink(selectedSubject: string, selectedTypes: string): string {
    return '/' + this.urlRootPath + `/collection}/subject/${selectedSubject}/type/${selectedTypes}`;
  }


}
