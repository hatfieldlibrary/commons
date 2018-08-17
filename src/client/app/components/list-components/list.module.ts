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
import {CollectionRowsComponent} from './collection-rows/collection-rows.component';
import {AreaFiltersComponent} from './area-filters/area-filters.component';
import {ViewListComponent} from '../svg/view-list/view-list.component';
import {ViewGridComponent} from '../svg/view-grid/view-grid.component';
import {SubjectOptionsComponent} from './subject-options/subject-options.component';
import {AreaOptionsComponent} from './area-options/area-options.component';
import {GroupOptionsComponent} from './group-options/group-options.component';
import {CollectionGridComponent} from './collection-grid/collection-grid.component';
import {AreaBannerComponent} from './area-banner/area-banner.component';
import {CollectionViewComponent} from './collection-view-component/collection-view.component';
import {TypesComponent} from './types/types.component';
import {CommonModule} from '@angular/common';
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
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SvgModule} from '../svg/svg.module';
import {CollectionsViewContainerComponent} from './collections-view-container/collections-view-container.component';
import {AppRoutingModule} from '../../app-routing-module';
import {ListRoutingModule} from './list-routing.module';

@NgModule({
  declarations: [
    CollectionsViewContainerComponent,
    CollectionViewComponent,
    AreaOptionsComponent,
    AreaBannerComponent,
    AreaFiltersComponent,
    CollectionGridComponent,
    SubjectOptionsComponent,
    GroupOptionsComponent,
    TypesComponent,
    CollectionRowsComponent,
    ViewListComponent,
    ViewGridComponent
  ],
  imports: [
    CommonModule,
    ListRoutingModule,
    SvgModule,
    FlexLayoutModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatToolbarModule,
    MatSidenavModule,
    MatInputModule,
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
  ]
})
export class ListModule {

}
