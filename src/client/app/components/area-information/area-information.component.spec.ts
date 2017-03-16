import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaInformationComponent } from './area-information.component';

describe('AreaInformationComponent', () => {
  let component: AreaInformationComponent;
  let fixture: ComponentFixture<AreaInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
