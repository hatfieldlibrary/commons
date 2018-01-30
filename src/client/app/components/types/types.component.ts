import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TypesFilterType} from '../../shared/data-types/types-filter.type';
import {MatSelectionList} from '@angular/material';
import {AreaFilterType} from '../../shared/data-types/area-filter.type';
import {SubjectFilterType} from '../../shared/data-types/subject-filter.type';
import {NavigationService} from '../../services/navigation/navigation.service';
import {FilterUpdateService} from '../../services/filters/filter-update.service';

export interface SelectedTypeEvent {
  selected: TypesFilterType[];
}

@Component({
  selector: 'app-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.css']
})
export class TypesComponent {

  @Input() typeList: TypesFilterType[];
  @Input() selectedTypes: TypesFilterType[];
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
    return this.selectedTypes.findIndex((current) => current.id === typeId);
  }

  onTypeListControlChanged(list: MatSelectionList, typeId: number) {
    list.selectedOptions.clear();
    const updatedSelectedTypes = this.filterService.updateSelectedTypeStore(this.selectedTypes, this.typeList, typeId);
   // const updatedTypeId = this.filterService.getIds(updatedSelectedTypes);
    const updatedTypeEvent: SelectedTypeEvent = {selected: updatedSelectedTypes};
    this.typeNavigation.emit(updatedTypeEvent);
  }

  isSelected(id: number): boolean {
    if (this.selectedTypes) {
      return this.getPositionInSelectedTypeList(id) > -1;
    }
    return false;
  }

}
