import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CollectionRowsComponent} from './collection-rows.component';
import {ViewGridComponent} from '../svg/view-grid/view-grid.component';
import {ViewListComponent} from '../svg/view-list/view-list.component';
import {LockSvgComponent} from '../svg/lock-svg/lock-svg.component';
import {MatIconModule, MatList, MatListModule} from '@angular/material';
import {FlexLayoutModule, ObservableMedia} from '@angular/flex-layout';
import {Observable, Subscription} from 'rxjs/index';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('CollectionRowsComponent', () => {
  let component: CollectionRowsComponent;
  let fixture: ComponentFixture<CollectionRowsComponent>;
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
      declarations: [CollectionRowsComponent, ViewGridComponent, ViewListComponent, LockSvgComponent],
      imports: [
        MatListModule,
        MatIconModule,
        HttpClientModule,
        BrowserAnimationsModule,
        // needed to test ObservableMedia
        FlexLayoutModule
      ],
      providers: [
        {
          provide: ObservableMedia,
          useValue: {
            asObservable: () => {
              return new Observable<any>();
            },
            isActive: () => {
            },
            subscribe: () => {
              return new Subscription();
            }
          }
        }
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionRowsComponent);
    component = fixture.componentInstance;
    component.collectionList = mockCollectionList;
    // fixture.detectChanges();
  });

  it('should create', async () => {
    expect(component).toBeTruthy();
  });
});
