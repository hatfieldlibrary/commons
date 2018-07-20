import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupOptionsComponent } from './group-options.component';
import {MatListModule, MatListOption} from '@angular/material';
import {FilterUpdateServiceB} from '../../services/filters-2/filter-update.service';
import {StoreModule} from '@ngrx/store';

describe('GroupOptionsComponent', () => {
  let component: GroupOptionsComponent;
  let fixture: ComponentFixture<GroupOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupOptionsComponent ],
      imports: [MatListModule, StoreModule.forRoot({})],
      providers: [FilterUpdateServiceB]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async () => {
    expect(component).toBeTruthy();
  });
});
