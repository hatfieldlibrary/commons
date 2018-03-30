import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitDspaceComponent } from './submit-dspace.component';

describe('SubmitDspaceComponent', () => {
  let component: SubmitDspaceComponent;
  let fixture: ComponentFixture<SubmitDspaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitDspaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitDspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
