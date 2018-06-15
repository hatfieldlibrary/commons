import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SubjectFilter} from '../../shared/data-types/subject-filter';
import {FilterUpdateService} from '../../services/filters/filter-update.service';
import {MatSelectionList} from '@angular/material';
import {SubjectType} from '../../shared/data-types/subject.type';
import {animate, style, transition, trigger} from '@angular/animations';

export interface SelectedSubjectEvent {
  selected: SubjectType[];
}

@Component({
  selector: 'app-subject-options',
  templateUrl: './subject-options.component.html',
  styleUrls: ['./subject-options.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({opacity: '0.5'}),
        animate('200ms ease-in', style({opacity: '1'})),
      ])
    ])]
})
export class SubjectOptionsComponent {

  @Input() filter: SubjectFilter;
  @Output() subjectNavigation: EventEmitter <any> = new EventEmitter<any>();
  position = 'before';

  /**
   * Injecting ChangeDetectorRef to instruct angular to re-render
   * the view after changes made in the ngAfterViewInit hook method.
   * @param changeDetector
   */
  constructor(private filterService: FilterUpdateService) {}

  /**
   * Gets the position index in typeId for the type that
   * matches the provided id.
   * @param {number} typeId the id of the area
   * @returns {number}
   */
  private getPositionInSelectedSubjectList(id: number): number {
    return this.filter.selectedSubjects.findIndex((current) => current.id === id);
  }

  onSubjectListControlChanged(list: MatSelectionList, id: number) {
    const selectedSubjects = this.filterService
      .updateSelectedSubjectsStore(this.filter.selectedSubjects, this.filter.subjects, id);
    const updatedTypeEvent: SelectedSubjectEvent = {selected: selectedSubjects};
    this.subjectNavigation.emit(updatedTypeEvent);
  }

  /**
   * Used by the area form options.
   * @param {number} id
   * @returns {boolean}
   */
  isSelected(id: number): boolean {
    if (this.filter.selectedSubjects) {
      return this.getPositionInSelectedSubjectList(id) > -1;
    }
    return false;
  }

}
