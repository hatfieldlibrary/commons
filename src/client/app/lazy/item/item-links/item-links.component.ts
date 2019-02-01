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
  ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input, OnDestroy, OnInit
} from '@angular/core';
import {SearchService} from '../../../core/services/search.service';
import {SearchTerms} from '../../../core/data-types/search-terms.type';
import {Observable, Subscription} from 'rxjs';
import {environment} from '../../../environments/environment';
import {ActivatedRoute} from '@angular/router';
import {AuthCheckService} from '../../../core/services/auth-check.service';
import {AuthType} from '../../../core/data-types/auth.type';
import * as fromRoot from '../../../core/ngrx/reducers/index';
import {select, Store} from '@ngrx/store';
import {DOCUMENT} from '@angular/common';
import {SetAuthStatus} from '../../../core/ngrx/actions/auth.action';
import {map} from 'rxjs/operators';

/**
 * Content access options presented to the user. These include direct
 * links to item, searchs, and pulldown lists.
 */
@Component({
  selector: 'app-item-links',
  templateUrl: './item-links.component.html',
  styleUrls: ['./item-links.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemLinksComponent implements OnInit, OnDestroy {

  @Input() restricted: boolean;
  @Input() linkOptions: string;
  @Input() assetType: string;
  @Input() searchOptions: string;
  @Input() url: string;
  @Input() searchUrl: string;
  @Input() title: string;
  @Input() count: string;
  auth$: Observable<AuthType>;
  authenticationPath: string;
  model: SearchTerms;
  COLLECTION_BUTTON_LABEL = 'Go to the Collection';
  ITEM_BUTTON_LABEL = 'Go to the Item';
  SEARCH_LABEL = 'Or start your search here';
  isAuthenticated = false;
  watchers: Subscription;

  constructor(private svc: SearchService,
              private route: ActivatedRoute,
              private auth: AuthCheckService,
              private changeDetector: ChangeDetectorRef,
              private store: Store<fromRoot.State>,
              @Inject(DOCUMENT) private document) {
    this.watchers = new Subscription();
  }

  // Executes search no external source via document locatoin.
  simpleSearch() {
    const href = this.svc.getSimpleSearchQuery(this.searchUrl, this.model.terms);
    this.document.location.href = href;
  }

  ngOnInit(): void {

    this.model = {
      terms: ''
    };

    const url: Observable<string> = this.route.parent.url.pipe(map(segments => segments.join('/')));
    const urlWatcher = url.subscribe((path) => {
      // Adding origin to the path so that check succeeds in server compiled code.
      this.authenticationPath = environment.origin + environment.appRoot + environment.authPath + '/' + path;
    });
    this.watchers.add(urlWatcher);

    // Using the store to track authentication.
    this.auth$ = this.store.pipe(select(fromRoot.getAuthStatus));
    const authWatcher = this.auth$.subscribe((auth) => {
      this.isAuthenticated = auth.auth;
      // Make sure to pick up the change next cycle.
      this.changeDetector.markForCheck();
    });
    this.watchers.add(authWatcher);
    // Retrieve the current authentication status. We update the store,
    // although that is not useful if this component remains the
    // only interested party!
    this.auth.getAuthStatus().subscribe((auth) => {
      this.store.dispatch(new SetAuthStatus({auth: auth}));
    });

  }

  ngOnDestroy(): void {
    if (this.watchers) {
      this.watchers.unsubscribe();
    }
  }

}
