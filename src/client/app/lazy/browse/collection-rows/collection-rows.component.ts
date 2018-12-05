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
  OnInit,
  Output
} from '@angular/core';
import {CollectionType} from '../../../core/data-types/collection.type';
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
        style({opacity: '0.4'}),
        animate('400ms ease-in', style({opacity: '1'})),
      ]),
      transition(':leave', [
        animate(200, style({ opacity: 0 }))
      ])
    ])]
})
export class CollectionRowsComponent implements OnInit {

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
   * Constructor
   * @param navigationService the singleton selection service.
   */
  constructor(private navigationService: NavigationServiceB) {
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

  }

}
