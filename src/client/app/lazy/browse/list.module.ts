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
import {ViewListComponent} from '../../shared/svg/view-list/view-list.component';
import {ViewGridComponent} from '../../shared/svg/view-grid/view-grid.component';
import {SubjectOptionsComponent} from './subject-options/subject-options.component';
import {AreaOptionsComponent} from './area-options/area-options.component';
import {GroupOptionsComponent} from './group-options/group-options.component';
import {CollectionGridComponent} from './collection-grid/collection-grid.component';
import {AreaBannerComponent} from './area-banner/area-banner.component';
import {CollectionViewComponent} from './collection-view-component/collection-view.component';
import {TypesComponent} from './types/types.component';
import {CommonModule} from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import {
  MatChipsModule
} from '@angular/material';
import {ListRoutingModule} from './list-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
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
    SharedModule,
    ListRoutingModule,
    MatChipsModule,
    MatTabsModule
  ]
})
export class ListModule {

}
