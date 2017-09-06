import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemHeaderComponent } from './item-header.component';
import {MenuSvgComponent} from "../svg/menu-svg/menu-svg.component";
import {CloseSvgComponent} from "../svg/close-svg/close-svg.component";
import {NavigationComponent} from "../area-selector/area.component";
import {MdCheckbox, MdCheckboxModule, MdIconRegistry, MdSidenavModule, MdToolbarModule} from "@angular/material";
import {BackSvgComponent} from "../svg/back-svg/back-svg.component";
import {RouterTestingModule} from "@angular/router/testing";
import {DomSanitizer} from "@angular/platform-browser";
import {AppMenusComponent} from "../apps-menu/app-menus.component";
import {HomeSvgComponent} from "../svg/home-svg/home-svg.component";
import {CollectionsSvgComponent} from "../svg/collections-svg/collections-svg.component";
import {ItemHeaderImageComponent} from "../item-header-image/item-header-image.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HomeBlackSvgComponent} from "../svg/home-black-svg/home-black-svg.component";
import {FlexLayoutModule, ObservableMedia} from "@angular/flex-layout";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('ItemHeaderComponent', () => {
  let component: ItemHeaderComponent;
  let fixture: ComponentFixture<ItemHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ItemHeaderComponent,
        ItemHeaderImageComponent,
        MenuSvgComponent,
        HomeSvgComponent,
        HomeBlackSvgComponent,
        CollectionsSvgComponent,
        CloseSvgComponent,
        BackSvgComponent,
        NavigationComponent,
        AppMenusComponent,
        BackSvgComponent,
        MenuSvgComponent
      ],
      imports: [
        MdSidenavModule,
        MdCheckboxModule,
        MdToolbarModule,
        ReactiveFormsModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        // needed to test ObservableMedia
        FlexLayoutModule
      ],
      providers: [
        // Location,
        // RouterTestingModule,
        // MdIconRegistry,
       // ObservableMedia
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
