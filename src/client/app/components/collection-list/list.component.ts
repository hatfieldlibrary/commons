/*
 * Copyright (c) 2017.
 *
 *   This program is free software: you can redistribute it and/or modify
 *    it under the terms of the GNU General Public License as published by
 *    the Free Software Foundation, either version 3 of the License, or
 *    (at your option) any later version.
 *
 *    This program is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU General Public License for more details.
 *
 *   You should have received a copy of the GNU General Public License
 *    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';

import {CollectionType} from '../../shared/data-types/collection.type';
import {environment} from '../../environments/environment';
import {SubjectFilterType} from '../../shared/data-types/subject-filter.type';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as listActions from '../../actions/collection.actions';
import {AreaFilterType} from '../../shared/data-types/area-filter.type';

@Component({
  selector: 'app-collection-list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnDestroy {


  rootPath: string = environment.appRoot;
  @Input() collectionList: CollectionType[];
  @Input() selectedSubject: SubjectFilterType;
  @Output() removeSubject: EventEmitter<void> = new EventEmitter<void>();
  @Input() selectedAreas: AreaFilterType[];
  filterTerm: string;

  constructor(private store: Store<fromRoot.State>) {
    this.filterTerm = '';
  }

  deselect() {
    this.store.dispatch(new listActions.CollectionReset());
    this.removeSubject.next();
  }


  /**
   * Generates the comma-separated list of ids.
   * @param {AreaFilterType[]} list list of areas
   * @returns {string}
   */
  getSelectedArea(): string {
    let ids = '';
    if (typeof this.selectedAreas !== 'undefined' && typeof this.selectedAreas[0] !== 'undefined') {
      this.selectedAreas.forEach(area => {
        ids = ids + area.id + ','
      });
    }
    return ids.slice(0, -1);
  }


  setAssetType(type) {
    if (type === 'dig') {
      return 'collection';
    } else {
      return 'single item';
    }
  }

  ngOnDestroy(): void {
    this.removeSubject.unsubscribe();

  }

}
