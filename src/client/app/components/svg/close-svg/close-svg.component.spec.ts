import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseSvgComponent } from './close-svg.component';
import {DomSanitizer} from "@angular/platform-browser";
import {MaterialModule, MdIconRegistry} from "@angular/material";

describe('CloseSvgComponent', () => {
  let component: CloseSvgComponent;
  let fixture: ComponentFixture<CloseSvgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloseSvgComponent ],
      imports: [
        MaterialModule
      ],
      providers: [
        MdIconRegistry,
        DomSanitizer
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});