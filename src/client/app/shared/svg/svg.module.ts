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
import {LockSvgComponent} from './lock-svg/lock-svg.component';
import {CloseSvgComponent} from './close-svg/close-svg.component';
import {HelpSvgComponent} from './help-svg/help-svg.component';
import {BackSvgComponent} from './back-svg/back-svg.component';
import {MenuSvgComponent} from './menu-svg/menu-svg.component';
import {SearchSvgComponent} from './search-svg/search-svg.component';
import {CloseSvgDisabledComponent} from './close-svg-disabled/close-svg-disabled.component';
import {BackBlackSvgComponent} from './back-black-svg/back-black-svg.component';
import {HomeSvgComponent} from './home-svg/home-svg.component';
import {HomeBlackSvgComponent} from './home-black-svg/home-black-svg.component';
import {CollectionsSvgComponent} from './collections-svg/collections-svg.component';
import {AreasSvgComponent} from './areas-svg/areas-svg.component';
import {CloseWhiteSvgComponent} from './close-white-svg/close-white-svg.component';
import {KeyboardArrowBackSvgComponent} from './keyboard-arrow-back-svg/keyboard-arrow-back-svg.component';
import {InfoSvgComponent} from './info-svg/info-svg.component';
import {LoadingSvgComponent} from './loading-svg/loading-svg.component';
import {RunSvgComponent} from './run-svg/run-svg.component';
import {KeyboardArrowForwardSvgComponent} from './keyboard-arrow-forward-svg/keyboard-arrow-forward-svg.component';
import {FilterSvgComponent} from './filter-svg/filter-svg.component';
import {MatIconModule, MatIconRegistry} from '@angular/material';
import {DatePickerSvgComponent} from './date-picker-svg/date-picker-svg.component';

@NgModule({
  declarations: [
    BackSvgComponent,
    LockSvgComponent,
    MenuSvgComponent,
    HelpSvgComponent,
    CloseSvgComponent,
    SearchSvgComponent,
    HomeSvgComponent,
    HomeBlackSvgComponent,
    CollectionsSvgComponent,
    CloseSvgDisabledComponent,
    AreasSvgComponent,
    BackBlackSvgComponent,
    CloseWhiteSvgComponent,
    KeyboardArrowBackSvgComponent,
    KeyboardArrowForwardSvgComponent,
    RunSvgComponent,
    InfoSvgComponent,
    LoadingSvgComponent,
    HomeBlackSvgComponent,
    FilterSvgComponent,
    DatePickerSvgComponent
  ],
  imports: [
    MatIconModule
  ],
  providers: [
    MatIconRegistry
  ],
  exports: [
    BackSvgComponent,
    LockSvgComponent,
    MenuSvgComponent,
    HelpSvgComponent,
    CloseSvgComponent,
    SearchSvgComponent,
    HomeSvgComponent,
    HomeBlackSvgComponent,
    CollectionsSvgComponent,
    CloseSvgDisabledComponent,
    AreasSvgComponent,
    BackBlackSvgComponent,
    CloseWhiteSvgComponent,
    KeyboardArrowBackSvgComponent,
    KeyboardArrowForwardSvgComponent,
    RunSvgComponent,
    InfoSvgComponent,
    LoadingSvgComponent,
    HomeBlackSvgComponent,
    FilterSvgComponent,
    DatePickerSvgComponent
  ]
})
export class SvgModule {
}
