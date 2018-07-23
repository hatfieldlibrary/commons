import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaOptionsComponent } from './area-options.component';
import {MatListItem, MatListModule, MatNavList} from '@angular/material';
import {FilterUpdateServiceB} from '../../services/filters-2/filter-update.service';
import {ScrollReadyService} from '../../services/observable/scroll-ready.service';
import {Store, StoreModule} from '@ngrx/store';

describe('AreaOptionsComponent', () => {
  let component: AreaOptionsComponent;
  let fixture: ComponentFixture<AreaOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaOptionsComponent],
      imports: [MatListModule, StoreModule.forRoot({})],
      providers: [FilterUpdateServiceB, ScrollReadyService]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaOptionsComponent);
    component = fixture.componentInstance;
    component.filter = {areas: [{id: 1, title: '', count: 1}], selectedAreas: [{id: 1, title: '', count: 1}]};
//    fixture.detectChanges();
  });

  it('should create', async () => {
    expect(component).toBeTruthy();
  });
});
