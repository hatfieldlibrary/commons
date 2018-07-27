import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SearchSvgComponent} from './search-svg.component';
import {MatIconModule} from '@angular/material';
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
    fixture = TestBed.createComponent(SearchSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
