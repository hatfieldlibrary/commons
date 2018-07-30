import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {MediaChange, ObservableMedia} from '@angular/flex-layout';
import {CollectionType} from '../../shared/data-types/collection.type';
import {Subscription} from 'rxjs/Subscription';
import {environment} from '../../environments/environment';
import {animate, style, transition, trigger} from '@angular/animations';

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
  @Output() collectionNavigation: EventEmitter<any> = new EventEmitter<any>();
  @Output() setView: EventEmitter<any> = new EventEmitter<any>();
  isMobile = false;
  cols = 3;
  watcher: Subscription;

  constructor(private media: ObservableMedia) {
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

  getResultCount(): string {
    return this.collectionList.length.toString();
  }

  navigateToItem(id: number) {
    this.collectionNavigation.emit(id);
  }

  getImage(image: string) {
    return environment.apiHost + environment.imagePath + '/resources/img/thumb/' + image;

  }

  setViewType(type: string): void {
    this.setView.emit(type);
  }

  ngOnDestroy(): void {
    this.watcher.unsubscribe();
  }
}
