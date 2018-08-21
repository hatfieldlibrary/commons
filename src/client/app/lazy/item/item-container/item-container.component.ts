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
  Component, OnInit, ChangeDetectionStrategy, OnDestroy, Inject
} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromRoot from '../../../core/ngrx/reducers/index';
import {Observable, Subscription} from 'rxjs';
import {ItemType} from '../../../core/data-types/item.type';
import * as fromItem from '../../../core/ngrx/actions/item.actions';
import * as areaActions from '../../../core/ngrx/actions/area.actions';
import * as fromRelated from '../../../core/ngrx/actions/related.actions';
import {RelatedType} from '../../../core/data-types/related-collection';
import {fadeIn} from '../../../core/animation/animations';
import {MediaChange, ObservableMedia} from '@angular/flex-layout';
import {DOCUMENT} from '@angular/common';
import {NavigationServiceB} from '../../../core/services/navigation-2/navigation.service';
import {FieldFilterType} from '../../../core/data-types/field-filter.type';

@Component({
  selector: 'app-item-container',
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './item-container.component.html',
  styleUrls: ['./item-container.component.css'],
  animations: [fadeIn]
})
export class ItemContainerComponent implements OnInit, OnDestroy {

  related$: Observable<RelatedType[]>;
  selectedSubjects$: Observable<FieldFilterType[]>;
  selectedTypes$: Observable<FieldFilterType[]>;
  selectedGroups$: Observable<FieldFilterType[]>;
  item$: Observable<ItemType>;
  areas: FieldFilterType[];
  id: string;
  areasAvailable = false;
  activeMediaQuery = 'xs';
  columns = 1;
  selectedArea: string;
  watchers: Subscription;
  related: RelatedType[];
  private selectedSubjects: FieldFilterType[];
  private selectedTypes: FieldFilterType[];
  private selectedGroups: FieldFilterType[];

  constructor(private store: Store<fromRoot.State>,
              private media: ObservableMedia,
              private route: ActivatedRoute,
              private navigationService: NavigationServiceB,
              @Inject(DOCUMENT) private document) {

    this.watchers = new Subscription();
      // Set the media observable subscription for assigning the related items column count.
    const mediaWatcher = this.media.subscribe((change: MediaChange) => {
        this.activeMediaQuery = change ? `'${change.mqAlias}' = (${change.mediaQuery})` : '';
        if (change.mqAlias === 'xs') {
          this.columns = 1;
        } else if (change.mqAlias === 'sm' || change.mqAlias === 'md') {
          this.columns = 2;
        } else if (change.mqAlias === 'lg') {
          this.columns = 3;
        } else {
          this.columns = 4;
        }
      });
    if (mediaWatcher) {
      this.watchers.add(mediaWatcher);
    }

  }

  /**
   * Subscribes to areaList observable and sets member variable to true if the array
   * is not empty.
   */
  setAreasAvailable(): void {
    const areaWatcher = this.store.pipe(select(fromRoot.getAreas)).subscribe((areas) => {
      this.areas = areas;
      // id is 0 in initial state.
      if (areas.length > 0) {
        if (areas[0].id > 0) {
          this.areasAvailable = true;
        }
      }
    });
    if (areaWatcher) {
      this.watchers.add(areaWatcher);
    }

  }

  /**
   * Dispatches request for related collections. This requires packaging identifiers
   * from the subjects array for this item into a string.
   * @param data the item object
   */
  getRelatedItems(data: ItemType) {
    if (typeof data.subjects !== 'undefined' &&
      typeof this.id !== 'undefined') {

      let subjectString = '';
      for (const subject of data.subjects) {
        subjectString += subject.id + ',';
      }
      // dispatch if we have subjects
      if (subjectString.length > 0) {
        subjectString = subjectString.slice(0, -1);
        this.store.dispatch(new fromRelated.ItemActionRelated(this.id, subjectString));
      }
    }
  }

  /**
   * Dispatches action for area list if not currently available in the store.
   * @param id
   */
  initializeAreas() {
    if (!this.areasAvailable) {
      this.store.dispatch(new areaActions.AreaListAction());
    }
  }

  /**
   * Set column count for related items.
   */
  initializeColumnCount() {

    if (this.media.isActive('xs')) {
      this.columns = 1;
    } else if (this.media.isActive('sm') || this.media.isActive('md')) {
      this.columns = 2;
    } else if (this.media.isActive('lg')) {
      this.columns = 3;
    } else {
      this.columns = 4;
    }
  }

  getBackLink(): string {

    const typeIds = this.navigationService.getIds(this.selectedTypes);
    const subjectIds = this.navigationService.getIds(this.selectedSubjects);
    const groupIds = this.navigationService.getIds(this.selectedGroups);
    const path =
      this.navigationService.getBackLink(this.selectedArea, groupIds, subjectIds, typeIds);
    return path;
  }

  ngOnInit() {

    this.item$ = this.store.pipe(select(fromRoot.getItem));
    this.related$ = this.store.pipe(select(fromRoot.getRelated));
    this.selectedSubjects$ = this.store.pipe(select(fromRoot.getSubjectsFilter));
    this.selectedTypes$ = this.store.pipe(select(fromRoot.getTypesFilter));
    this.selectedGroups$ = this.store.pipe(select(fromRoot.getCollectionsGroupFilter));
    const selectedArea$ = this.store.pipe(select(fromRoot.getAreasFilter));
    this.setAreasAvailable();
    const subjectsWatcher = this.selectedSubjects$.subscribe((data) => {
      this.selectedSubjects = data;
    });
    this.watchers.add(subjectsWatcher);
    const typesWatcher = this.selectedTypes$.subscribe((data) => {
      this.selectedTypes = data;
    });
    this.watchers.add(typesWatcher);
    const groupsWatcher = this.selectedGroups$.subscribe((data) => {
      this.selectedGroups = data;
    });
    this.watchers.add(groupsWatcher);
    // Once we have item information, request related items.
    const itemWatcher = this.store.pipe(select(fromRoot.getItem)).subscribe((data) => {
      this.getRelatedItems(data);
    });
    if (itemWatcher) {
      this.watchers.add(itemWatcher);
    }
    const areaWatcher = selectedArea$.subscribe((area) => {
      this.selectedArea = area[0].id.toString();
    });
    this.watchers.add(areaWatcher);
    // Request item using the route params.
    const routeWatcher = this.route.params
      .subscribe((params) => {
        this.store.dispatch(new fromItem.ItemReset());
        this.store.dispatch(new fromRelated.ClearRelatedItems());
      //  if (params['areaId']) {
      //    this.selectedArea = params['areaId'];
      //  }
        if (params['id']) {
          this.id = params['id'];
          this.store.dispatch(new fromItem.ItemRequest(params['id']));
        }
        this.initializeAreas();
        this.initializeColumnCount();
      });
    if (routeWatcher) {
      this.watchers.add(routeWatcher);
    }
  }

  ngOnDestroy(): void {
    if (this.watchers) {
      this.watchers.unsubscribe();
    }
  }

}
