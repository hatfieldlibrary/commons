import {
  ChangeDetectionStrategy,
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
  description: string;
  url: string;
  linkLabel: string;
  title: string;
  areaId: any; // initialize with out of range value.
  private watcher: Subscription;
  isMobile = true;

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

  ngOnInit() {
    this.watcher = this.media.subscribe((change: MediaChange) => {
      if (change.mqAlias === 'xs' || change.mqAlias === 'sm' ) {
        this.isMobile = true;
        console.log('setting mobile to true')
      } else {
        console.log('setting mobile to false')
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
