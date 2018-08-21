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
  Component,
  EventEmitter,
  Input,
  OnDestroy, OnInit,
  Output
} from '@angular/core';
import {MediaChange, ObservableMedia} from '@angular/flex-layout';
import {CollectionType} from '../../../core/data-types/collection.type';
import {Subscription} from 'rxjs';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-collection-rows',
  templateUrl: './collection-rows.component.html',
  styleUrls: ['./collection-rows.component.css']
})
export class CollectionRowsComponent implements OnDestroy, OnInit {

  @Input() collectionList: CollectionType[];
  @Output() collectionNavigation: EventEmitter<any> = new EventEmitter<any>();
  @Output() setView: EventEmitter<any> = new EventEmitter<any>();
  isMobile = false;
  cols = 3;
  watcher = new Subscription();

  constructor(private media: ObservableMedia) {
  }

  getResultCount(): string {
    if (this.collectionList) {
      return this.collectionList.length.toString();
    }
  }
  getImage(image: string) {
     return environment.apiHost + environment.imagePath + '/resources/img/thumb/' + image;

  }

  navigateToItem(id: number) {
    this.collectionNavigation.emit(id);
  }

  setViewType(type: string): void {
    this.setView.emit(type);
  }

  ngOnInit(): void {
    const media = this.media.subscribe((change: MediaChange) => {
      if (change.mqAlias === 'xs') {
        this.isMobile = true;
        this.cols = 1;
      } else if (change.mqAlias === 'sm' || change.mqAlias === 'md') {
        this.cols = 2;
        this.isMobile = false;
      } else {
        this.cols = 3;
        this.isMobile = false;
      }
    });
    this.watcher.add(media);
  }
  ngOnDestroy(): void {
    this.watcher.unsubscribe();
  }

}
