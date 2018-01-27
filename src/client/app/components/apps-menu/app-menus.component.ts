import {
  ChangeDetectionStrategy, Component, Inject, Input, OnDestroy
} from '@angular/core';
import {AreaType} from "../../shared/data-types/area.type";
import {NavigationEnd, Router} from "@angular/router";
import {UtilitiesService} from "../../services/utils/utilities.service";
import {SubjectType} from "../../shared/data-types/subject.type";
import {Subscription} from "rxjs/Subscription";
import {MediaChange, ObservableMedia} from "@angular/flex-layout";
import {DOCUMENT} from "@angular/common";
import {MenuInteractionService} from "../../services/menu/menu-interaction.service";
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-menus-component',
  templateUrl: './app-menus.component.html',
  styleUrls: ['./app-menus.component.css'],

  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppMenusComponent implements OnDestroy {

  @Input() areaList: AreaType[];
  @Input() selectedArea: string;
  @Input() selectedSubject: SubjectType;
  @Input() selectedTypes: string;
  @Input() showBack: boolean;
  @Input() title: string;
  public previousUrl = '';
  homeUrl = 'http://libmedia.willamette.edu/academiccommons';
  secondaryUrl = 'http://library.willamette.edu';
  watcher: Subscription;
  state = '';

  constructor(private menuService: MenuInteractionService,
              private utils: UtilitiesService,
              private router: Router,
              public media: ObservableMedia,
              @Inject(DOCUMENT) private document) {

    this.watcher = router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe((event: NavigationEnd) => {
        this.previousUrl = event.url;
      });

    const mediaWatcher = media.asObservable()
      .subscribe((change: MediaChange) => {
        this.state = change ? `'${change.mqAlias}' = (${change.mediaQuery})` : '';
      });
    this.watcher.add(mediaWatcher);
  }

  openMenu() {
    this.menuService.openMenu();
  }

  getBackLink(): string {
    let path = this.utils.getBackLink(this.selectedArea, this.selectedSubject, this.selectedTypes);
    return path;
  }


  ngOnDestroy(): void {
    if (this.watcher) {
      this.watcher.unsubscribe();
    }
  }
}
