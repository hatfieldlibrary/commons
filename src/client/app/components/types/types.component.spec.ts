import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypesComponent } from './types.component';
import {MatListModule, MatSelectionList} from '@angular/material';
import {FilterUpdateServiceB} from '../../services/filters-2/filter-update.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Action, Store} from '@ngrx/store';
import {Subject} from 'rxjs/Subject';
import {mockStore} from '../../shared/test/mock-store';


describe('TypesComponent', () => {
  let component: TypesComponent;
  let fixture: ComponentFixture<TypesComponent>;

  const mockTypesFilter = {
    types: [{id: 1, name: 't1'}, {id: 2, name: 't2'}],
    selectedTypes: [{id: 1, name: 't1'}]
  };

  beforeEach(async(() => {
    const actions = new Subject<Action>();
    const states = new Subject<any>();
    const appStore = mockStore<any>({ actions, states });
    TestBed.configureTestingModule({
      declarations: [ TypesComponent],
      imports: [MatListModule, BrowserAnimationsModule],
      providers: [FilterUpdateServiceB,
        {
          provide: Store,
          useValue: appStore
        }]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypesComponent);
    component = fixture.componentInstance;
    component.filter = mockTypesFilter;
   // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
