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

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatSelectModule, MatCardModule, MatListModule, MatToolbarModule, MatIconModule, MatChipsModule,
  MatSidenavModule, MatIconRegistry, MatInputModule, MatGridListModule, MatCheckboxModule,
  MatProgressSpinnerModule, MatTooltipModule
} from '@angular/material';
import {APP_BASE_HREF} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {FlexLayoutModule} from '@angular/flex-layout';
import 'hammerjs';

import {AppComponent} from './components/app.component';
// import {ListsComponent} from './components/list-components/collection-view-component/lists-container.component';
import {ItemComponent} from './components/item-components/item/item.component';
import {PageNotFoundComponent} from './shared/components/page-not-found/page-not-found.component';
import {CollectionService} from './services/collection.service';
import {AreaService} from './services/area.service';
import {AreaEffects} from './effects/area.effects';
import {SubjectService} from './services/subject.service';
import {SubjectEffects} from './effects/subject.effects';
import {CollectionEffects} from './effects/collection.effects';
import {ItemContainerComponent} from './components/item-components/item-container/item-container.component';
import {reducers} from './reducers';
import {ItemEffects} from './effects/item.effects';
import {ItemService} from './services/item.service';
import {RelatedEffects} from './effects/related.effects';
import {RelatedItemsComponent} from './components/item-components/related-items/related-items.component';
import {RelatedService} from './services/related.service';
import {TypesComponent} from './components/list-components/types/types.component';
import {MenuSvgComponent} from './components/svg/menu-svg/menu-svg.component';
import {CloseSvgComponent} from './components/svg/close-svg/close-svg.component';
import {ItemHeaderComponent} from './components/item-components/item-header/item-header.component';
import {BackSvgComponent} from './components/svg/back-svg/back-svg.component';
import {LockSvgComponent} from './components/svg/lock-svg/lock-svg.component';
import {FooterComponent} from './components/footer/footer.component';
import {ItemLinksComponent} from './components/item-components/item-links/item-links.component';
import {SearchSvgComponent} from './components/svg/search-svg/search-svg.component';
import {SearchService} from './services/search.service';
import {AuthCheckService} from './services/auth-check.service';
import {AppMenusComponent} from './components/apps-menu/app-menus.component';
import {HomeSvgComponent} from './components/svg/home-svg/home-svg.component';
import {CollectionsSvgComponent} from './components/svg/collections-svg/collections-svg.component';
import {AreasSvgComponent} from './components/svg/areas-svg/areas-svg.component';
import {ItemHeaderImageComponent} from './components/item-components/item-header-image/item-header-image.component';
import {CloseWhiteSvgComponent} from './components/svg/close-white-svg/close-white-svg.component';
import {KeyboardArrowBackSvgComponent} from './components/svg/keyboard-arrow-back-svg/keyboard-arrow-back-svg.component';
import {KeyboardArrowForwardSvgComponent} from './components/svg/keyboard-arrow-forward-svg/keyboard-arrow-forward-svg.component';
import {RunSvgComponent} from './components/svg/run-svg/run-svg.component';
import {InfoSvgComponent} from './components/svg/info-svg/info-svg.component';
import {LoadingSvgComponent} from './components/svg/loading-svg/loading-svg.component';
import {BackBlackSvgComponent} from './components/svg/back-black-svg/back-black-svg.component';
import {CollectionsFilterPipe} from './services/filters-2/collections-filter.pipe';
import {FilterSvgComponent} from './components/svg/filter-svg/filter-svg.component';
import {HomeBlackSvgComponent} from './components/svg/home-black-svg/home-black-svg.component';
import {ItemSelectComponent} from './components/item-components/item-select-options/item-select.component';
import {DatePickerSvgComponent} from './components/svg/date-picker-svg/date-picker-svg.component';
import {SetTimeoutService} from './services/timers/timeout.service';
import {SetIntervalService} from './services/timers/interval.service';
import {MenuInteractionService} from './services/menu/menu-interaction.service';
import {TypeEffects} from './effects/types.effects';
import {TypesService} from './services/types.service';
import {DispatchService} from './services/dispatch.service';
import {SetSelectedService} from './services/set-selected.service';
import {CloseSvgDisabledComponent} from './components/svg/close-svg-disabled/close-svg-disabled.component';
import {HelpSvgComponent} from './components/svg/help-svg/help-svg.component';
import {ConsoleLoggerService} from './shared/logger/console-logger.service';
import {LoggerService} from './shared/logger/logger.service';
import {SubmitDspaceComponent} from './components/submit-dspace/submit-dspace.component';
import {AreaOptionsComponent} from './components/list-components/area-options/area-options.component';
import {AreaBannerComponent} from './components/list-components/area-banner/area-banner.component';
import {AreaFiltersComponent} from './components/list-components/area-filters/area-filters.component';
import {CollectionGridComponent} from './components/list-components/collection-grid/collection-grid.component';
import {SubjectOptionsComponent} from './components/list-components/subject-options/subject-options.component';
import {GroupOptionsComponent} from './components/list-components/group-options/group-options.component';
import {CollectionGroupEffects} from './effects/collection-group.effects';
import {CollectionGroupServices} from './services/collection-group.services';
import {FilterUpdateServiceB} from './services/filters-2/filter-update.service';
import {NavigationServiceB} from './services/navigation-2/navigation.service';
import {ScrollReadyService} from './services/observable/scroll-ready.service';
import { CollectionRowsComponent } from './components/list-components/collection-rows/collection-rows.component';
import { ViewListComponent } from './components/svg/view-list/view-list.component';
import { ViewGridComponent } from './components/svg/view-grid/view-grid.component'
import {AppRoutingModule} from './app-routing-module';
import {SvgModule} from './components/svg/svg.module';
import {ListModule} from './components/list-components/list.module';
import {ItemModule} from './components/item-components/item.module';

@NgModule({
  declarations: [
    // BackSvgComponent,
    // LockSvgComponent,
    // MenuSvgComponent,
    // HelpSvgComponent,
    // CloseSvgComponent,
    AppComponent,
   // CollectionListComponent,
    PageNotFoundComponent,
    // ItemComponent,
    // ItemContainerComponent,
    // RelatedItemsComponent,
    // ItemHeaderComponent,
    FooterComponent,
   // ItemLinksComponent,
   // SearchSvgComponent,
    AppMenusComponent,
    // HomeSvgComponent,
    // HomeBlackSvgComponent,
    // CollectionsSvgComponent,
    // CloseSvgDisabledComponent,
    // AreasSvgComponent,
    // BackBlackSvgComponent,
    // ItemHeaderImageComponent,
    // CloseWhiteSvgComponent,
    // KeyboardArrowBackSvgComponent,
    // KeyboardArrowForwardSvgComponent,
    // RunSvgComponent,
    // InfoSvgComponent,
    // LoadingSvgComponent,
    // HomeBlackSvgComponent,
    CollectionsFilterPipe,
    // FilterSvgComponent,
    // ItemSelectComponent,
    // DatePickerSvgComponent,
   // TypesComponent,
    SubmitDspaceComponent,
 //   CollectionsViewContainerComponent,
    // AreaOptionsComponent,
    // AreaBannerComponent,
    // AreaFiltersComponent,
    // CollectionGridComponent,
    // SubjectOptionsComponent,
    // GroupOptionsComponent,
    // CollectionRowsComponent,
    // ViewListComponent,
    // ViewGridComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatToolbarModule,
    MatSidenavModule,
    MatInputModule,
  //  MatIconModule,
    MatSelectModule,
    MatChipsModule,
    MatGridListModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    FormsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    SvgModule,
    ListModule,
   // ItemModule,

    /**
     * StoreModule.provideStore is imported once in the root module, accepting a reducer
     * function or object map of reducer functions. If passed an object of
     * reducers, combineReducers will be run creating your application
     * meta-reducer. This returns all providers for an @ngrx/store
     * based application.
     */
    StoreModule.forRoot(reducers),
    /**
     * Store devtools instrument the store retaining past versions of state
     * and recalculating new states. This enables powerful time-travel
     * debugging.
     *
     * To use the debugger, install the Redux Devtools extension for either
     * Chrome or Firefox
     *
     * See: https://github.com/zalmoxisus/redux-devtools-extension
     */
    StoreDevtoolsModule.instrument(),
    /**
     * EffectsModule.run() sets up the effects class to be typeInitialized
     * immediately when the application starts.
     *
     * See: https://github.com/ngrx/effects/blob/master/docs/api.md#run
     */

    EffectsModule.forRoot([
      CollectionEffects,
      CollectionGroupEffects,
      AreaEffects,
      SubjectEffects,
      ItemEffects,
      RelatedEffects,
      TypeEffects
    ])

  ],
  providers: [
    {provide: APP_BASE_HREF, useValue: '/'},
    {provide: LoggerService, useClass: ConsoleLoggerService},
    CollectionService,
    CollectionGroupServices,
    AreaService,
    DispatchService,
    SetSelectedService,
    SubjectService,
    TypesService,
    ItemService,
    SearchService,
    RelatedService,
    AuthCheckService,
    MenuInteractionService,
    MatIconModule,
    MatIconRegistry,
    NavigationServiceB,
    SetIntervalService,
    SetTimeoutService,
    MenuInteractionService,
    FilterUpdateServiceB,
    ScrollReadyService,
    // {provide: RequestOptions, useClass: GlobalHttpOptions}
  ],

  bootstrap: [AppComponent]
})

export class AppModule {
}
