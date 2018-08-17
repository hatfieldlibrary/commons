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

// Define a default route to use in redirects.
const defaultRoutePath = '/collection/area/5';

const appRoutes: Routes = [

  {
    path: environment.appRoot + '/item/submit/:typeId',
    component: SubmitDspaceComponent // requires type id, e.g. senior theses
  },
  {
    path: environment.appRoot + '/item/id/:id/:areaId',
    loadChildren: './components/item-components/item.module#ItemModule'
  },
  {
    path: environment.appRoot + '/collection',
    loadChildren: './components/list-components/list.module#ListModule'
  },
  {
    path: environment.appRoot, // Go to default collection area (partial path)
    redirectTo: environment.appRoot + defaultRoutePath,
    pathMatch: 'full'
  },
  {
    path: '',  // Go to default collection area (empty path)
    redirectTo: environment.appRoot + defaultRoutePath,
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {enableTracing: false})],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
