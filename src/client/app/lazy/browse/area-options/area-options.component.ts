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
  AfterContentChecked,
  AfterViewChecked,
  AfterViewInit,
  asNativeElements,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output, Renderer2,
  ViewChild
} from '@angular/core';
import {AreasFilter} from '../../../core/data-types/areas-filter';
import {FilterUpdateServiceB} from '../../../core/services/filters-2/filter-update.service';
import {ScrollReadyService} from '../../../core/services/observable/scroll-ready.service';
import {FieldFilterType} from '../../../core/data-types/field-filter.type';
import {NavigationServiceB} from '../../../core/services/navigation-2/navigation.service';
import {MatNavList} from '@angular/material';

export interface SelectedAreaEvent {
  selected: FieldFilterType[];
}

@Component({
  selector: 'app-area-options',
  templateUrl: './area-options.component.html',
  styleUrls: ['./area-options.component.css']
})
export class AreaOptionsComponent implements AfterViewChecked {

  @Input() filter: AreasFilter;
  @Output() areaNavigation: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('areaSelectionList', { read: ElementRef })
  public scrollableList: ElementRef;

  selectedAreaPosition = -1;

  constructor(private filterService: FilterUpdateServiceB,
              private scrollReadyService: ScrollReadyService,
              private navigationService: NavigationServiceB,
              private renderer: Renderer2
  ) {}

  /**
   * Used by the area form options.
   * @param {number} id
   * @returns {boolean}
   */
  isSelected(id: number): boolean {
      return this.getPositionInSelectedList(id) > -1;
  }

  getAreaLink(areaId: number): string {
    return this.navigationService.getAreaLink(areaId)
  }
  /**
   * Gets the position index in selectedAreas for the area that
   * matches the provided id.
   * @param {number} areaId the id of the area
   * @returns {number}
   */
  private getPositionInSelectedList(areaId: number): number {
    if (this.filter.selectedAreas) {
      return this.filter.selectedAreas.findIndex((current) => current.id === areaId);
    }
    return -1;
  }
  /**
   * Handles area selection event.
   * @param {number} areaId
   */
  onAreaListControlChanged(areaId: number) {
    const updatedArea = this.filterService.updateSelectSingleAreaStore(this.filter.areas, areaId);
    const selectedEmitted: SelectedAreaEvent = {selected: updatedArea};
    // Reset the scroll position.
    this.scrollReadyService.setPosition(0);
    this.areaNavigation.emit(selectedEmitted);
  }


  ngAfterViewChecked(): void {
      this.filter.areas.forEach((area, index) => {
        if (this.selectedAreaPosition === -1) {
          if (area.name !== '') {
            if (area.id === this.filter.selectedAreas[0].id) {
              this.selectedAreaPosition = index;
              console.log(this.selectedAreaPosition);
              console.log(this.scrollableList)
              console.log(this.selectedAreaPosition * -200)
              const offset = this.selectedAreaPosition * -200;
              console.log(this.scrollableList)
              // this.container.nativeElement.scrollLeft = offset;
             this.renderer.setProperty(this.scrollableList.nativeElement, 'scrollLeft', offset);
             this.scrollableList.nativeElement.scrollTo({ left: offset, behavior: 'smooth' });
             const el = this.scrollableList.nativeElement;
             setTimeout(function() {
                el.scrollLeft = -100;
               console.log(el.scrollLeft)

              }, 1000);

              console.log(this.scrollableList.nativeElement.scrollLeft)
             // console.log(this.areaSelectorDirective.nativeElement)
            //  this.areaSelectorDirective.focus(3index)
            }
          }
        }
      });

  }

}
