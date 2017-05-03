import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavComponent } from './side-nav.component';
import {AreaComponent} from "../area-selector/area.component";
import {MdButton, MdButtonModule, MdSidenavModule} from "@angular/material";
import {RouterModule} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";

describe('SideNavComponent', () => {
  let component: SideNavComponent;
  let fixture: ComponentFixture<SideNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SideNavComponent,
        AreaComponent
      ],
      imports: [
        MdSidenavModule,
        MdButtonModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
