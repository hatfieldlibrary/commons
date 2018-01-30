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

import {
  Component, Input, ChangeDetectionStrategy} from '@angular/core';
import {ItemType} from '../../shared/data-types/item.type';
import {ObservableMedia} from '@angular/flex-layout';
import {TypesFilterType} from '../../shared/data-types/types-filter.type';
import {SubjectFilterType} from '../../shared/data-types/subject-filter.type';
import {NavigationService} from '../../services/navigation/navigation.service';

/**
 * This is the parent component for presenting all item data.
 */
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemComponent  {


  @Input() item: ItemType;
  @Input() selectedArea: string;
  @Input() selectedSubject: SubjectFilterType;
  @Input() selectedTypes: TypesFilterType[];
  state = '';

  constructor(private navigationService: NavigationService,
              public media: ObservableMedia) {

  }

  getBackLink(): string {
    const typeIds = this.navigationService.getIds(this.selectedTypes);
    const path =
      this.navigationService.getBackLink(this.selectedArea, this.selectedSubject.id.toString(), typeIds);
    return path;

  }

}
