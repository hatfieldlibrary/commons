import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TypesFilterType} from '../../shared/data-types/types-filter.type';
import {MatSelectionList} from '@angular/material';
import {FilterUpdateService} from '../../services/filters/filter-update.service';
import {TypesFilter} from '../../shared/data-types/types-filter';

export interface SelectedTypeEvent {
  selected: TypesFilterType[];
}

@Component({
  selector: 'app-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TypesComponent implements OnInit {

  @Input() filter: TypesFilter;
  @Output() typeNavigation: EventEmitter <any> = new EventEmitter<any>();

  constructor(private filterService: FilterUpdateService) {
  }

  /**
   * Gets the position index in typeId for the type that
   * matches the provided id.
   * @param {number} typeId the id of the area
   * @returns {number}
   */
  private getPositionInSelectedTypeList(typeId: number): number {
    return this.filter.selectedTypes.findIndex((current) => current.id === typeId);
  }

  onTypeListControlChanged(list: MatSelectionList, typeId: number) {
    const updatedSelectedTypes = this.filterService
      .updateSelectedTypeStore(this.filter.selectedTypes, this.filter.types, typeId);
    const updatedTypeEvent: SelectedTypeEvent = {selected: updatedSelectedTypes};
    this.typeNavigation.emit(updatedTypeEvent);
  }

  isSelected(id: number): boolean {
    if (this.filter.selectedTypes) {
      return this.getPositionInSelectedTypeList(id) > -1;
    }
    return false;
  }

  ngOnInit(): void {
  }

}
