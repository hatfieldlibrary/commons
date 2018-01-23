import {Component, Input} from '@angular/core';
import * as listActions from '../../actions/collection.actions';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../reducers';
import {TypesFilterType} from '../../shared/data-types/types-filter.type';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';
import {MatSelectionList} from '@angular/material';
import {SetTypeFilter} from '../../actions/filter.actions';
import {AreaFilterType} from '../../shared/data-types/area-filter.type';
import {SubjectFilterType} from '../../shared/data-types/subject-filter.type';

@Component({
  selector: 'app-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.css']
})
export class TypesComponent {

  @Input() typeList: TypesFilterType[];
  @Input() selectedTypes: TypesFilterType[];
  @Input() selectedAreas: AreaFilterType[];
  @Input() selectedSubject: SubjectFilterType;

  constructor(private router: Router,
              private store: Store<fromRoot.State>) {
  }
  /**
   * Gets the type list item with the provided id from the list of all types.
   * @param {number} typeId the id of the type to retrieve
   * @returns {TypesListItemType}
   */
  private getSelectedTypeInfo(typeId: number): TypesFilterType {
    return this.typeList.find((current) => current.id === typeId);
  }

  /**
   * Gets the position index in selectedTypes for the type that
   * matches the provided id.
   * @param {number} typeId the id of the area
   * @returns {number}
   */
  private getPositionInSelectedTypeList(typeId: number): number {
    return this.selectedTypes.findIndex((current) => current.id === typeId);
  }
  /**
   * Update selected types.
   * @param {TypesFilterType} selectedType
   * @param {number} areaId
   */
  private updateSelectedTypes(selectedType: TypesFilterType, typeId: number) {
    const currentIndex = this.getPositionInSelectedTypeList(typeId);
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
   * This function updates the selected types store.
   * @param {number} areaId
   */
  private setSelectedTypes(typeId: number): void {

    // Get area filter information for the selected areaId.
    const selectedType: TypesFilterType = this.getSelectedTypeInfo(typeId);
    if (selectedType) {
      // Update selectedAreas.
      this.updateSelectedTypes(selectedType, typeId);
      // Make sure the default id: '0' does not creep in!
      this.removeDefaultType();
      // Update the store.
      this.store.dispatch(new SetTypeFilter(this.selectedTypes));
    }
  }
  /**
   * Generates the comma-separated list of ids.
   * @param {any[]} list list of areas
   * @returns {string}
   */
  private getIds(list: any[]): string {
    let ids = '';
    if (typeof list !== 'undefined' && typeof list[0] !== 'undefined') {
      list.forEach(area => {
        ids = ids + area.id + ','
      });
    }
    return ids.slice(0, -1);
  }
  /**
   * Removes the default type (id: 0) from selectedTypes
   * (if it is present).
   */
  private removeDefaultType(): void {
    const zeroIndex = this.getPositionInSelectedTypeList(0);
    if (zeroIndex === 0) {
      this.selectedTypes.shift()
    }
  }

  onTypeListControlChanged(list: MatSelectionList, typeId: number) {
    list.selectedOptions.clear();
    this.store.dispatch(new listActions.CollectionReset());
    // Updates the selected types.
    this.setSelectedTypes(typeId);
    // Get updated type url query parameter value.
    const updatedId = this.getIds(this.selectedTypes);
    // Navigate.
    this.navigateRoute(updatedId);
  }

  /**
   * Provides router navigation.
   * @param {string} typeId
   */
  private navigateRoute(typeId: string) {
    const selectedAreaIds = this.getIds(this.selectedAreas);
    const selectedSubject = this.selectedSubject.id;
    if (selectedAreaIds !== '0' && typeof selectedAreaIds !== 'undefined') {
      if (selectedSubject !== 0) {
        if (typeId) {
          this.router.navigate([
            '/',
            environment.appRoot,
            'collection',
            'area',
            selectedAreaIds,
            'type',
            typeId,
            'subject',
            selectedSubject
          ]);
        } else {
          this.router.navigate([
            '/',
            environment.appRoot,
            'collection',
            'subject',
            selectedSubject,
            'area',
            selectedAreaIds,
          ]);
        }
      } else {
        if (typeId) {
          this.router.navigate([
            '/',
            environment.appRoot,
            'collection',
            'area',
            selectedAreaIds,
            'type',
            typeId]);
        } else {
          this.router.navigate([
            '/',
            environment.appRoot,
            'collection',
            'area',
            selectedAreaIds
          ]);
        }
      }
    } else if (selectedAreaIds === '0') {
      if (selectedSubject !== 0) {
        if (typeId) {
          this.router.navigate(['/', environment.appRoot, 'collection', 'type', typeId, 'subject', selectedSubject]);
        } else {
          this.router.navigate(['/', environment.appRoot, 'collection', 'subject', selectedSubject]);
        }
      } else {
        if (typeId) {
          this.router.navigate(['/', environment.appRoot, 'collection', 'type', typeId]);
        } else {
          this.router.navigate(['/', environment.appRoot, 'collection']);
        }
      }
    } else {
      if (typeId) {
        this.router.navigate(['/', environment.appRoot, 'collection', 'type', typeId]);
      } else {
        this.router.navigate(['/', environment.appRoot, 'collection']);
      }
    }
  }

  isSelected(id: number): boolean {
    if (this.selectedTypes) {
      return this.getPositionInSelectedTypeList(id) > -1;
    }
    return false;
  }

}
