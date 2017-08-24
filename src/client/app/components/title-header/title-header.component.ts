import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MediaChange, ObservableMedia} from "@angular/flex-layout";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'title-header',
  templateUrl: './title-header.component.html',
  styleUrls: ['./title-header.component.css']
})
export class TitleHeaderComponent implements OnInit, OnDestroy {

  @Input() title;
  @Input() subtitle;
  @Input() subjectList;
  @Input() areaId;
  @Input() type;
  isMobile:boolean = true;
  private watcher: Subscription;

  constructor(private media: ObservableMedia) {
    this.watcher = this.media.subscribe((change: MediaChange) => {
      if (change.mqAlias === 'xs') {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
  }

  ngOnInit(): void {


  }

  ngOnDestroy(): void {
    this.watcher.unsubscribe();
  }


}
