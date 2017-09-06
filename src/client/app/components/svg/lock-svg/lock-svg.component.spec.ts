import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LockSvgComponent } from './lock-svg.component';
import {DomSanitizer} from "@angular/platform-browser";
import {MaterialModule, MdIconModule, MdIconRegistry} from "@angular/material";

describe('LockSvgComponent', () => {
  let component: LockSvgComponent;
  let fixture: ComponentFixture<LockSvgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LockSvgComponent ],
      imports: [
        MdIconModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    let iconRegistry = TestBed.get(MdIconRegistry);
    let sanitizer = TestBed.get(DomSanitizer);
    iconRegistry.addSvgIcon('lock', sanitizer.bypassSecurityTrustResourceUrl('../../assets/img/svg/ic_https_black_24px.svg'));
    fixture = TestBed.createComponent(LockSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
