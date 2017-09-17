import {
  ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Optional, Output,
  ViewChild
} from '@angular/core';
import {AreaType} from "../../shared/data-types/area.type";
import {MdSidenav} from "@angular/material";
import {NavigationEnd, Router} from "@angular/router";
import {UtilitiesService} from "../../services/utilities.service";
import {SubjectType} from "../../shared/data-types/subject.type";
import {Subscription} from "rxjs/Subscription";
import {MediaChange, ObservableMedia} from "@angular/flex-layout";
import {DOCUMENT} from "@angular/common";
import {MenuInteractionService} from "../../services/menu/menu-interaction.service";

@Component({
  selector: 'app-menus-component',
  templateUrl: './app-menus.component.html',
  styleUrls: ['./app-menus.component.css'],

  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppMenusComponent implements OnInit, OnDestroy {

  @Input() areaList: AreaType[];
  @Input() selectedArea: string;
  @Input() selectedSubject: SubjectType;
  @Input() showBack: boolean;
  @Input() title: string;
 // @Output() openTheMenu = new EventEmitter<boolean>();
  // @ViewChild('sidenav') sideNavigate: MdSidenav;
  public previousUrl = '';
  homeUrl = 'http://libmedia.willamette.edu/academiccommons';
  secondaryUrl = 'http://library.willamette.edu';
  tertiaryUrl = 'http://www.willamette.edu';
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

  // goToHome(): void {
  //   document.location.href = this.homeUrl;
  // }
  //
  // goToSecondary(): void {
  //   document.location.href = this.secondaryUrl;
  // }
  //
  // goToTertiary(): void {
  //   document.location.href = this.tertiaryUrl;
  // }

  openMenu() {
    //this.sideNavigate.open();
   // this.openTheMenu.emit();
    console.log('open')
    this.menuService.openMenu();
  }

  getBackLink(): string {
    let path = this.utils.getBackLink(this.selectedArea, this.selectedSubject);
    return path;
  }

  ngOnInit() {
    // if (this.sideNavigate.close) {
    //   this.sideNavigate.close();
    // }
  }

  ngOnDestroy(): void {
    if (this.watcher) {
      this.watcher.unsubscribe();
    }
  }
}
