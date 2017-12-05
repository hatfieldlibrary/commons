import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseSvgComponent } from './close-svg.component';
import {DomSanitizer} from "@angular/platform-browser";
import { MatIconModule, MatIconRegistry} from "@angular/material";

describe('CloseSvgComponent', () => {
  let component: CloseSvgComponent;
  let fixture: ComponentFixture<CloseSvgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloseSvgComponent ],
      imports: [
        MatIconModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    let iconRegistry = TestBed.get(MatIconRegistry);
    let sanitizer = TestBed.get(DomSanitizer);
    iconRegistry.addSvgIcon('close', sanitizer.bypassSecurityTrustResourceUrl('../../assets/img/svg/ic_arrow_back_black_24px.svg'));
    fixture = TestBed.createComponent(CloseSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
