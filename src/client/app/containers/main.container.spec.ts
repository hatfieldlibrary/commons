/**
 * Created by mspalti on 3/8/17.
 */
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed  } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {StoreModule, Store} from "@ngrx/store";
import {MaterialModule} from "@angular/material";

import { MainContainer } from './main.container';
import {ListComponent} from "../app/components/collection-list/list.component";
import {AreaComponent} from "../app/components/area-selector/area.component";
import {SubjectsComponent} from "../app/components/subject-selector/subjects.component";
import * as fromRoot from '../reducers';

 class MockStore {
   select = jasmine.createSpy('select');
   dispatch = jasmine.createSpy('dispatch');
 }

describe('MainContainer', () => {
  let component: MainContainer;
  let fixture: ComponentFixture<MainContainer>;
  let store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainContainer, ListComponent, AreaComponent, SubjectsComponent ],
      imports: [
        MaterialModule,
        StoreModule.provideStore({}),
        RouterTestingModule.withRoutes([{path: 'list/collections/area/1', component: MainContainer}]),
      ],
      providers: [{
        provide: Store,
        useClass: MockStore
      }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = fixture.debugElement.injector.get(Store);
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select areas', () => {
     expect(store.select).toHaveBeenCalledWith(fromRoot.getAreas)
  });

  it('should select collections', () => {
    expect(store.select).toHaveBeenCalledWith(fromRoot.getCollections)
  });

  it('should select subjects', () => {
    expect(store.select).toHaveBeenCalledWith(fromRoot.getSubject)
  });
});
