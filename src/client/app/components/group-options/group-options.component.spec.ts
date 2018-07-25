import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GroupOptionsComponent} from './group-options.component';
import {MatListModule} from '@angular/material';
import {FilterUpdateServiceB} from '../../services/filters-2/filter-update.service';
import {StoreModule} from '@ngrx/store';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('GroupOptionsComponent', () => {
  let component: GroupOptionsComponent;
  let fixture: ComponentFixture<GroupOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupOptionsComponent],
      imports: [MatListModule, BrowserAnimationsModule, StoreModule.forRoot({})],
      providers: [FilterUpdateServiceB]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupOptionsComponent);
    component = fixture.componentInstance;
    component.filter = {
      groups: [{id: 1, name: 'g1'}, {id: 2, name: 'g2'}],
      selectedGroups: [{id: 1, name: 'g1'}],
      previousGroups: [{id: 1, name: 'g1'}, {id: 2, name: 'g2'}]
    };
    fixture.detectChanges();
  });

  it('should create', async () => {
    expect(component).toBeTruthy();
  });
});
