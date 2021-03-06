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

import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {CollectionGridComponent} from './collection-grid.component';
import {ViewGridComponent} from '../../../shared/svg/view-grid/view-grid.component';
import {ViewListComponent} from '../../../shared/svg/view-list/view-list.component';
import {MatCardModule, MatGridListModule, MatIconModule} from '@angular/material';
import {LockSvgComponent} from '../../../shared/svg/lock-svg/lock-svg.component';
import {FlexLayoutModule, MediaObserver} from '@angular/flex-layout';
import {Observable, Subscription} from 'rxjs/index';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {environment} from '../../../environments/environment';
import {APP_BASE_HREF} from '@angular/common';

describe('CollectionGridComponent', () => {
  let component: CollectionGridComponent;
  let fixture: ComponentFixture<CollectionGridComponent>;
  let media: MediaObserver;
  const mockCollectionList = [
    {
      id: 1,
      title: 'c1',
      image: '',
      url: '',
      searchUrl: '',
      description: '',
      date: '',
      items: '',
      linkOptions: '',
      searchOptions: '',
      assetType: '',
      restricted: false,
      published: false,
      parent: [],
      types: [{id: 1, name: 't1'}]
    }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CollectionGridComponent,
        ViewGridComponent,
        ViewListComponent,
        ViewGridComponent,
        LockSvgComponent],
      imports: [
        MatGridListModule,
        MatCardModule,
        MatIconModule,
        HttpClientModule,
        BrowserAnimationsModule,
        // needed to test ObservableMedia
        FlexLayoutModule],
      providers: [
        {
          provide: MediaObserver,
          useValue: {
            asObservable: () => {
              return new Observable<any>();
            },
            isActive: () => {
            },
            media$: {
              subscribe: () => {
                return new Subscription();
              }
            }
          },
        },
       { provide: APP_BASE_HREF, useValue : '' }
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionGridComponent);
    component = fixture.componentInstance;
    component.collectionList = mockCollectionList;
    media = fixture.debugElement.injector.get(MediaObserver);
  });

  // it('should subscribe to media observer', fakeAsync(() => {
  //   spyOn(media, 'subscribe');
  //   component.ngOnInit();
  //   tick();
  //   expect(media.subscribe).toHaveBeenCalled();
  // }));

  it('should unsubscribe at destroy', fakeAsync( () => {
    component.ngOnInit();
    tick();
    const watcher = component.watcher;
    spyOn(watcher, 'unsubscribe');
    component.ngOnDestroy();
    tick();
    expect(watcher.unsubscribe).toHaveBeenCalled();
  }));

  it('should return results on item', () => {
    component.collectionList = mockCollectionList;
    const count = component.getResultCount();
    expect(count).toEqual('1');
  });

  it('should call set view event with "list"', () => {
    spyOn(component.setView, 'emit');
    component.setViewType('list');
    expect(component.setView.emit).toHaveBeenCalledWith('list');
  });

  it('should emit item navigation event"', () => {
    spyOn(component.collectionNavigation, 'emit');
    component.navigateToItem(1)
    expect(component.collectionNavigation.emit).toHaveBeenCalledWith(1);
  });

  it('should get image path', () => {
    const imagePath = component.getImage('test');
    expect(imagePath).toEqual(environment.apiHost + environment.imagePath + '/resources/img/thumb/test')
  });
});
