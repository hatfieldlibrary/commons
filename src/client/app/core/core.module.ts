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

import {NgModule, Optional, SkipSelf} from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule, MatChipsModule, MatGridListModule, MatIconModule, MatIconRegistry,
  MatInputModule,
  MatListModule, MatProgressSpinnerModule, MatSelectModule,
  MatSidenavModule, MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {HttpClientModule} from '@angular/common/http';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {CollectionEffects} from './ngrx/effects/collection.effects';
import {ItemEffects} from './ngrx/effects/item.effects';
import {AreaEffects} from './ngrx/effects/area.effects';
import {SubjectEffects} from './ngrx/effects/subject.effects';
import {CollectionGroupEffects} from './ngrx/effects/collection-group.effects';
import {RelatedEffects} from './ngrx/effects/related.effects';
import {TypeEffects} from './ngrx/effects/types.effects';
import {reducers} from './ngrx/reducers';
import {LoggerService} from './logger/logger.service';
import {ConsoleLoggerService} from './logger/console-logger.service';
import {CollectionService} from './services/collection.service';
import {SetSelectedService} from './services/set-selected.service';
import {AreaService} from './services/area.service';
import {SubjectService} from './services/subject.service';
import {TypesService} from './services/types.service';
import {ItemService} from './services/item.service';
import {MenuInteractionService} from './services/menu/menu-interaction.service';
import {NavigationServiceB} from './services/navigation-2/navigation.service';
import {FilterUpdateServiceB} from './services/filters-2/filter-update.service';
import {SetTimeoutService} from './services/timers/timeout.service';
import {ScrollReadyService} from './services/observable/scroll-ready.service';
import {SearchService} from './services/search.service';
import {DispatchService} from './services/dispatch.service';
import {AuthCheckService} from './services/auth-check.service';
import {RelatedService} from './services/related.service';
import {SetIntervalService} from './services/timers/interval.service';
import {CollectionGroupServices} from './services/collection-group.services';
import {FooterComponent} from './components/footer/footer.component';
import {CollectionsFilterPipe} from '../shared/collections-filter.pipe';
import {CommonModule} from '@angular/common';
import {throwIfAlreadyLoaded} from './module-import-guard';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    FooterComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatCardModule,
    HttpClientModule,
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
    CollectionsFilterPipe
  ],
  exports: [FooterComponent, PageNotFoundComponent]
})
export class CoreModule {
  // Guards against reimporting the core module.
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

}
