/*
 * Copyright (c) 2017.
 *
 *   This program is free software: you can redistribute it and/or modify
 *    it under the terms of the GNU General Public License as published by
 *    the Free Software Foundation, either version 3 of the License, or
 *    (at your option) any later version.
 *
 *    This program is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU General Public License for more details.
 *
 *   You should have received a copy of the GNU General Public License
 *    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule, RequestOptions} from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MdButtonModule, MdSelectModule, MdCardModule, MdListModule, MdToolbarModule, MdIconModule, MdChipsModule,
  MdSidenavModule, MdIconRegistry, MdInputModule, MdGridListModule, MdRadioModule, MdCheckboxModule
} from '@angular/material';
import {RouterModule} from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {FlexLayoutModule} from '@angular/flex-layout';
import 'hammerjs';

import {AppComponent} from './components/app.component';
import {ListsContainerComponent} from "./containers/lists-container/lists-container.component";
import {NavigationComponent} from './components/nav-selector/area.component';
import {ListComponent} from './components/collection-list/list.component';
import {ItemComponent} from './components/item/item.component';
import {ListHeaderComponent} from './components/image-header/image-header.component';
import {AreaInformationComponent} from './components/area-information/area-information.component';
import {PageNotFoundComponent} from './shared/components/page-not-found/page-not-found.component';
import {SubjectsComponent} from './components/subject-selector/subjects.component';
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
import { MenuSvgComponent } from './components/svg/menu-svg/menu-svg.component';
import { CloseSvgComponent } from './components/svg/close-svg/close-svg.component';
import { HomeScreenComponent } from './components/home-screen/home-screen.component';
import { ItemHeaderComponent } from './components/item-header/item-header.component';
import { BackSvgComponent } from './components/svg/back-svg/back-svg.component';
import {GlobalHttpOptions} from "./shared/global-request";
import { LockSvgComponent } from './components/svg/lock-svg/lock-svg.component';
import { FooterComponent } from './components/footer/footer.component';
import { ItemLinksComponent } from './components/item-links/item-links.component';
import { SearchSvgComponent } from './components/svg/search-svg/search-svg.component';
import {SearchService} from "./services/search.service";
import {AuthCheckService} from "./services/auth-check.service";
import { AppMenusComponent } from './components/apps-menu/app-menus.component';
import { HomeSvgComponent } from './components/svg/home-svg/home-svg.component';
import { CollectionsSvgComponent } from './components/svg/collections-svg/collections-svg.component';
import { AreasSvgComponent } from './components/svg/areas-svg/areas-svg.component';
import { TitleHeaderComponent } from './components/title-header/title-header.component';
import { ItemHeaderImageComponent } from './components/item-header-image/item-header-image.component';
import { CloseWhiteSvgComponent } from './components/svg/close-white-svg/close-white-svg.component';
import { KeyboardArrowBackSvgComponent } from './components/svg/keyboard-arrow-back-svg/keyboard-arrow-back-svg.component';
import { KeyboardArrowForwardSvgComponent } from './components/svg/keyboard-arrow-forward-svg/keyboard-arrow-forward-svg.component';
import { RunSvgComponent } from './components/svg/run-svg/run-svg.component';
import { InfoSvgComponent } from './components/svg/info-svg/info-svg.component';
import { LoadingSvgComponent } from './components/svg/loading-svg/loading-svg.component';
import { BackBlackSvgComponent } from './components/svg/back-black-svg/back-black-svg.component';
import { CollectionsFilterPipe } from './services/filters/collections-filter.pipe';
import { FilterSvgComponent } from './components/svg/filter-svg/filter-svg.component';


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
//       {path: 'area/:areaId', component: ListsContainerComponent},
//       {path: 'subject/:subjectId/area/:areaId', component: ListsContainerComponent},
//     ]
//   },
//   {path: '', redirectTo: 'list/collections/area/0', pathMatch: 'full'},
//
//   {path: '**', component: PageNotFoundComponent}
//
// ];

export const appRoutes = [

  {path: 'commons-preview/item/id/:id/:areaId', component: ItemContainerComponent},
  {path: 'commons-preview/collection/area/:areaId', component: ListsContainerComponent},
  {path: 'commons-preview/collection', component: ListsContainerComponent},
  {path: 'commons-preview/collection/subject/:subjectId/area/:areaId', component: ListsContainerComponent},
  {path: 'commons-preview/collection/subject/:subjectId', component: ListsContainerComponent},
  {path: '', redirectTo: 'commons-preview/collection', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}

];

@NgModule({
  declarations: [
    BackSvgComponent,
    LockSvgComponent,
    MenuSvgComponent,
    CloseSvgComponent,
    AppComponent,
    NavigationComponent,
    ListComponent,
    ListsContainerComponent,
    SubjectsComponent,
    PageNotFoundComponent,
    ListHeaderComponent,
    AreaInformationComponent,
    ItemComponent,
    ItemContainerComponent,
    RelatedItemsComponent,
    HomeScreenComponent,
    ItemHeaderComponent,
    FooterComponent,
    ItemLinksComponent,
    SearchSvgComponent,
    AppMenusComponent,
    HomeSvgComponent,
    CollectionsSvgComponent,
    AreasSvgComponent,
    TitleHeaderComponent,
    ItemHeaderImageComponent,
    CloseWhiteSvgComponent,
    KeyboardArrowBackSvgComponent,
    KeyboardArrowForwardSvgComponent,
    RunSvgComponent,
    InfoSvgComponent,
    LoadingSvgComponent,
    BackBlackSvgComponent,
    CollectionsFilterPipe,
    FilterSvgComponent

  ],
  imports: [
    FlexLayoutModule,
    MdButtonModule,
    MdCardModule,
    MdListModule,
    MdToolbarModule,
    MdSidenavModule,
    MdInputModule,
    MdIconModule,
    MdSelectModule,
    MdChipsModule,
    MdGridListModule,
    MdCheckboxModule,
    BrowserAnimationsModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
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
    CollectionService,
    AreaService,
    SubjectService,
    ItemService,
    SearchService,
    RelatedService,
    AuthCheckService,
    MdIconRegistry,
    {provide: RequestOptions, useClass: GlobalHttpOptions}
  ],

  bootstrap: [ AppComponent]
})

export class AppModule {
}
