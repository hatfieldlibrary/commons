import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectOptionsComponent } from './subject-options.component';
import {MatListModule} from '@angular/material';
import {FilterUpdateServiceB} from '../../services/filters-2/filter-update.service';
import {StoreModule} from '@ngrx/store';


describe('SubjectOptionsComponent', () => {
  let component: SubjectOptionsComponent;
  let fixture: ComponentFixture<SubjectOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectOptionsComponent ],
      imports: [MatListModule, StoreModule.forRoot({})],
      providers: [FilterUpdateServiceB]
    });
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
