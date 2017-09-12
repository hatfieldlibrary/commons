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
import {SelectedSubject} from '../../shared/data-types/selected-subject';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as listActions from '../../actions/collection.actions';

@Component({
  selector: 'app-collection-list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnDestroy {


  rootPath: string = environment.appRoot;
  @Input() collectionList: CollectionType[];
  @Input() selectedSubject: SelectedSubject;
  @Output() removeSubject: EventEmitter<void> = new EventEmitter<void>();
  @Input() selectedArea: string;
  filterTerm: string;

  constructor(private store: Store<fromRoot.State>) {
    this.filterTerm = '';
  }

  deselect() {
    this.store.dispatch(new listActions.CollectionReset());
    this.removeSubject.next();
  }

  ngOnDestroy(): void {
    this.removeSubject.unsubscribe();

  }

}
