import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuSvgComponent } from './menu-svg.component';
import { MdIconModule, MdIconRegistry} from "@angular/material";
import {DomSanitizer} from "@angular/platform-browser";

describe('MenuSvgComponent', () => {
  let component: MenuSvgComponent;
  let fixture: ComponentFixture<MenuSvgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuSvgComponent ],
      imports: [
        MdIconModule
    ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    let iconRegistry = TestBed.get(MdIconRegistry);
    let sanitizer = TestBed.get(DomSanitizer);
    iconRegistry.addSvgIcon('menu', sanitizer.bypassSecurityTrustResourceUrl('../../assets/img/svg/ic_menu_white_24px.svg'));
    fixture = TestBed.createComponent(MenuSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
