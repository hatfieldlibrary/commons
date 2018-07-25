import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SearchSvgComponent} from './search-svg.component';
import {MatIconModule, MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

describe('SearchSvgComponent', () => {
  let component: SearchSvgComponent;
  let fixture: ComponentFixture<SearchSvgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchSvgComponent],
      imports: [MatIconModule, HttpClientModule]
    });
  }));

  beforeEach(() => {
    const iconRegistry = TestBed.get(MatIconRegistry);
    const sanitizer = TestBed.get(DomSanitizer);
    iconRegistry.addSvgIcon('search', sanitizer.bypassSecurityTrustResourceUrl('../../assets/img/svg/ic_search_white_24px.svg'));
    fixture = TestBed.createComponent(SearchSvgComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
