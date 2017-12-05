import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LockSvgComponent } from './lock-svg.component';
import {DomSanitizer} from "@angular/platform-browser";
import { MatIconModule, MatIconRegistry} from "@angular/material";

describe('LockSvgComponent', () => {
  let component: LockSvgComponent;
  let fixture: ComponentFixture<LockSvgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LockSvgComponent ],
      imports: [
        MatIconModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    let iconRegistry = TestBed.get(MatIconRegistry);
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
