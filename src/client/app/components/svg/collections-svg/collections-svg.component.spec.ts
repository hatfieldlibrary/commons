import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionsSvgComponent } from './collections-svg.component';
import {MdIconModule, MdIconRegistry} from "@angular/material";
import {DomSanitizer} from "@angular/platform-browser";

describe('CollectionsSvgComponent', () => {
  let component: CollectionsSvgComponent;
  let fixture: ComponentFixture<CollectionsSvgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectionsSvgComponent ],
      imports: [
        MdIconModule
      ],
      providers: [
        MdIconRegistry,
        DomSanitizer
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionsSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
