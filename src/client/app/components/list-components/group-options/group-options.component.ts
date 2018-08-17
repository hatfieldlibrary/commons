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

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatSelectionList} from '@angular/material';
import {FieldTypeKey, FilterUpdateServiceB} from '../../../services/filters-2/filter-update.service';
import {CollectionGroupFilter} from '../../../shared/data-types/collection-group-filter';
import {animate, style, transition, trigger} from '@angular/animations';
import {FieldFilterType} from '../../../shared/data-types/field-filter.type';
import {ScrollReadyService} from '../../../services/observable/scroll-ready.service';

export interface SelectedGroupEvent {
  selected: FieldFilterType[];
}

@Component({
  selector: 'app-group-options',
  templateUrl: './group-options.component.html',
  styleUrls: ['./group-options.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({opacity: '0.5'}),
        animate('200ms ease-in', style({opacity: '1'})),
      ])
    ])]
})
export class GroupOptionsComponent {

  @Input() filter: CollectionGroupFilter;
  @Output() groupNavigation: EventEmitter <any> = new EventEmitter<any>();
  position = 'before';

  /**
   * Injecting ChangeDetectorRef to instruct angular to re-render
   * the view after changes made in the ngAfterViewInit hook method.
   * @param changeDetector
   */
  constructor(private filterService: FilterUpdateServiceB,
              private scrollReadyService: ScrollReadyService ) {}

  /**
   * Gets the position index in typeId for the type that
   * matches the provided id.
   * @param {number} typeId the id of the area
   * @returns {number}
   */
  private getPositionInSelectedGroupList(id: number): number {
    return this.filter.selectedGroups.findIndex((current) => current.id === id);
  }

  onGroupListControlChanged(list: MatSelectionList, id: number) {
    const selectedGroups = this.filterService
      .updateSelectedFields(this.filter.selectedGroups, this.filter.groups, id, FieldTypeKey.GROUP);
    const updatedGroupEvent: SelectedGroupEvent = {selected: selectedGroups};
    // Reset the scroll position.
    this.scrollReadyService.setPosition(0);
    this.groupNavigation.emit(updatedGroupEvent);
  }

  /**
   * Used by the area form options.
   * @param {number} id
   * @returns {boolean}
   */
  isSelected(id: number): boolean {
    if (this.filter.selectedGroups) {
      return this.getPositionInSelectedGroupList(id) > -1;
    }
    return false;
  }

}
