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
import {PageNotFoundComponent} from './core/components/page-not-found/page-not-found.component';

const appRoutes: Routes = [

  {
    path: environment.appRoot + '/item/submit/:typeId',
    loadChildren: './lazy/submit-dspace/submit-dspace.module#SubmitDspaceModule'
  },
  {
    // TODO: this route currently requires areaId for back navigation.
    // The areaId is not part of the resource identifier and varies
    // with navigation history. Remove from path and create alternate
    // technique for back navigation (see new app menu navigation).
    path: environment.appRoot + '/item/id/:id',
    loadChildren: './lazy/item/item.module#ItemModule'
  },
  {
    path: environment.appRoot + '/collection',
    loadChildren: './lazy/browse/list.module#ListModule'
  },
  {
    path: environment.appRoot, // Go to default collection area (partial path)
    redirectTo: environment.appRoot + environment.defaultRoute,
    pathMatch: 'full'
  },
  {
    path: '',  // Go to default collection area (empty path)
    redirectTo: environment.appRoot + environment.defaultRoute,
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {
    enableTracing: false,
    scrollPositionRestoration: 'enabled',
    initialNavigation: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
