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
  ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input, OnDestroy, OnInit, ViewEncapsulation
} from '@angular/core';
import {AreaType} from '../../shared/data-types/area.type';
import {ActivatedRoute, NavigationEnd, NavigationStart, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {MediaChange, ObservableMedia} from '@angular/flex-layout';
import {DOCUMENT, isPlatformBrowser} from '@angular/common';
import {MenuInteractionService} from '../../services/menu/menu-interaction.service';
import 'rxjs/add/operator/filter';
import {NavigationServiceB} from '../../services/navigation-2/navigation.service';
import {FieldFilterType} from '../../shared/data-types/field-filter.type';
import * as fromRoot from '../../reducers';
import * as fromItem from '../../actions/item.actions';
import * as fromRelated from '../../actions/related.actions';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-menus-component',
  templateUrl: './app-menus.component.html',
  styleUrls: ['./app-menus.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppMenusComponent implements OnInit, OnDestroy {

  areaList: AreaType[];
  selectedSubjects: FieldFilterType[];
  selectedTypes: FieldFilterType[];
  selectedGroups: FieldFilterType[];
  selectedArea: string;
  showBack: boolean;
  // @Input() title: string;
  public previousUrl = '';
  homeUrl = 'http://libmedia.willamette.edu/academiccommons';
  secondaryUrl = 'http://library.willamette.edu';
  watcher: Subscription;
  state = '';
  position = 'left';

  constructor(private store: Store<fromRoot.State>,
              private menuService: MenuInteractionService,
              private navigationService: NavigationServiceB,
              private router: Router,
              private route: ActivatedRoute,
              private changeDetector: ChangeDetectorRef,
              public media: ObservableMedia,
              @Inject(DOCUMENT) private document) {

    this.watcher = router.events
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.previousUrl = event.url;
        }
      });

    const mediaWatcher = media.asObservable()
      .subscribe((change: MediaChange) => {
        this.state = change ? `'${change.mqAlias}' = (${change.mediaQuery})` : '';
      });
    this.watcher.add(mediaWatcher);
  }

  openMenu() {
    this.menuService.openMenu();
  }

  getBackLink(): string {
    const typeIds = this.navigationService.getIds(this.selectedTypes);
    const subjectIds = this.navigationService.getIds(this.selectedSubjects);
    const groupIds = this.navigationService.getIds(this.selectedGroups);
    const path = this.navigationService.getBackLink(this.selectedArea, groupIds, subjectIds, typeIds);
    return path;
  }

  ngOnInit(): void {
    // Set up subscriptions for information needed by the back link.
    this.watcher = new Subscription();
    const selectedSubjects$ = this.store.select(fromRoot.getSubjectsFilter);
    const selectedTypes$ = this.store.select(fromRoot.getTypesFilter);
    const selectedGroups$ = this.store.select(fromRoot.getCollectionsGroupFilter);
    const selectedArea$ = this.store.select(fromRoot.getAreasFilter);
    const subjectsWatcher = selectedSubjects$.subscribe((data) => {
      this.selectedSubjects = data;
    });
    this.watcher.add(subjectsWatcher);
    const typesWatcher = selectedTypes$.subscribe((data) => {
      this.selectedTypes = data;
    });
    this.watcher.add(typesWatcher);
    const groupsWatcher = selectedGroups$.subscribe((data) => {
      this.selectedGroups = data;
    });
    this.watcher.add(groupsWatcher);

    const areaWatcher = selectedArea$.subscribe((area) => {
      this.selectedArea = area[0].id.toString();
    });
    this.watcher.add(areaWatcher);
    // Anticipating angular universal.
    if (isPlatformBrowser) {
      this.router.events.subscribe((event: any) => {
        if (event instanceof NavigationEnd) {
          // If item route, show back arrow.
          if (event.url.match(/\/commons\/item/)) {
            this.showBack = true;
          } else {
            this.showBack = false;
          }
          // Need to trigger change detection here.
          this.changeDetector.detectChanges();
        }
      });
    }
  }

  ngOnDestroy(): void {
    if (this.watcher) {
      this.watcher.unsubscribe();
    }
  }
}
