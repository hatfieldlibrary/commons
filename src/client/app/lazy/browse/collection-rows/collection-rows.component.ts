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
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import {ObservableMedia} from '@angular/flex-layout';
import {CollectionType} from '../../../core/data-types/collection.type';
import {Subscription} from 'rxjs';
import {environment} from '../../../environments/environment';
import {animate, style, transition, trigger} from '@angular/animations';
import {NavigationServiceB} from '../../../core/services/navigation-2/navigation.service';

@Component({
  selector: 'app-collection-rows',
  templateUrl: './collection-rows.component.html',
  styleUrls: ['./collection-rows.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({opacity: '0.2'}),
        animate('500ms ease-in', style({opacity: '1'})),
      ]),
      transition(':leave', [
        animate(200, style({ opacity: 0 }))
      ])
    ])]
})
export class CollectionRowsComponent implements OnDestroy, OnInit {

  @Input() collectionList: CollectionType[];
  @Output() collectionNavigation: EventEmitter<any> = new EventEmitter<any>();
  @Output() setView: EventEmitter<any> = new EventEmitter<any>();
  isMobile = false;
  watcher = new Subscription();

  constructor(private navigationService: NavigationServiceB, private media: ObservableMedia) {
  }

  getResultCount(): string {
    if (this.collectionList) {
      return this.collectionList.length.toString();
    }
  }
  getImage(image: string) {
     return environment.apiHost + environment.imagePath + '/resources/img/thumb/' + image;

  }
  getItemLink(id: number): string {
    return this.navigationService.getItemLink(id);
  }

  navigateToItem(id: number) {
    this.collectionNavigation.emit(id);
  }

  setViewType(type: string): void {
    this.setView.emit(type);
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.watcher.unsubscribe();
  }

}
