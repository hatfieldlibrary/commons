import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaOptionsComponent } from './area-options.component';

describe('AreaOptionsComponent', () => {
  let component: AreaOptionsComponent;
  let fixture: ComponentFixture<AreaOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
