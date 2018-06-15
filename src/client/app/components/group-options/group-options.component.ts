import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CollectionGroupType} from '../../shared/data-types/collection-group-type';
import {MatSelectionList} from '@angular/material';
import {FilterUpdateService} from '../../services/filters/filter-update.service';
import {CollectionGroupFilter} from '../../shared/data-types/collection-group-filter.type';

export interface SelectedGroupEvent {
  selected: CollectionGroupType[];
}

@Component({
  selector: 'app-group-options',
  templateUrl: './group-options.component.html',
  styleUrls: ['./group-options.component.css']
})
export class GroupOptionsComponent {

  @Input() filter: CollectionGroupFilter;
  @Output() groupNavigation: EventEmitter <any> = new EventEmitter<any>();
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
    return this.filter.selectedGroups.findIndex((current) => current.id === id);
  }

  onGroupListControlChanged(list: MatSelectionList, id: number) {
    const selectedGroups = this.filterService
      .updateSelectedSubjectsStore(this.filter.selectedGroups, this.filter.groups, id);
    const updatedGroupEvent: SelectedGroupEvent = {selected: selectedGroups};
    this.groupNavigation.emit(updatedGroupEvent);
  }

  /**
   * Used by the area form options.
   * @param {number} id
   * @returns {boolean}
   */
  isSelected(id: number): boolean {
    if (this.filter.selectedGroups) {
      return this.getPositionInSelectedSubjectList(id) > -1;
    }
    return false;
  }

}
