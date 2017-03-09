/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed  } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';

import { SubjectsComponent } from './subjects.component';

describe('SubjectsComponent', () => {
  let component: SubjectsComponent;
  let fixture: ComponentFixture<SubjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectsComponent ],
      imports: [
        RouterTestingModule.withRoutes([{path: 'list/collections/area/1', component: SubjectsComponent}]),
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
