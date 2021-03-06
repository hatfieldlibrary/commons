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
import {RouterModule} from '@angular/router';
import {environment} from '../../environments/environment';
import {CollectionViewComponent} from './collection-view-component/collection-view.component';

const listRoutes = [
  {
    path: '',
    children: [
      {
        path: 'area/:areaId',
        component: CollectionViewComponent
      },
      {
        path: 'area/:areaId/subject/:subjectId',
        component: CollectionViewComponent
      },
      {
        path: 'subject/:subjectId/area/:areaId/type/:typeId',
        component: CollectionViewComponent
      },
      {
        path: 'subject/:subjectId',
        component: CollectionViewComponent
      },
      {
        path: 'type/:typeId',
        component: CollectionViewComponent
      },
      {
        path: 'type/:typeId/subject/:subjectId',
        component: CollectionViewComponent
      },
      {
        path: 'area/:areaId/type/:typeId',
        component: CollectionViewComponent
      },
      {
        path: 'area/:areaId/type/:typeId/subject/:subjectId',
        component: CollectionViewComponent
      },
      {
        path: 'category/:categoryId/area/:areaId/type/:typeId/subject/:subjectId',
        component: CollectionViewComponent
      },
      {
        path: 'category/:categoryId/area/:areaId/subject/:subjectId',
        component: CollectionViewComponent
      },
      {
        path: 'category/:categoryId/type/:typeId',
        component: CollectionViewComponent
      },
      {
        path: 'category/:categoryId/subject/:subjectId',
        component: CollectionViewComponent
      },
      {
        path: 'category/:categoryId/area/:areaId',
        component: CollectionViewComponent
      },
      {
        path: 'category/:categoryId/area/:areaId/type/:typeId',
        component: CollectionViewComponent
      },
      {
        path: 'category/:categoryId/area/:areaId/subject/:subjectId/type/:typeId',
        component: CollectionViewComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(listRoutes)],
  exports: [RouterModule]
})
export class ListRoutingModule {

}
