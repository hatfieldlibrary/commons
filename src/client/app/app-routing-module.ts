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
import {RouterModule, Routes} from '@angular/router';
import {environment} from './environments/environment';
import {SubmitDspaceComponent} from './components/submit-dspace/submit-dspace.component';
import {PageNotFoundComponent} from './shared/components/page-not-found/page-not-found.component';
import {ItemContainerComponent} from './containers/item-container/item-container.component';
import {ListsContainerComponent} from './containers/lists-container/lists-container.component';

const appRoutes: Routes = [

  {path: environment.appRoot + '/item/id/:id/:areaId', component: ItemContainerComponent},
  {path: environment.appRoot + '/collection/area/:areaId', component: ListsContainerComponent},
  // This is the former root path (now redirecting to default area)
  // {path: environment.appRoot + '/collection', component: ListsContainerComponent},
  {path: environment.appRoot + '/collection/area/:areaId/subject/:subjectId', component: ListsContainerComponent},
  {
    path: environment.appRoot + '/collection/subject/:subjectId/area/:areaId/type/:typeId',
    component: ListsContainerComponent
  },
  {path: environment.appRoot + '/collection/subject/:subjectId', component: ListsContainerComponent},
  {path: environment.appRoot + '/collection/type/:typeId', component: ListsContainerComponent},
  {path: environment.appRoot + '/collection/type/:typeId/subject/:subjectId', component: ListsContainerComponent},
  {path: environment.appRoot + '/collection/area/:areaId/type/:typeId', component: ListsContainerComponent},
  {
    path: environment.appRoot + '/collection/area/:areaId/type/:typeId/subject/:subjectId',
    component: ListsContainerComponent
  },
  {
    path: environment.appRoot + '/collection/category/:categoryId/area/:areaId/type/:typeId/subject/:subjectId',
    component: ListsContainerComponent
  },
  {
    path: environment.appRoot + '/collection/category/:categoryId/area/:areaId/subject/:subjectId',
    component: ListsContainerComponent
  },
  {path: environment.appRoot + '/collection/category/:categoryId/type/:typeId', component: ListsContainerComponent},
  {
    path: environment.appRoot + '/collection/category/:categoryId/subject/:subjectId',
    component: ListsContainerComponent
  },
  {
    path: environment.appRoot + '/collection/category/:categoryId/area/:areaId',
    component: ListsContainerComponent
  },
  {
    path: environment.appRoot + '/collection/category/:categoryId/area/:areaId/type/:typeId',
    component: ListsContainerComponent
  },
  {
    path: environment.appRoot + '/collection/category/:categoryId/area/:areaId/subject/:subjectId/type/:typeId',
    component: ListsContainerComponent
  },
  {path: environment.appRoot + '/item/submit/:typeId', component: SubmitDspaceComponent}, // requires type id, e.g. senior theses
  {path: environment.appRoot + '/collection',
    redirectTo: environment.appRoot + '/collection/area/5',
    pathMatch: 'full'}, // default collection area
  {path: environment.appRoot, redirectTo: environment.appRoot + '/collection/area/5', pathMatch: 'full'}, // default collection area
  {path: '', redirectTo: environment.appRoot + '/collection/area/5', pathMatch: 'full'}, // default collection area
  {path: '**', component: PageNotFoundComponent}

];

@NgModule( {
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
