import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {CollectionGridComponent} from './collection-grid.component';
import {ViewGridComponent} from '../svg/view-grid/view-grid.component';
import {ViewListComponent} from '../svg/view-list/view-list.component';
import {MatCardModule, MatGridListModule, MatIconModule} from '@angular/material';
import {LockSvgComponent} from '../svg/lock-svg/lock-svg.component';
import {FlexLayoutModule, ObservableMedia} from '@angular/flex-layout';
import {Observable, Subscription} from 'rxjs/index';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {environment} from '../../environments/environment';

describe('CollectionGridComponent', () => {
  let component: CollectionGridComponent;
  let fixture: ComponentFixture<CollectionGridComponent>;
  let media: ObservableMedia;
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
          provide: ObservableMedia,
          useValue: {
            asObservable: () => {
              return new Observable<any>();
            },
            isActive: () => {
            },
            subscribe: () => { return new Subscription(); }
          }
        }
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionGridComponent);
    component = fixture.componentInstance;
    component.collectionList = mockCollectionList;
    media = fixture.debugElement.injector.get(ObservableMedia);
  });

  it('should unsubscribe at destroy', fakeAsync( () => {
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
