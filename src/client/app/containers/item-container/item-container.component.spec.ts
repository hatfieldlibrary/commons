import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {ItemContainerComponent} from './item-container.component';
import {ItemComponent} from "../../components/item/item.component";
import {MaterialModule} from "@angular/material";
import {Store, StoreModule} from "@ngrx/store";
import {RouterTestingModule} from "@angular/router/testing";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {AppComponent} from "../../components/app.component";
import {MainContainer} from "../main-container/main.container";
import {ListComponent} from "../../components/collection-list/list.component";
import {AreaComponent} from "../../components/area-selector/area.component";
import {SubjectsComponent} from "app/components/subject-selector/subjects.component";
import {ImageHeaderComponent} from "../../components/image-header/image-header.component";
import {AreaInformationComponent} from "../../components/area-information/area-information.component";
import {RelatedItemsComponent} from "../../components/related-items/related-items.component";
import {PageNotFoundComponent} from "../../shared/components/page-not-found/page-not-found.component";
import * as fromItem from '../../actions/item.actions';
import {appRoutes} from '../../app.module';

class MockActivatedRoute extends ActivatedRoute {

  params: Observable<any>;

  setParamMock(mockRoute: any) {
    if (mockRoute) {
      this.params = Observable.of(mockRoute);
    } else {
      this.params = Observable.of({});
    }
  }
}

const setMockRoute = (route: MockActivatedRoute, mock: string) => {
  route.setParamMock({id: mock});
  spyOn(route.params, 'subscribe').and.callThrough();
};

class MockStore {

  select = () => {
    return Observable.of([]);
  };
  dispatch = jasmine.createSpy('dispatch');

}

describe('ItemContainerComponent', () => {
  let component: ItemContainerComponent;
  let fixture: ComponentFixture<ItemContainerComponent>;
  let route:MockActivatedRoute;
  let store:MockStore;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MainContainer,
        ListComponent,
        AreaComponent,
        SubjectsComponent,
        ImageHeaderComponent,
        AreaInformationComponent,
        PageNotFoundComponent,
        ItemContainerComponent,
        ItemComponent,
        RelatedItemsComponent
      ],
      imports: [
        MaterialModule,
        StoreModule.provideStore({}),
        RouterTestingModule.withRoutes(appRoutes),
      ],
      providers: [
        {
          provide: Store,
          useClass: MockStore
        },
        {
          provide: ActivatedRoute,
          useClass: MockActivatedRoute
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {

    TestBed.createComponent(AppComponent);
    fixture = TestBed.createComponent(ItemContainerComponent);
    component = fixture.componentInstance;
    store = fixture.debugElement.injector.get(Store);
    route = fixture.debugElement.injector.get(ActivatedRoute);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch request for item data', fakeAsync(() => {

    setMockRoute(route, '1');
    component.ngOnInit();
    tick();
    expect(store.dispatch).toHaveBeenCalledWith(new fromItem.ItemRequest('1'));

  }));

  it('should not dispatch request if id parameter is not supplied.', fakeAsync(() => {

    route.setParamMock(null);
    component.ngOnInit();
    tick();
    expect(component.id).toBeUndefined();

  }));

});
