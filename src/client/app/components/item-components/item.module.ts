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

import {NgModule} from '@angular/core';
import {ItemContainerComponent} from './item-container/item-container.component';
import {ItemComponent} from './item/item.component';
import {RelatedItemsComponent} from './related-items/related-items.component';
import {ItemHeaderComponent} from './item-header/item-header.component';
import {ItemLinksComponent} from './item-links/item-links.component';
import {ItemHeaderImageComponent} from './item-header-image/item-header-image.component';
import {DatePickerSvgComponent} from '../svg/date-picker-svg/date-picker-svg.component';
import {ItemSelectComponent} from './item-select-options/item-select.component';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule, MatChipsModule, MatGridListModule, MatIconModule,
  MatInputModule,
  MatListModule, MatProgressSpinnerModule, MatSelectModule,
  MatSidenavModule, MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from '../../app-routing-module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SvgModule} from '../svg/svg.module';
import {CommonModule} from '@angular/common';
import {environment} from '../../environments/environment';
import {RouterModule} from '@angular/router';
import {ItemRoutingModule} from './item-routing.module';

@NgModule({
  declarations: [ItemComponent,
    ItemContainerComponent,
    RelatedItemsComponent,
    ItemHeaderComponent,
    ItemLinksComponent,
    ItemHeaderImageComponent,
    ItemSelectComponent,
    DatePickerSvgComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatToolbarModule,
    MatSidenavModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatChipsModule,
    MatGridListModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    FormsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  //  AppRoutingModule,
    SvgModule,
    ItemRoutingModule
  ],
  exports: [
    ItemRoutingModule
  ]
})
export class ItemModule {

}
