import {
  ChangeDetectionStrategy, Component, Inject, Input, OnDestroy, ViewEncapsulation
} from '@angular/core';
import {AreaType} from '../../shared/data-types/area.type';
import {NavigationEnd, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {MediaChange, ObservableMedia} from '@angular/flex-layout';
import {DOCUMENT} from '@angular/common';
import {MenuInteractionService} from '../../services/menu/menu-interaction.service';
import 'rxjs/add/operator/filter';
import {NavigationServiceB} from '../../services/navigation-2/navigation.service';
import {SubjectType} from '../../shared/data-types/subject.type';
import {TypesFilterType} from '../../shared/data-types/types-filter.type';

@Component({
  selector: 'app-menus-component',
  templateUrl: './app-menus.component.html',
  styleUrls: ['./app-menus.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppMenusComponent implements OnDestroy {

  @Input() areaList: AreaType[];
  @Input() selectedArea: string;
  @Input() selectedSubjects: SubjectType[];
  @Input() selectedTypes: TypesFilterType[];
  @Input() showBack: boolean;
  @Input() title: string;
  public previousUrl = '';
  homeUrl = 'http://libmedia.willamette.edu/academiccommons';
  secondaryUrl = 'http://library.willamette.edu';
  watcher: Subscription;
  state = '';
  position = 'left';

  constructor(private menuService: MenuInteractionService,
              private navigationService: NavigationServiceB,
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
    const typeIds = this.navigationService.getIds(this.selectedTypes);
    const subjectIds = this.navigationService.getIds(this.selectedSubjects);
    const path = this.navigationService.getBackLink(this.selectedArea, subjectIds, typeIds);
    return path;
  }


  ngOnDestroy(): void {
    if (this.watcher) {
      this.watcher.unsubscribe();
    }
  }
}
