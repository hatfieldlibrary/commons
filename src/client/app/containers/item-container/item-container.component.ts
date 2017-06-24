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
  Component, OnInit, ChangeDetectionStrategy, Renderer2, HostBinding, OnDestroy, Inject
} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import * as fromRoot from "../../reducers"
import {Observable} from "rxjs";
import {ItemType} from "../../shared/data-types/item.type";
import * as fromItem from "../../actions/item.actions";
import * as areaActions from '../../actions/area.actions';
import {RelatedType} from "../../shared/data-types/related-collection";
import {AreaListItemType} from "../../shared/data-types/area-list.type";

import {fadeIn} from "../../animation/animations";
import {MediaChange, ObservableMedia} from "@angular/flex-layout";
import {Subscription} from "rxjs/Subscription";
import {DOCUMENT} from "@angular/platform-browser";

@Component({
  selector: 'item-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './item-container.component.html',
  styleUrls: ['./item-container.component.css'],
  animations: [fadeIn]
})
export class ItemContainerComponent implements OnInit, OnDestroy {

  @HostBinding('@openClose') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'absolute';
  @HostBinding('style.position') width = '100%';

  item$: Observable<ItemType>;
  related$: Observable<RelatedType[]>;
  areas$: Observable<AreaListItemType[]>;
  id: string;
  collectionImage: string;
  areasAvailable: boolean = false;
  watcher: Subscription;
  activeMediaQuery = 'xs';
  columns: number = 1;
  selectedArea: string;
  private itemWatcher: Subscription;

  constructor(private store: Store<fromRoot.State>,
              private renderer: Renderer2,
              private media: ObservableMedia,
              private route: ActivatedRoute,
              private router: Router,
              @Inject(DOCUMENT) private document ) {

    /** Assures that the page scrolls to top if user chooses related item. */
    this.router.events.filter(event => event instanceof NavigationEnd).subscribe(() => {
      // Chrome canary supports the new standard usage with documentElement, but
      // Chrome and presumably other browsers still expect body.
      this.renderer.setProperty(this.document.body, 'scrollTop', 0);
      this.renderer.setProperty(this.document.documentElement, 'scrollTop', 0);
    });

    // Set the media observable subscription for assigning the related items column count.
    this.watcher = this.media.subscribe((change: MediaChange) => {
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


  }

  /**
   * Subscribes to areaList observable and sets member variable to true if the array
   * is not empty.
   */
  setAreasAvailable(): void {
    this.areas$.subscribe((areas) => {
      // id is 0 in initial state.
      if (areas[0].id > 0) {
        this.areasAvailable = true;
      }
    });

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
      for (let subject of data.subjects) {
        subjectString += subject + ',';

      }
      subjectString = subjectString.slice(0, -1);

      if (subjectString.length > 0) {
        this.store.dispatch(new fromItem.ItemActionRelated(this.id, subjectString));
      }
    }
  }

  /**
   * Dispatches action for area list if not currently available in the store.
   * @param id
   */
  initializeAreas() {
    if (!this.areasAvailable) {
      this.store.dispatch(new areaActions.AreaAction());
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

    this.store.dispatch(new fromItem.ClearRelatedItems());

    this.item$ = this.store.select(fromRoot.getItem);
    this.related$ = this.store.select(fromRoot.getRelated);
    this.areas$ = this.store.select(fromRoot.getAreas);



    // Once we have item information, request related items.
    this.itemWatcher = this.item$.subscribe((data) => {
      this.getRelatedItems(data);
      this.collectionImage = data.collection.image;

    });

    // Request item based on route parameter.
    this.route.params
      .subscribe((params) => {
        this.selectedArea = params['areaId'];
        if (params['id']) {
          this.id = params['id'];
          this.store.dispatch(new fromItem.ItemRequest(params['id']));

        }

      });

    this.initializeAreas();
    this.initializeColumnCount();

  }

  ngOnDestroy(): void {
    this.watcher.unsubscribe();
    this.itemWatcher.unsubscribe();
  }

}
