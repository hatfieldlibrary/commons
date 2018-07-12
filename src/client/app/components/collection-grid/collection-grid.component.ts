import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {FilterUpdateServiceB} from '../../services/filters-2/filter-update.service';
import {MediaChange, ObservableMedia} from '@angular/flex-layout';
import {SelectedSubjectEvent} from '../subject-selector/subjects.component';
import {CollectionType} from '../../shared/data-types/collection.type';
import {Subscription} from 'rxjs/Subscription';
import {environment} from '../../environments/environment';
import {animate, style, transition, trigger} from '@angular/animations';
import {FieldFilterType} from '../../shared/data-types/field-filter.type';

@Component({
  selector: 'app-collection-grid',
  templateUrl: './collection-grid.component.html',
  styleUrls: ['./collection-grid.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({opacity: '0.5'}),
        animate('400ms ease-in', style({opacity: '1'})),
      ]),
      transition(':leave', [
        animate(200, style({ opacity: 0 }))
      ])
    ])]
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
  emptySubject: FieldFilterType = {id: 0, name: ''};

  constructor(private filterService: FilterUpdateServiceB,
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
