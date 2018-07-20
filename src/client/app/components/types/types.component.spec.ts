import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypesComponent } from './types.component';
import {MatListModule, MatSelectionList} from '@angular/material';
import {FilterUpdateServiceB} from '../../services/filters-2/filter-update.service';
import {StoreModule} from '@ngrx/store';

describe('TypesComponent', () => {
  let component: TypesComponent;
  let fixture: ComponentFixture<TypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypesComponent],
      imports: [MatListModule, StoreModule.forRoot({})],
      providers: [FilterUpdateServiceB
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
