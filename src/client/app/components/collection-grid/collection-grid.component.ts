import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, SecurityContext} from '@angular/core';
import {FilterUpdateService} from '../../services/filters/filter-update.service';
import {MediaChange, ObservableMedia} from '@angular/flex-layout';
import {SubjectType} from '../../shared/data-types/subject.type';
import {SelectedSubjectEvent} from '../subject-selector/subjects.component';
import {CollectionType} from '../../shared/data-types/collection.type';
import {Subscription} from 'rxjs/Subscription';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-collection-grid',
  templateUrl: './collection-grid.component.html',
  styleUrls: ['./collection-grid.component.css']
})
export class CollectionGridComponent implements OnDestroy {

  @Input() collectionList: CollectionType[];
//  @Input() selectedSubject: SubjectFilterType;
//  @Output() subjectNavigation: EventEmitter<any> = new EventEmitter<any>();
  @Output() collectionNavigation: EventEmitter<any> = new EventEmitter<any>();
  filterTerm: string;
  isMobile = false;
  cols = 3;
  watcher: Subscription;
  emptySubject: SubjectType = {id: 0, name: ''};

  constructor(private filterService: FilterUpdateService,
              private media: ObservableMedia) {
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

  /**
   * Emits event to parent component when the subject is deselected. The
   * $event object is not used.
   */
  deselect() {
    this.filterService.removeSelectedAreaFilter();
    const emptySubject: SelectedSubjectEvent = {selected: this.emptySubject};
    // this.subjectNavigation.emit(emptySubject);
  }


  totalResults(): string {
    return this.collectionList.length.toString();
  }

  navigateToItem(id: string) {
    this.collectionNavigation.emit(id);
  }

  getImage(image: string) {
    return environment.apiHost + environment.imagePath + '/resources/img/thumb/' + image;

  }


  ngOnDestroy(): void {
    this.watcher.unsubscribe();
    //  this.subjectNavigation.unsubscribe();
  }
}
