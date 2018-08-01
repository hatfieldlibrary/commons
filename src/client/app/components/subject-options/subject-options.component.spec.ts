import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectOptionsComponent } from './subject-options.component';
import {MatListModule} from '@angular/material';
import {FieldTypeKey, FilterUpdateServiceB} from '../../services/filters-2/filter-update.service';
import {StoreModule} from '@ngrx/store';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ScrollReadyService} from '../../services/observable/scroll-ready.service';


describe('SubjectOptionsComponent', () => {
  let component: SubjectOptionsComponent;
  let fixture: ComponentFixture<SubjectOptionsComponent>;
  let readyService;
  let filterService;

  const mockSubjectsFilter = {
    selectedSubjects: [{id: 1, name: 's1'}],
    subjects: [{id: 1, name: 's1'}, {id: 2, name: 's2'}]
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectOptionsComponent ],
      imports: [MatListModule, BrowserAnimationsModule, StoreModule.forRoot({})],
      providers: [{
        provide: FilterUpdateServiceB,
        useClass: class {
          updateSelectedFields = jasmine.createSpy('updateSelectedSubjectsStore').and.returnValue([{id: 1, name: ''}]);
        }
      },
        {
          provide: ScrollReadyService,
          useClass: class {
            setPosition = jasmine.createSpy('setPosition');
          }
        }]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectOptionsComponent);
    component = fixture.componentInstance;
    component.filter = mockSubjectsFilter;
    readyService = fixture.debugElement.injector.get(ScrollReadyService);
    filterService = fixture.debugElement.injector.get(FilterUpdateServiceB);
    spyOn(component.subjectNavigation, 'emit');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update store, set scroll position, and emit navigation event', () => {
    component.onSubjectListControlChanged(1);
    expect(component.subjectNavigation.emit).toHaveBeenCalledWith({selected: [{id: 1, name: ''}]});
    expect(readyService.setPosition).toHaveBeenCalledWith(0);
    expect(filterService.updateSelectedFields)
      .toHaveBeenCalledWith(mockSubjectsFilter.selectedSubjects, mockSubjectsFilter.subjects,  1, FieldTypeKey.SUBJECT);
  })
});
