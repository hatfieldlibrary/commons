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
  Component, OnInit, ChangeDetectionStrategy, OnDestroy, Inject
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../reducers';
import {Observable} from 'rxjs/Observable';
import {ItemType} from '../../shared/data-types/item.type';
import * as fromItem from '../../actions/item.actions';
import * as areaActions from '../../actions/area.actions';
import * as fromRelated from '../../actions/related.actions';
import {RelatedType} from '../../shared/data-types/related-collection';
import {AreaFilterType} from '../../shared/data-types/area-filter.type';

import {fadeIn} from '../../animation/animations';
import {MediaChange, ObservableMedia} from '@angular/flex-layout';
import {Subscription} from 'rxjs/Subscription';
import {DOCUMENT} from '@angular/common';
import {SubjectType} from '../../shared/data-types/subject.type';
import {TypesFilterType} from '../../shared/data-types/types-filter.type';

@Component({
  selector: 'app-item-container',
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './item-container.component.html',
  styleUrls: ['./item-container.component.css'],
  animations: [fadeIn]
})
export class ItemContainerComponent implements OnInit, OnDestroy {

  related$: Observable<RelatedType[]>;
  selectedSubject$: Observable<SubjectType>;
  selectedTypes$: Observable<string>;
  item$: Observable<ItemType>;
  areas: AreaFilterType[];
  id: string;
  areasAvailable = false;
  activeMediaQuery = 'xs';
  columns = 1;
  selectedArea: string;
  watchers: Subscription;
  related: RelatedType[];

  constructor(private store: Store<fromRoot.State>,
              private media: ObservableMedia,
              private route: ActivatedRoute,
              private router: Router,
              @Inject(DOCUMENT) private document) {

    this.watchers = new Subscription();

    /** Assures that the page scrolls to top if user chooses related item. */
   // const routeEventWatcher = this.router.events.filter(event => event instanceof NavigationEnd).subscribe(() => {
      // Chrome canary supports the new standard usage with documentElement, but
      // Chrome and presumably other browsers still expect body.
       //this.renderer.setProperty(this.document.body, 'scrollTop', 0);
       //this.renderer.setProperty(this.document.documentElement, 'scrollTop', 0);

    // });
    // if (routeEventWatcher) {
    //   this.watchers.add(routeEventWatcher);
    // }

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
    const areaWatcher = this.store.select(fromRoot.getAreas).subscribe((areas) => {
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
        subjectString += subject + ',';
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

  ngOnInit() {

    this.item$ = this.store.select(fromRoot.getItem);
    this.related$ = this.store.select(fromRoot.getRelated);
    this.selectedSubject$ = this.store.select(fromRoot.getSelectedSubject);
    this.selectedTypes$ = this.store.select(fromRoot.getSelectedTypes);
    this.setAreasAvailable();

    // Once we have item information, request related items.
    const itemWatcher = this.store.select(fromRoot.getItem).subscribe((data) => {
      this.getRelatedItems(data);
    });
    if(itemWatcher) {
      this.watchers.add(itemWatcher);
    }

    // Request item based on route parameter.
    const routeWatcher = this.route.params
      .subscribe((params) => {
        this.store.dispatch(new fromItem.ItemReset());
        this.store.dispatch(new fromRelated.ClearRelatedItems());
        if (params['areaId']) {
          this.selectedArea = params['areaId'];
        }
        if (params['id']) {
          this.id = params['id'];
          this.store.dispatch(new fromItem.ItemRequest(params['id']));
        }
        this.initializeAreas();
        this.initializeColumnCount();
      });
    if(routeWatcher) {
      this.watchers.add(routeWatcher);
    }

  }

  ngOnDestroy(): void {
    if (this.watchers) {
      this.watchers.unsubscribe();
    }
  }

}
