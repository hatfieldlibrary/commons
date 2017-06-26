import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterSvgComponent } from './filter-svg.component';

describe('FilterSvgComponent', () => {
  let component: FilterSvgComponent;
  let fixture: ComponentFixture<FilterSvgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterSvgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
