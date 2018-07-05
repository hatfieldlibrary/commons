import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CollectionGroupType} from '../../shared/data-types/collection-group-type';
import {MatSelectionList} from '@angular/material';
import {FilterUpdateServiceB} from '../../services/filters-2/filter-update.service';
import {CollectionGroupFilter} from '../../shared/data-types/collection-group-filter.type';
import {animate, style, transition, trigger} from '@angular/animations';

export interface SelectedGroupEvent {
  selected: CollectionGroupType[];
}

@Component({
  selector: 'app-group-options',
  templateUrl: './group-options.component.html',
  styleUrls: ['./group-options.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({opacity: '0.5'}),
        animate('200ms ease-in', style({opacity: '1'})),
      ])
    ])]
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
  constructor(private filterService: FilterUpdateServiceB) {}

  /**
   * Gets the position index in typeId for the type that
   * matches the provided id.
   * @param {number} typeId the id of the area
   * @returns {number}
   */
  private getPositionInSelectedGroupList(id: number): number {
    return this.filter.selectedGroups.findIndex((current) => current.id === id);
  }

  onGroupListControlChanged(list: MatSelectionList, id: number) {
    const selectedGroups = this.filterService
      .updateSelectedGroupsStore(this.filter.selectedGroups, this.filter.groups, id);
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
      return this.getPositionInSelectedGroupList(id) > -1;
    }
    return false;
  }

}
