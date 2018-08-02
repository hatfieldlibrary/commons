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

import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ItemHeaderComponent} from './item-header.component';
import {MenuSvgComponent} from '../svg/menu-svg/menu-svg.component';
import {CloseSvgComponent} from '../svg/close-svg/close-svg.component';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatDividerModule,
  MatIconModule,
  MatSidenavModule,
  MatToolbarModule, MatTooltipModule
} from '@angular/material';
import {BackSvgComponent} from '../svg/back-svg/back-svg.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HomeSvgComponent} from '../svg/home-svg/home-svg.component';
import {CollectionsSvgComponent} from '../svg/collections-svg/collections-svg.component';
import {ItemHeaderImageComponent} from '../item-header-image/item-header-image.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HomeBlackSvgComponent} from '../svg/home-black-svg/home-black-svg.component';
import {FlexLayoutModule, ObservableMedia} from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('ItemHeaderComponent', () => {
  let component: ItemHeaderComponent;
  let fixture: ComponentFixture<ItemHeaderComponent>;
  let media;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ItemHeaderComponent,
        ItemHeaderImageComponent,
        MenuSvgComponent,
        HomeSvgComponent,
        HomeBlackSvgComponent,
        CollectionsSvgComponent,
        CloseSvgComponent,
        BackSvgComponent,
        BackSvgComponent,
        MenuSvgComponent
      ],
      imports: [
        MatSidenavModule,
        MatCheckboxModule,
        MatToolbarModule,
        ReactiveFormsModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        MatDividerModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
        // needed to test ObservableMedia
        FlexLayoutModule
      ],
      providers: []
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemHeaderComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
    media = fixture.debugElement.injector.get(ObservableMedia);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
