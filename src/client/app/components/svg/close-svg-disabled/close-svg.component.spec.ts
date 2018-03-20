import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseSvgDisabledComponent } from './close-svg-disabled.component';
import {DomSanitizer} from "@angular/platform-browser";
import { MatIconModule, MatIconRegistry} from "@angular/material";

describe('CloseSvgDiabledComponent', () => {
  let component: CloseSvgDisabledComponent;
  let fixture: ComponentFixture<CloseSvgDisabledComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloseSvgDisabledComponent ],
      imports: [
        MatIconModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    const iconRegistry = TestBed.get(MatIconRegistry);
    const sanitizer = TestBed.get(DomSanitizer);
    iconRegistry.addSvgIcon('close', sanitizer.bypassSecurityTrustResourceUrl('../../assets/img/svg/ic_arrow_back_black_24px.svg'));
    fixture = TestBed.createComponent(CloseSvgDisabledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
