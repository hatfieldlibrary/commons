import {
  Component, EventEmitter,
  Input, OnChanges,
  OnDestroy, OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import {AreaType} from '../../shared/data-types/area.type';
import {MediaChange, ObservableMedia} from '@angular/flex-layout';
import {Subscription} from 'rxjs/Subscription';
import * as fromFilter from '../../reducers/filter.reducers';
import {DeselectedFilter} from '../area-filters/area-filters.component';
import {AreasFilter} from '../../shared/data-types/areas-filter';
import {CollectionGroupFilter} from '../../shared/data-types/collection-group-filter';
import {TypesFilter} from '../../shared/data-types/types-filter';
import {SubjectFilter} from '../../shared/data-types/subject-filter';

@Component({
  selector: 'app-area-banner',
  templateUrl: './area-banner.component.html',
  styleUrls: ['./area-banner.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AreaBannerComponent implements OnChanges, OnDestroy, OnInit {

  @Input()
  areaInfo: AreaType;
  @Output()
  removeFilter: EventEmitter<any> = new EventEmitter<any>();
  @Input()
  filters: fromFilter.State;
  @Input()
  areas: AreasFilter;
  @Input()
  subjects: SubjectFilter;
  @Input()
  types: TypesFilter;
  @Input()
  groups: CollectionGroupFilter;
  description: string;
  url: string;
  linkLabel: string;
  title: string;
  areaId: any; // initialize with out of range value.
  private watcher: Subscription;
  isMobile = false;

  constructor(public media: ObservableMedia) {
  }

  /**
   * Deselects the filter
   * @param type the type of filter to be removed
   * @param id the id of the filter to be removed
   */
  deselect(deselected: DeselectedFilter): void {
    this.removeFilter.emit(deselected);
  }

  /**
   * Used by the area form options.
   * @param {number} id
   * @returns {boolean}
   */
  isSelected(id: number): boolean {
    if (this.filters.selectedAreas) {
      return this.getPositionInSelectedList(id) > -1;
    }
    return false;
  }

  /**
   * Gets the position index in selectedAreas for the area that
   * matches the provided id.
   * @param {number} areaId the id of the area
   * @returns {number}
   */
  private getPositionInSelectedList(areaId: number): number {
    return this.filters.selectedAreas.findIndex((current) => current.id === areaId);
  }

  ngOnInit() {
    this.watcher = this.media.subscribe((change: MediaChange) => {
      if (change.mqAlias === 'xs' || change.mqAlias === 'sm') {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (typeof changes.areaInfo === 'undefined') {
      return;
    }
    if (changes.areaInfo.currentValue) {
      this.title = changes.areaInfo.currentValue.title;
      this.description = changes.areaInfo.currentValue.description;
      this.url = changes.areaInfo.currentValue.url;
      this.linkLabel = changes.areaInfo.currentValue.linkLabel;
      this.areaId = changes.areaInfo.currentValue.id;
    }
  }

  ngOnDestroy(): void {
    this.watcher.unsubscribe();
  }

}
