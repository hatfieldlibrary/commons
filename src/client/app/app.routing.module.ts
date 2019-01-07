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
    path: environment.appRoot, // Go to default collection area (partial path)
    redirectTo:  environment.defaultRoute,
    pathMatch: 'full'
  },
  {
    path: 'collection',  // Go to default collection area (empty path)
    redirectTo: environment.defaultRoute,
    pathMatch: 'full'
  },
  {
    path:  'commons/item/submit/:typeId',
    loadChildren: './lazy/submit-dspace/submit-dspace.module#SubmitDspaceModule'
  },
  {
    path:  'item/submit/:typeId',
    loadChildren: './lazy/submit-dspace/submit-dspace.module#SubmitDspaceModule'
  },
  {
    path:  'item/id/:id',
    loadChildren: './lazy/item/item.module#ItemModule'
  },
  {
    path:  'commons/item/id/:id',
    loadChildren: './lazy/item/item.module#ItemModule'
  },
  {
    path:  'collection',
    loadChildren: './lazy/browse/list.module#ListModule'
  },
  {
    path:  'commons/collection',
    loadChildren: './lazy/browse/list.module#ListModule'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {
    enableTracing: false,
    initialNavigation: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
