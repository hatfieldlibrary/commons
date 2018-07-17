import {
  AfterContentInit,
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import {MediaChange, ObservableMedia} from '@angular/flex-layout';
import {CollectionType} from '../../shared/data-types/collection.type';
import {Subscription} from 'rxjs/Subscription';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-collection-rows',
  templateUrl: './collection-rows.component.html',
  styleUrls: ['./collection-rows.component.css']
})
export class CollectionRowsComponent implements OnDestroy {

  @Input() collectionList: CollectionType[];
  @Output() collectionNavigation: EventEmitter<any> = new EventEmitter<any>();
  @Output() setView: EventEmitter<any> = new EventEmitter<any>();
  filterTerm: string;
  isMobile = false;
  cols = 3;
  watcher: Subscription;

  constructor(private media: ObservableMedia) {
    this.filterTerm = '';
    this.watcher = this.media.subscribe((change: MediaChange) => {
      if (change.mqAlias === 'xs') {
        this.isMobile = true;
        this.cols = 1;
      } else if (change.mqAlias === 'sm' || change.mqAlias === 'md') {
        this.cols = 2;
        this.isMobile = false;
      } else {
        this.cols = 3;
        this.isMobile = false;
      }
    });
  }

  totalResults(): string {
    return this.collectionList.length.toString();
  }
  getImage(image: string) {
    return environment.apiHost + environment.imagePath + '/resources/img/thumb/' + image;

  }

  navigateToItem(id: string) {
    this.collectionNavigation.emit(id);
  }

  setViewType(type: string): void {
    this.setView.emit(type);
  }

  ngOnDestroy(): void {
    this.watcher.unsubscribe();
  }

}
