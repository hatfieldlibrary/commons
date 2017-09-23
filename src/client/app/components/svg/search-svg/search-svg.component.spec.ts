import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SearchSvgComponent} from './search-svg.component';
import {MdIconModule, MdIconRegistry} from "@angular/material";
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
        MdIconModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    let iconRegistry = TestBed.get(MdIconRegistry);
    let sanitizer = TestBed.get(DomSanitizer);
    iconRegistry.addSvgIcon('search', sanitizer.bypassSecurityTrustResourceUrl('../../assets/img/svg/ic_arrow_back_black_24px.svg'));
    fixture = TestBed.createComponent(SearchSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
