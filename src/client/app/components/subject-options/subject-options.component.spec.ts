import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectOptionsComponent } from './subject-options.component';

describe('SubjectOptionsComponent', () => {
  let component: SubjectOptionsComponent;
  let fixture: ComponentFixture<SubjectOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
