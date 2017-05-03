import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SearchSvgComponent} from './search-svg.component';
import {MaterialModule, MdIconRegistry} from "@angular/material";
import {DomSanitizer} from "@angular/platform-browser";

describe('SearchSvgComponent', () => {
  let component: SearchSvgComponent;
  let fixture: ComponentFixture<SearchSvgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SearchSvgComponent,
      ],
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
    fixture = TestBed.createComponent(SearchSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
