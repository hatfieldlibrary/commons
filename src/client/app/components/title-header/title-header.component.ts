import {ChangeDetectionStrategy, Component, Input, OnDestroy} from '@angular/core';
import {MediaChange, ObservableMedia} from '@angular/flex-layout';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-title-header',
  templateUrl: './title-header.component.html',
  styleUrls: ['./title-header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitleHeaderComponent implements OnDestroy {

  @Input() title;
  @Input() subtitle;
  @Input() subjectList;
  @Input() areaId;
  @Input() type;
  isMobile = true;
  private watcher: Subscription;

  constructor(private media: ObservableMedia) {
    this.watcher = this.media.subscribe((change: MediaChange) => {
      this.isMobile = change.mqAlias === 'xs';
    });
  }

  ngOnDestroy(): void {
    this.watcher.unsubscribe();
  }


}
