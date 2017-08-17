import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AppMenusComponent} from './app-menus.component';
import {MenuSvgComponent} from "../svg/menu-svg/menu-svg.component";
import {BackSvgComponent} from "../svg/back-svg/back-svg.component";
import {MdCheckboxModule, MdIconModule, MdToolbarModule} from "@angular/material";
import {CloseSvgComponent} from "../svg/close-svg/close-svg.component";
import {NavigationComponent} from "../area-selector/area.component";
import {RouterTestingModule} from "@angular/router/testing";
import {HomeSvgComponent} from "../svg/home-svg/home-svg.component";
import {CollectionsSvgComponent} from "../svg/collections-svg/collections-svg.component";
import {HomeBlackSvgComponent} from "../svg/home-black-svg/home-black-svg.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UtilitiesService} from "../../services/utilities.service";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs/Observable";

describe('AppMenusComponent', () => {
  let component: AppMenusComponent;
  let fixture: ComponentFixture<AppMenusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppMenusComponent,
        MenuSvgComponent,
        HomeBlackSvgComponent,
        BackSvgComponent,
        CloseSvgComponent,
        NavigationComponent,
        HomeSvgComponent,
        CollectionsSvgComponent],
      imports: [
        MdToolbarModule,
        FormsModule,
        ReactiveFormsModule,
        MdCheckboxModule,
        MdIconModule,
        RouterTestingModule
      ],
      providers: [
        UtilitiesService,
        {
          provide: Store,
          useClass: class {
            dispatch = jasmine.createSpy('dispatch'); select = () => {
              return Observable.of('');
            };
          }
        }
      ]
    })
      .compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(AppMenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
