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

import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {select, Store} from '@ngrx/store';
import * as fromRoot from '../../core/ngrx/reducers/index';
import {NavigationServiceB} from '../../core/services/navigation-2/navigation.service';
import {ActivatedRoute} from '@angular/router';
import {CollectionType} from '../../core/data-types/collection.type';
import {DispatchService} from '../../core/services/dispatch.service';
import {FieldFilterType} from '../../core/data-types/field-filter.type';

@Component({
  selector: 'app-submit-dspace',
  templateUrl: './submit-dspace.component.html',
  styleUrls: ['./submit-dspace.component.css']
})
export class SubmitDspaceComponent implements OnInit, OnDestroy {

  areas$: Observable<FieldFilterType[]>;
  selectedAreas: FieldFilterType[];
  collections$:  Observable<CollectionType[]>;

  areaId = '0';
  position = 'right';

  /**
   * Used to clean up subscriptions OnDestroy.
   */
  watchers: Subscription;

  constructor(private store: Store<fromRoot.State>,
              private navigation: NavigationServiceB,
              private route: ActivatedRoute,
              private dispatchService: DispatchService
              ) { }


  navigateToItem(url: string): void {

    url = url.replace('ds', 'xmlui');
    url += '/submit';
    document.location.href = url;
  }

  ngOnInit() {

    this.areas$ = this.store.pipe(select(fromRoot.getAreas));
    this.collections$ = this.store.pipe(select(fromRoot.getFilteredCollections));

    this.watchers = new Subscription();

    const routeWatcher = this.route.params
      .subscribe((params) => {
        this.dispatchService.dispatchActions(undefined, params['typeId'], undefined, undefined);
      });
    this.watchers.add(routeWatcher);

  }

  ngOnDestroy() {
    this.watchers.unsubscribe();
  }

}
