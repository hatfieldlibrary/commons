import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {MaterialModule} from '@angular/material';
import {RouterModule} from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {FlexLayoutModule} from '@angular/flex-layout';
import 'hammerjs';

import {AppComponent} from './components/app.component';
import {MainContainer} from "./containers/main-container/main.container";
import {AreaComponent} from './components/area-selector/area.component';
import {ListComponent} from './components/collection-list/list.component';
import {ItemComponent} from './components/item/item.component';
import {ImageHeaderComponent} from './components/image-header/image-header.component';
import {AreaInformationComponent} from './components/area-information/area-information.component';
import {PageNotFoundComponent} from './shared/components/page-not-found/page-not-found.component';
import {SubjectsComponent} from './components/subject-selector/subjects.component';
import {ListServiceService} from './shared/list-service.service';
import {CollectionService} from './services/collection.service';
import {AreaService} from './services/area.service';
import {AreaEffects} from './effects/area.effects';
import {SubjectService} from './services/subject.service';
import {SubjectEffects} from './effects/subject.effects';
import {CollectionEffects} from './effects/collection.effects';
import {ItemContainerComponent} from './containers/item-container/item-container.component';
import {reducer} from './reducers';
import {ItemEffects} from "./effects/item.effects";
import {ItemService} from "./services/item.service";
import {RelatedEffects} from "./effects/related.effects";
import { RelatedItemsComponent } from './components/related-items/related-items.component';
import {RelatedService} from "./services/related.service";


// export const appRoutes = [
//
//   {
//     path: 'item', component: AppComponent,
//     children: [
//       {path: 'id/:id', component: ItemContainerComponent}
//     ]
//   },
//   {
//     path: 'list/collections', component: AppComponent,
//     children: [
//       {path: 'area/:areaId', component: MainContainer},
//       {path: 'subject/:subjectId/area/:areaId', component: MainContainer},
//     ]
//   },
//   {path: '', redirectTo: 'list/collections/area/0', pathMatch: 'full'},
//
//   {path: '**', component: PageNotFoundComponent}
//
// ];

export const appRoutes = [

  {path: 'item/id/:id', component: ItemContainerComponent},
  {path: 'collection/area/:areaId', component: MainContainer},
  {path: 'collection', component: MainContainer},
  {path: 'collection/subject/:subjectId/area/:areaId', component: MainContainer},
  {path: 'collection/subject/:subjectId', component: MainContainer},
  {path: '', redirectTo: 'collection', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}

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
    AreaInformationComponent,
    ItemComponent,
    ItemContainerComponent,
    RelatedItemsComponent
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
    EffectsModule.run(SubjectEffects),
    EffectsModule.run(ItemEffects),
    EffectsModule.run(RelatedEffects)

  ],
  providers: [
    {provide: APP_BASE_HREF, useValue: '/'},
    ListServiceService,
    CollectionService,
    AreaService,
    SubjectService,
    ItemService,
    RelatedService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
