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
  AfterViewInit,
  ChangeDetectionStrategy, Component, ElementRef, Inject, OnDestroy, OnInit,
  ViewChild
} from '@angular/core';
import {NavigationEnd, NavigationStart, Router} from "@angular/router";
import {
  DOCUMENT, isPlatformBrowser, Location, LocationStrategy, PathLocationStrategy
} from "@angular/common";
import {MatSidenav} from "@angular/material";
import {MenuInteractionService} from "../services/menu/menu-interaction.service";
import {Store} from "@ngrx/store";
import * as fromRoot from '../reducers';
import {AreaListItemType} from "../shared/data-types/area-list.type";
import {MediaChange, ObservableMedia} from "@angular/flex-layout";
import {Subscription} from "rxjs/Subscription";
import {SetTimeoutService} from "../services/timers/timeout.service";

/**
 * This component includes the md-sidenav-container, md-sidenav
 * and the router outlet.
 *
 * The component is responsible for setting the scrollTop value
 * of the scrollable element generated by the md-sidenav-container
 * directive. This assures that list views and item views (which are
 * siblings of the router-outlet inside md-sidenav-container) are
 * positioned correctly on load.
 */
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements AfterViewInit, OnInit, OnDestroy {
  watcher: Subscription;
  areas$: Store<AreaListItemType[]>;
  homeUrl = 'http://libmedia.willamette.edu/academiccommons';
  secondaryUrl = 'http://library.willamette.edu';
  tertiaryUrl = 'http://www.willamette.edu';
  @ViewChild('sidenav') sideNavigate: MatSidenav;
  @ViewChild('appcontent') appContent: ElementRef;

  scrollable: Element;
  state = '';
  /**
   * The item stack allows us to know whether or not to add
   * the current y position to the yScrollStack.
   * @type {Array}
   */
  itemUrlStack: string[] = [];
  /**
   * The y scroll stack tracks the top of the collection view
   * element.  The measurement is obtained from the bounding
   * client rectangle of the #appContent child view and is used
   * to set the scrollTop for the scrollable div (cdk-scrollable)
   * created by the mdSidenavContainer directive (Angular Material).
   * @type {Array}
   */
  yScrollStack: number[] = [];
  selectedAreaIds: string;

  constructor(private store: Store<fromRoot.State>,
              private menuService: MenuInteractionService,
              public media: ObservableMedia,
              private router: Router,
              @Inject(DOCUMENT) private document,
              private timeoutService: SetTimeoutService) {

    this.watcher = new Subscription();
    const mediaWatcher = media.asObservable()
      .subscribe((change: MediaChange) => {
        this.state = change ? `'${change.mqAlias}' = (${change.mediaQuery})` : '';
      });
    this.watcher.add(mediaWatcher);

  }

  //onDeactivate(event) {
  // Chrome canary supports the new standard usage with d
  // ocumentElement, but
  // Chrome and presumably other browsers still expect body.
  // this.renderer.setProperty(this.document.body, 'scrollTop', 0);
  // this.renderer.setProperty(this.document.documentElement, 'scrollTop', 0);
  //}

  goToHome(): void {
    document.location.href = this.homeUrl;
  }

  goToSecondary(): void {
    document.location.href = this.secondaryUrl;
  }

  goToTertiary(): void {
    document.location.href = this.tertiaryUrl;
  }

  _setSelectedAreas(areas: any) {
    let selected = '';
    if (areas.length === 0) {
      selected = '0,';
    }
    else {
      areas.forEach((area) => {
        selected = area.id + ',';
      });
    }
    this.selectedAreaIds = selected.slice(0, -1);

  }

  ngOnInit() {
    /**
     * Get areas for side_nav.
     * @type {Store<AreaListItemType[]>}
     */
    this.areas$ = this.store.select(fromRoot.getAreas);
    const selectedAreasWatcher = this.store.select(fromRoot.getAreaInfo).subscribe((areas) => {
      if (areas) {
        this._setSelectedAreas(areas);
      }
    });
    this.watcher.add(selectedAreasWatcher);
    const openWatcher = this.menuService.openMenu$.subscribe(open => {
      this.sideNavigate.open().catch((err) => {
        console.log(err);
      });

    });
    this.watcher.add(openWatcher);

  }

  ngAfterViewInit() {

    // Anticipating angular universal.
    if (isPlatformBrowser) {

      /**
       * This sets the scrollTop position for navigation between views.
       */
      this.router.events.subscribe((event: any) => {
        if (event instanceof NavigationStart) {
          // Get absolute value fo the bounding rectangle for #app-content.
          const top = Math.abs(this.appContent.nativeElement.getBoundingClientRect().top);

          // Push the value onto the y stack if the url is for an item view and the previous
          // route transition was not also to an item view. This effectively limits
          // y scroll value tracking to the collection view.
          if (event.url.match(/\/commons\/item/) && this.itemUrlStack.length === 0) {
            // Push the top
            this.yScrollStack.push(top);
            // Add to item stack to prevent further updates of the stacks.
            this.itemUrlStack.push(event.url);
          }
        } else if (event instanceof NavigationEnd) {

          // Use time out to push this work onto the browser's callback queue.
          // This allows rendering to complete before setting scrollTop.
          // If set to a value greater than the maximum available for the element,
          // scrollTop settles itself to the maximum value and we don't see the
          // desired result.
          this.timeoutService.setTimeout(0, () => {
            // Get the scrollable element (created by MdSidenavContainer)

            this.scrollable = this.document.querySelector('.mat-drawer-content');
            if (event.url.match(/\/commons\/collection/)) {
              // Pop the item url stack to prepare for the next transition
              // to the item route.
              this.itemUrlStack.pop();
              // Pop the top
              this.scrollable.scrollTop = this.yScrollStack.pop();
            }
            else {
              // Currently the only other view is for items. This
              // view should always initialize with scrollTop equal
              // to zero.
              this.scrollable.scrollTop = 0;
            }
          });
        }
      });
    }
  }

  ngOnDestroy() {
    if (this.watcher) {
      this.watcher.unsubscribe();
    }
    if (this.timeoutService) {
      this.timeoutService.clearTimeout();
    }
  }


}
