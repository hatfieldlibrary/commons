import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import 'hammerjs';

import { AppComponent } from './app.component';
import { AreaComponent } from './components/area-selector/area.component';
import { ListComponent } from './components/collection-list/list.component';
import {PageNotFoundComponent} from './shared/components/page-not-found/page-not-found.component'
import {ListServiceService} from "./shared/list-service.service";
import {CollectionService} from "./services/collection.service";
import {AreaService} from "./services/area.service";
import {EffectsModule} from "@ngrx/effects";
import {CollectionEffects} from "./effects/collection.effects";
import { reducer } from './reducers';
import {StoreModule} from "@ngrx/store";
import {MainContainer} from "./containers/main.container";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import { SubjectsComponent } from './components/subject-selector/subjects.component';
import {AreaEffects} from "./effects/area.effects";
import {SubjectService} from "./services/subject.service";
import {SubjectEffects} from "./effects/subject.effects";
import { ImageHeaderComponent } from './components/image-header/image-header.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AreaInformationComponent } from './components/area-information/area-information.component';


export const appRoutes = [

  { path: 'list/collections/area/:areaId', component: MainContainer },
  { path: 'list/collections/subject/:subjectId/area/:areaId', component: MainContainer },
  { path: '', redirectTo: 'list/collections/area/0', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }

];

@NgModule({
  declarations: [
    AppComponent,
    AreaComponent,
    ListComponent,
    MainContainer,
    SubjectsComponent,
    PageNotFoundComponent,
    ImageHeaderComponent,
    AreaInformationComponent
  ],
  imports: [
    MaterialModule,
    FlexLayoutModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    /**
     * StoreModule.provideStore is imported once in the root module, accepting a reducer
     * function or object map of reducer functions. If passed an object of
     * reducers, combineReducers will be run creating your application
     * meta-reducer. This returns all providers for an @ngrx/store
     * based application.
     */
    StoreModule.provideStore(reducer),
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
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    /**
     * EffectsModule.run() sets up the effects class to be initialized
     * immediately when the application starts.
     *
     * See: https://github.com/ngrx/effects/blob/master/docs/api.md#run
     */
    EffectsModule.run(CollectionEffects),
    EffectsModule.run(AreaEffects),
    EffectsModule.run(SubjectEffects)

  ],
  providers: [
    {provide: APP_BASE_HREF, useValue: '/'},
    ListServiceService,
    CollectionService,
    AreaService,
    SubjectService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
