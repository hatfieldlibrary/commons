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

import {
  Component, EventEmitter,
  Input, OnChanges,
  OnDestroy, OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';

import {MediaChange, ObservableMedia} from '@angular/flex-layout';
import {Subscription} from 'rxjs/Subscription';
import * as fromFilter from '../../../core/ngrx/reducers/filter.reducers';
import {DeselectedFilter} from '../area-filters/area-filters.component';
import {AreasFilter} from '../../../core/data-types/areas-filter';
import {CollectionGroupFilter} from '../../../core/data-types/collection-group-filter';
import {TypesFilter} from '../../../core/data-types/types-filter';
import {SubjectFilter} from '../../../core/data-types/subject-filter';
import {AreaType} from '../../../core/data-types/area.type';

@Component({
  selector: 'app-area-banner',
  templateUrl: './area-banner.component.html',
  styleUrls: ['./area-banner.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AreaBannerComponent implements OnChanges, OnDestroy, OnInit {

  @Input()
  areaInfo: AreaType;
  @Output()
  removeFilter: EventEmitter<any> = new EventEmitter<any>();
  @Input()
  filters: fromFilter.State;
  @Input()
  areas: AreasFilter;
  @Input()
  subjects: SubjectFilter;
  @Input()
  types: TypesFilter;
  @Input()
  groups: CollectionGroupFilter;
  description: string;
  url: string;
  linkLabel: string;
  title: string;
  areaId: any; // initialize with out of range value.
  private watcher: Subscription;
  isMobile = false;

  constructor(public media: ObservableMedia) {
  }

  /**
   * Deselects the filter
   * @param deselected the id of the filter to be removed
   */
  deselect(deselected: DeselectedFilter): void {
    this.removeFilter.emit(deselected);
  }

  /**
   * Used by the area form options.
   * @param {number} id
   * @returns {boolean}
   */
  isSelected(id: number): boolean {
    if (this.filters.selectedAreas) {
      return this.getPositionInSelectedList(id) > -1;
    }
    return false;
  }

  /**
   * Gets the position index in selectedAreas for the area that
   * matches the provided id.
   * @param {number} areaId the id of the area
   * @returns {number}
   */
  private getPositionInSelectedList(areaId: number): number {
    return this.filters.selectedAreas.findIndex((current) => current.id === areaId);
  }

  ngOnInit() {
    this.watcher = this.media.asObservable().subscribe((change: MediaChange) => {
      if (change.mqAlias === 'xs' || change.mqAlias === 'sm') {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (typeof changes.areaInfo === 'undefined') {
      return;
    }
    if (changes.areaInfo.currentValue) {
      this.title = changes.areaInfo.currentValue.title;
      this.description = changes.areaInfo.currentValue.description;
      this.url = changes.areaInfo.currentValue.url;
      this.linkLabel = changes.areaInfo.currentValue.linkLabel;
      this.areaId = changes.areaInfo.currentValue.id;
    }
  }

  ngOnDestroy(): void {
    if (this.watcher) {
      this.watcher.unsubscribe();
    }
  }

}
