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
  EventEmitter, Inject,
  Input, OnDestroy,
  OnInit,
  Output, PLATFORM_ID
} from '@angular/core';
import {CollectionType} from '../../../core/data-types/collection.type';
import {environment} from '../../../environments/environment';
import {animate, style, transition, trigger} from '@angular/animations';
import {NavigationServiceB} from '../../../core/services/navigation-2/navigation.service';
import {MediaChange, MediaObserver} from '@angular/flex-layout';
import {Subscription} from 'rxjs';
import {isPlatformBrowser, isPlatformServer} from '@angular/common';

@Component({
  selector: 'app-collection-rows',
  templateUrl: './collection-rows.component.html',
  styleUrls: ['./collection-rows.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({opacity: '0.4'}),
        animate('400ms ease-in', style({opacity: '1'})),
      ]),
      transition(':leave', [
        animate(200, style({ opacity: 0 }))
      ])
    ])]
})
export class CollectionRowsComponent implements OnInit, OnDestroy {

  /**
   * The collection list to show.
   */
  @Input() collectionList: CollectionType[];
  /**
   * Event emitter for selecting a collection item to view.
   */
  @Output() collectionNavigation: EventEmitter<any> = new EventEmitter<any>();
  /**
   * Event emitter for toggling between list and grid view.
   */
  @Output() setView: EventEmitter<any> = new EventEmitter<any>();

  /**
   * Used to clean up subscriptions in OnDestroy.
   */
  watchers: Subscription;

  isMobile = false;

  /**
   * Constructor
   * @param navigationService the singleton selection service.
   * @param mediaObserver used to remove thumbnails from mobile biew
   */
  constructor(private navigationService: NavigationServiceB,
              public mediaObserver: MediaObserver,
              @Inject(PLATFORM_ID) private platformId: Object) {
  }

  /**
   * Returns the length of the collection list.
   */
  getResultCount(): string {
    if (this.collectionList) {
      return this.collectionList.length.toString();
    }
  }

  /**
   * Returns the full url for the collection thumbnail image.
   * @param image
   */
  getImage(image: string) {
     return environment.apiHost + environment.imagePath + '/resources/img/thumb/' + image;

  }

  /**
   * Returns the relative url for a collection item.
   * @param id
   */
  getItemLink(id: number): string {
    return this.navigationService.getItemLink(id);
  }

  /**
   * Emits event for navigating to a collection item view.
   * @param id the collection id.
   */
  navigateToItem(id: number) {
    this.collectionNavigation.emit(id);
  }

  /**
   * Emits the event for toggling the view (list or grid)
   * @param type
   */
  setViewType(type: string): void {
    this.setView.emit(type);
  }

  ngOnInit(): void {
    this.watchers = new Subscription();
    this.setMediaWatcher();
  }

  ngOnDestroy(): void {
    this.watchers.unsubscribe();
  }

  /**
   * This handles viewport size when the
   * application runs in the browser. In
   * the server, visibility is handled by
   * css media queries.  There is a performance
   * penalty in that case, since images will be downloaded
   * in the background even when hidden by css.
   * But, the alternative of using *ngIf to eliminate
   * rendering of the image tag means that
   * thumbnails will never appear in server-side
   * rendering -- and crawlers (like Archive-It)
   * will always see content for the mobile view.
   */
  private setMediaWatcher(): void {
    const mediaWatcher = this.mediaObserver.media$
      .subscribe((change: MediaChange) => {
        if (isPlatformBrowser(this.platformId)) {
          this.isMobile = change.mqAlias === 'xs';
        }
      });
    this.watchers.add(mediaWatcher);
  }

}
