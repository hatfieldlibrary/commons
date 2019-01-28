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

  ChangeDetectionStrategy, Component, DoCheck, HostBinding, Input, OnDestroy, OnInit,
  SecurityContext
} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {environment} from '../../../environments/environment';
import {imageFadeIn} from '../../../core/animation/animations';
import {MediaChange, MediaObserver} from '@angular/flex-layout';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-item-header-image',
  templateUrl: './item-header-image.component.html',
  styleUrls: ['./item-header-image.component.css'],
  animations: [imageFadeIn],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemHeaderImageComponent implements OnInit, OnDestroy, DoCheck {

  backgroundImage: SafeResourceUrl;
  currentImage = '';
  imageLoaded = false;
  isMobile = false;
  watcher: Subscription;

  @Input() image: string;
  // Use host binding for animation.
  @HostBinding('@imageShow') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'absolute';
  @HostBinding('style.position') width = '100%';

  constructor(private sanitizer: DomSanitizer,
              public mediaObserver: MediaObserver) {
    this.image = '';
    this.watcher = this.mediaObserver.media$.subscribe((change: MediaChange) => {
      if (change.mqAlias === 'xs') {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }

    });

  }

  ngOnInit() {

    this.backgroundImage = this.sanitizer.bypassSecurityTrustUrl('');
    this.imageLoaded = false;
    this.currentImage = '';
    this.setImage();
  }

  ngDoCheck() {
    this.setImage();
  }

  /**
   *
   */
  setImageLoaded(): void {
    this.imageLoaded = true;
  }

  setImage() {

    if (this.image !== this.currentImage) {
      let url;
      if (this.isMobile) {
        url = environment.apiHost + environment.imagePath + '/resources/img/thumb/' + this.image;
      } else {
        url =  environment.apiHost + environment.imagePath + '/resources/img/full/' + this.image;
      }

      const backgroundImage = this.sanitizer.sanitize(SecurityContext.URL, url).toString();
      this.backgroundImage = this.sanitizer.bypassSecurityTrustUrl(backgroundImage);

    }
    this.currentImage = this.image;
  }

  /**
   * Unsubscribe media watcher.
   */
  ngOnDestroy(): void {
    if (this.watcher) {
      this.watcher.unsubscribe();
    }
  }

}
