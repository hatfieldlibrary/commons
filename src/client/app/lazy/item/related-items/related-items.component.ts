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

import {ChangeDetectionStrategy, Component, Input, OnDestroy} from '@angular/core';
import {RelatedType} from '../../../core/data-types/related-collection';
import {environment} from '../../../environments/environment';
import {MediaChange, MediaObserver} from '@angular/flex-layout';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-related-items',
  templateUrl: './related-items.component.html',
  styleUrls: ['./related-items.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RelatedItemsComponent implements OnDestroy {

  @Input() related: RelatedType[];
  @Input() selectedArea: string;
  @Input() columns: number;
  isMobile = false;
  watcher: Subscription;
  appRoot = environment.appRoot;
  imagePath = environment.apiHost +  environment.imagePath;

  constructor(private mediaObserver: MediaObserver) {
    this.watcher = this.mediaObserver.media$.subscribe((change: MediaChange) => {
      if (change.mqAlias === 'xs') {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
  }

  getRelatedLink(collectionId: number): string {
    return this.appRoot + '/item/id/' + collectionId;
  }

  ngOnDestroy(): void {
    this.watcher.unsubscribe();
  }

}
