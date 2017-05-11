import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppMenusComponent } from './app-menus.component';
import {MenuSvgComponent} from "../svg/menu-svg/menu-svg.component";
import {BackSvgComponent} from "../svg/back-svg/back-svg.component";
import {MdToolbarModule} from "@angular/material";
import {CloseSvgComponent} from "../svg/close-svg/close-svg.component";
import {AreaComponent} from "../area-selector/area.component";
import {RouterTestingModule} from "@angular/router/testing";

describe('AppMenusComponent', () => {
  let component: AppMenusComponent;
  let fixture: ComponentFixture<AppMenusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppMenusComponent,
        MenuSvgComponent,
        BackSvgComponent,
        CloseSvgComponent,
        AreaComponent ],
      imports: [
        MdToolbarModule,
        RouterTestingModule
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
