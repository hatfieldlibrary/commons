import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackSvgComponent } from './back-svg.component';
import {DomSanitizer} from "@angular/platform-browser";
import { MatIconModule, MatIconRegistry} from "@angular/material";

describe('BackSvgComponent', () => {
  let component: BackSvgComponent;
  let fixture: ComponentFixture<BackSvgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackSvgComponent ],
      imports: [
        MatIconModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    let iconRegistry = TestBed.get(MatIconRegistry);
    let sanitizer = TestBed.get(DomSanitizer);
    iconRegistry.addSvgIcon('back', sanitizer.bypassSecurityTrustResourceUrl('../../assets/img/svg/ic_arrow_back_white_24px.svg'));
    fixture = TestBed.createComponent(BackSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
