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

import {ChangeDetectionStrategy, Component, Inject, Renderer2} from '@angular/core';
import {NavigationEnd, NavigationStart, Router} from "@angular/router";
import {DOCUMENT, Location, LocationStrategy, PathLocationStrategy,PopStateEvent} from "@angular/common";


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {


  private lastPoppedUrl: string;
  private yScrollStack: number[] = [];

  constructor(
    private location: Location,
    private router: Router,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document,

  ){}

  onDeactivate(event) {
    // Chrome canary supports the new standard usage with documentElement, but
    // Chrome and presumably other browsers still expect body.
    // this.renderer.setProperty(this.document.body, 'scrollTop', 0);
    // this.renderer.setProperty(this.document.documentElement, 'scrollTop', 0);
  }

  ngOnInit() {

    this.location.subscribe((ev:PopStateEvent) => {

      this.lastPoppedUrl = ev.url;
      console.log(this.lastPoppedUrl)
    });

    this.router.events.subscribe((ev:any) => {
      if (ev instanceof NavigationStart) {
        console.log(ev.url)
        console.log('nav start')
        console.log(this.document.documentElement.scrollTop)
        console.log(this.document.body.scrollTop)
        if (ev.url != this.lastPoppedUrl) {
          console.log('push')
          console.log(this.document.body.scrollTop)
          this.yScrollStack.push(this.document.body.scrollTop);
        }
      } else if (ev instanceof NavigationEnd) {
console.log(this.lastPoppedUrl)
        console.log(ev.url)
        if (ev.url == this.lastPoppedUrl) {
          this.lastPoppedUrl = undefined;
          console.log('pop')
          console.log(this.yScrollStack.pop())
          this.renderer.setProperty(this.document.body, 'scrollTop', this.yScrollStack.pop());
          this.renderer.setProperty(this.document.documentElement, 'scrollTop', this.yScrollStack.pop());

        } else
          this.renderer.setProperty(this.document.body, 'scrollTop', 0);
        this.renderer.setProperty(this.document.documentElement, 'scrollTop', 0);
      }
    });
  }

}
