import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypesComponent } from './types.component';
import {MatListModule, MatSelectionList} from '@angular/material';
import {FilterUpdateServiceB} from '../../services/filters-2/filter-update.service';
import {StoreModule} from '@ngrx/store';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('TypesComponent', () => {
  let component: TypesComponent;
  let fixture: ComponentFixture<TypesComponent>;

  const mockTypesFilter = {
    types: [{id: 1, name: 't1'}, {id: 2, name: 't2'}],
    selectedTypes: [{id: 1, name: 't1'}]
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypesComponent],
      imports: [MatListModule, BrowserAnimationsModule, StoreModule.forRoot({})],
      providers: [FilterUpdateServiceB
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypesComponent);
    component = fixture.componentInstance;
    component.filter = mockTypesFilter;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
