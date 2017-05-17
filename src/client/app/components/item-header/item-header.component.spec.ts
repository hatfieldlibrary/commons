import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemHeaderComponent } from './item-header.component';
import {MenuSvgComponent} from "../svg/menu-svg/menu-svg.component";
import {CloseSvgComponent} from "../svg/close-svg/close-svg.component";
import {AreaComponent} from "../area-selector/area.component";
import {MdIconRegistry, MdSidenavModule, MdToolbarModule} from "@angular/material";
import {BackSvgComponent} from "../svg/back-svg/back-svg.component";
import {RouterTestingModule} from "@angular/router/testing";
import {DomSanitizer} from "@angular/platform-browser";
import {AppMenusComponent} from "../apps-menu/app-menus.component";
import {HomeSvgComponent} from "../svg/home-svg/home-svg.component";
import {CollectionsSvgComponent} from "../svg/collections-svg/collections-svg.component";

describe('ItemHeaderComponent', () => {
  let component: ItemHeaderComponent;
  let fixture: ComponentFixture<ItemHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ItemHeaderComponent,
        MenuSvgComponent,
        HomeSvgComponent,
        CollectionsSvgComponent,
        CloseSvgComponent,
        BackSvgComponent,
        AreaComponent,
        AppMenusComponent,
        BackSvgComponent,
        MenuSvgComponent
      ],
      imports: [
        MdSidenavModule,
        MdToolbarModule,
        RouterTestingModule
      ],
      providers: [
        DomSanitizer,
        Location,
        RouterTestingModule,
        MdIconRegistry,
        DomSanitizer
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
