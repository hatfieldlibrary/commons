import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuSvgComponent } from './menu-svg.component';
import { MatIconModule, MatIconRegistry} from "@angular/material";
import {DomSanitizer} from "@angular/platform-browser";

describe('MenuSvgComponent', () => {
  let component: MenuSvgComponent;
  let fixture: ComponentFixture<MenuSvgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuSvgComponent ],
      imports: [
        MatIconModule
    ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    let iconRegistry = TestBed.get(MatIconRegistry);
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
