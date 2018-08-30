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
import {AppMenusComponent} from './apps-menu/app-menus.component';
import {SvgModule} from './svg/svg.module';
import {CollectionsFilterPipe} from './collections-filter.pipe';
import {CommonModule} from '@angular/common';
import {
  MatButtonModule,
  MatCardModule,
  MatGridListModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import {HttpClientModule} from '@angular/common/http';
import {FooterComponent} from './footer/footer.component';
import {JsonLdComponent} from './json-ld/json-ld.component';

@NgModule({
  declarations: [
    AppMenusComponent,
    FooterComponent,
    JsonLdComponent,
    CollectionsFilterPipe
  ],
  imports: [
    CommonModule,
    SvgModule,
    MatListModule,
    MatTooltipModule,
    MatToolbarModule,
    MatSidenavModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    FlexLayoutModule,
    RouterModule
  ],
  exports: [
    AppMenusComponent,
    FooterComponent,
    JsonLdComponent,
    CollectionsFilterPipe,
    CommonModule,
    SvgModule,
    MatListModule,
    MatTooltipModule,
    MatToolbarModule,
    MatSidenavModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    FlexLayoutModule
  ]
})
export class SharedModule {

}
