import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentFiltersComponent } from './current-filters.component';

describe('CurrentFiltersComponent', () => {
  let component: CurrentFiltersComponent;
  let fixture: ComponentFixture<CurrentFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
