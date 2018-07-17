import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';
import * as fromRoot from '../../reducers';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs/Subscription';
import {RemoveSelectedGroups, RemoveSelectedSubjects, RemoveSelectedTypes} from '../../actions/filter.actions';
import {FieldFilterType} from '../../shared/data-types/field-filter.type';
import {FieldValues} from '../../shared/enum/field-names';
import {query} from '@angular/animations';

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
  getIds(list: any[]): string {
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
    }
    if (this.removedTypes[0].id !== 0) {
      ids.typeId = this.removeIds(typeId, this.removedTypes, FieldValues.TYPE);
    }
    if (this.removedGroups[0].id !== 0) {
      ids.groupId = this.removeIds(groupId, this.removedGroups, FieldValues.GROUP);
    }
    return ids;
  }

  /**
   * This function removes ids if the appear in the provided array of removed fields.
   * @param {string} id the comma separated list of subject ids
   * @param removedFields fields obtained from the store
   * @param type the field type
   * @returns {string}
   */
  private removeIds(id: string, removedFields: FieldFilterType[], type: string) {
    let updatedId = '';
    if (id !== null && typeof id !== 'undefined') {
      const idList = id.split(',');
      removedFields.forEach(sub => {
        const checkedId = this.checkId(String(sub.id), idList);
        if (checkedId !== null) {
          updatedId += checkedId + ',';
        }
      });
      // remove comma at end of the string.
      updatedId = updatedId.slice(0, -1);
    }
    // Finished removing fields...update store to the default state.
    this.updateStore(type);
    return updatedId;
  }

  /**
   * Once fields have been removed from the route, the corresponding
   * store must be returned to the default state.
   * @param {string} type
   */
  private updateStore(type: string): void {

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
    const test = removedFields.indexOf(fieldId)
    if (test !== -1) {
      return fieldId;
    }
    return null;
  }

  public navigateFilterRoute(areaId: string, typeId: string, subjectId: string, groupId: string): void {
    this.navigateRoute(areaId, typeId, subjectId, groupId);
  }

  public navigateFilterRouteWithView(areaId: string,
                                     typeId: string,
                                     subjectId: string,
                                     groupId: string,
                                     view: string): void {
    this.navigateRoute(areaId, typeId, subjectId, groupId, view);
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
  private navigateRoute(areaId: string, typeId: string, subjectId: string, groupId: string, view?: string): void {

    const queryParams = {queryParams: {}};
    if (view) {
        queryParams.queryParams = { view: view }
    }

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
    } else if (this.isTypeSelected(fields.typeId)) {
      this.router.navigate(['/', this.urlRootPath, 'collection', 'type', typeId], queryParams);
    } else if (this.isAreaSelected(areaId)) {
      this.router.navigate(['/', this.urlRootPath, 'collection', 'area', areaId], queryParams);
    } else if (this.isSubjectSelected(fields.subjectId)) {
      this.router.navigate(['/', this.urlRootPath, 'collection', 'subject', subjectId], queryParams);
    } else {
      this.router.navigate(['/', this.urlRootPath, 'collection'], queryParams);
    }
  }

  public isAreaSelected(areaId: string): boolean {
    return (typeof areaId !== 'undefined') && (areaId.length > 0) && (areaId !== '0');
  }

  // TODO Review conditions for next 3 methods... can we get by with less?

  public isSubjectSelected(subjectId: string): boolean {
    return (typeof subjectId !== 'undefined') && (subjectId !== null) && (subjectId.length) !== 0 && (subjectId !== '0');
  }

  public isTypeSelected(typeId: string): boolean {
    return (typeof typeId !== 'undefined') && (typeId !== null) && (typeId.length) !== 0 && (typeId !== '0');
  }

  public isFieldSelected(id: string): boolean {
    return (typeof id !== 'undefined') && (id !== null) && (id.length) !== 0 && (id !== '0');
  }

  private _handleAreaBackLinks(selectedArea: string,
                               selectedGroup: string,
                               selectedSubject: string,
                               selectedTypes: string): string {
    if (this.isSubjectSelected(selectedSubject) && selectedTypes && selectedGroup) {

      return this._areaGroupSubjectTypeLink(selectedArea, selectedGroup, selectedSubject, selectedTypes);
    } else if (selectedGroup && selectedTypes) {

      return this._areaGroupTypeLink(selectedArea, selectedGroup, selectedTypes);
    } else if (this.isSubjectSelected(selectedSubject) && selectedGroup) {

      return this._areaGroupSubjectLink(selectedArea, selectedGroup, selectedSubject);
    } else if (this.isSubjectSelected(selectedSubject) && this.isTypeSelected(selectedTypes)) {

      return this._areaSubjectTypeLink(selectedArea, selectedSubject, selectedTypes);
    } else if (this.isTypeSelected(selectedTypes)) {

      return this._areaTypeLink(selectedArea, selectedTypes);
    } else if (this.isSubjectSelected(selectedSubject)) {
      return this._areaSubjectLink(selectedArea, selectedSubject)
    } else if (selectedGroup) {
      return this._areaGroupLink(selectedArea, selectedGroup)
    } else {
      return this._areaLink(selectedArea);
    }
  }

  // currently unused.
  private _handleGlobalBackLinks(selectedSubject: string, selectedGroup: string, selectedTypes: string): string {
    if (this.isSubjectSelected(selectedSubject) && selectedTypes) {
      return this._globalSubjectTypeLink(selectedSubject, selectedTypes);
    } else if (this.isSubjectSelected(selectedSubject)) {
      return this._globalSubjectLink(selectedSubject);
    } else if (this.isTypeSelected(selectedTypes)) {
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
