import {Component, Input} from '@angular/core';
import {TypesFilterType} from '../../shared/data-types/types-filter.type';
import {MatSelectionList} from '@angular/material';
import {AreaFilterType} from '../../shared/data-types/area-filter.type';
import {SubjectFilterType} from '../../shared/data-types/subject-filter.type';
import {NavigationService} from '../../services/navigation/navigation.service';
import {FilterUpdateService} from '../../services/filters/filter-update.service';

@Component({
  selector: 'app-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.css']
})
export class TypesComponent {

  @Input() typeList: TypesFilterType[];
  @Input() selectedTypes: TypesFilterType[];
  @Input() selectedAreas: AreaFilterType[];
  @Input() selectedSubject: SubjectFilterType;

  constructor(private filterService: FilterUpdateService,
              private navigation: NavigationService) {
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
    const selectedAreaIds = this.filterService.getIds(this.selectedAreas);
    const selectedSubject = this.selectedSubject.id.toString();
    const updatedSelectedAreas = this.filterService.updateSelectedTypeStore(this.selectedTypes, this.typeList, typeId);
    const updatedTypeId = this.filterService.getIds(updatedSelectedAreas);
    this.navigation.navigateRoute(selectedAreaIds, updatedTypeId, selectedSubject);
  }

  isSelected(id: number): boolean {
    if (this.selectedTypes) {
      return this.getPositionInSelectedTypeList(id) > -1;
    }
    return false;
  }

}
