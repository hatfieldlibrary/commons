import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaSelectorMobileComponent } from './area-selector-mobile.component';

describe('AreaSelectorMobileComponent', () => {
  let component: AreaSelectorMobileComponent;
  let fixture: ComponentFixture<AreaSelectorMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaSelectorMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaSelectorMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
