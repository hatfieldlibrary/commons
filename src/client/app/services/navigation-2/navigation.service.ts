import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';
import * as fromRoot from '../../reducers';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs/Subscription';
import {
  RemoveSelectedGroups,
  RemoveSelectedSubjects,
  RemoveSelectedTypes
} from '../../actions/filter.actions';
import {FieldFilterType} from '../../shared/data-types/field-filter.type';
import {FieldValues} from '../../shared/enum/field-names';
import {AreaFiltersComponent} from '../../components/area-filters/area-filters.component';

interface RouterIds {
  subjectId: string;
  typeId: string;
  groupId: string;
}

@Injectable()
export class NavigationServiceB {

  urlRootPath = environment.appRoot;
  removedSubjects$: Subscription;
  removedGroups$: Subscription;
  removedTypes$: Subscription;
  removedSubs: FieldFilterType[];
  removedGroups: FieldFilterType[];
  removedTypes: FieldFilterType[];

  constructor(private router: Router, private store: Store<fromRoot.State>) {
    // Keep track of removed fields in application state (as added by AreaFiltersComponent).
    // Before navigation takes place, the requested field ids are checked to verify that
    // they have not been removed. (Field removal is not not initiated directly by the user;
    // it happens when fields are automatically removed in the AreaFiltersComponent component.)
    // No need to unsubscribe. We're in a singleton.
    this.removedSubjects$ = store.select(fromRoot.getRemovedSubject).subscribe(rem => {
      this.removedSubs = rem;
    });
    this.removedTypes$ = store.select(fromRoot.getRemovedType).subscribe(rem => {
      this.removedTypes = rem;
    });
    this.removedGroups$ = store.select(fromRoot.getRemovedGroup).subscribe(rem => {
      this.removedGroups = rem;
    });
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

  public navigateItemRoute(itemId: string, areaId: string) {
    if (!areaId) {
      areaId = '0';
    }
    this.router.navigate(['/',
      this.urlRootPath,
      'item',
      'id', itemId,
      areaId
    ]);
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
   */

  /*
   * TODO: this builds in a 4-way permutation that includes global search (and potentially multiple
   * selected areas). Current design excludes global and allows only single area.
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

  // currently unused.
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

  private _groupTypeLink(selectedGroup: string, selectedTypes: string): string {
    return '/' + this.urlRootPath +
      `/collection/category/${selectedGroup}/type/${selectedTypes}`;
  }

  private _groupSubjectLink(selectedGroup: string, selectedSubject: string): string {
    return '/' + this.urlRootPath +
      `/collection/category/${selectedGroup}/subject/${selectedSubject}`;
  }

  private _groupLink(selectedGroup: string): string {
    return '/' + this.urlRootPath +
      `/collection/category/${selectedGroup}`;
  }

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

  // the zero area (global search) is handled here.  However, global search currently not implemented in app.
  getBackLink(selectedArea: string, selectedGroup: string, selectedSubject: string, selectedTypes: string): string {
    if (selectedArea && selectedArea !== '0') {
      return this._handleAreaBackLinks(selectedArea, selectedGroup, selectedSubject, selectedTypes);
    } else if (selectedArea === '0') {
      return this._handleGlobalBackLinks(selectedSubject, selectedGroup, selectedTypes);
    }
  }

}
