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
  MatCardModule
} from '@angular/material';
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
import {CommonModule} from '@angular/common';
import {throwIfAlreadyLoaded} from './module-import-guard';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {environment} from '../environments/environment';
import {TransferState} from '@angular/platform-browser';

@NgModule({
  declarations: [
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
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
    !environment.production ? StoreDevtoolsModule.instrument() : [],
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
    TransferState
  ],
  exports: [ PageNotFoundComponent ]
})
export class CoreModule {
  // Guards against reimporting the core module.
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

}
