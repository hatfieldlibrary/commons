import {ChangeDetectionStrategy, Component, Inject, Input, OnDestroy, OnInit, Optional, ViewChild} from '@angular/core';
import {AreaType} from "../../shared/data-types/area.type";
import {MdSidenav} from "@angular/material";
import {NavigationEnd, Router} from "@angular/router";
import {UtilitiesService} from "../../services/utilities.service";
import {SubjectType} from "../../shared/data-types/subject.type";
import {Subscription} from "rxjs/Subscription";
import {MediaChange, ObservableMedia} from "@angular/flex-layout";
import {DOCUMENT} from "@angular/common";

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
  @ViewChild('sidenav') sideNavigate: MdSidenav;
  public previousUrl = '';
  homeUrl = 'http://libmedia.willamette.edu/academiccommons';
  secondaryUrl = 'http://library.willamette.edu';
  tertiaryUrl = 'http://www.willamette.edu';
  listener: Subscription;
  state = '';

  constructor(private utils: UtilitiesService,
              private router: Router,
              public media: ObservableMedia,
              @Inject(DOCUMENT) private document) {

    this.listener = router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe((event: NavigationEnd) => {
        this.previousUrl = event.url;
      });

    const mediaWatcher = media.asObservable()
      .subscribe((change: MediaChange) => {
        this.state = change ? `'${change.mqAlias}' = (${change.mediaQuery})` : '';
      });
  }

  goToHome(): void {
    document.location.href = this.homeUrl;
  }

  goToSecondary(): void {
    document.location.href = this.secondaryUrl;
  }

  goToTertiary(): void {
    document.location.href= this.tertiaryUrl;
  }

  openMenu() {
    this.sideNavigate.open();
  }

  getBackLink(): string {
    let path = this.utils.getBackLink(this.selectedArea, this.selectedSubject);
    return path;
  }

  ngOnInit() {
    if (this.sideNavigate.close) {
      this.sideNavigate.close();
    }
  }
  ngOnDestroy(): void {
    this.listener.unsubscribe();
    this.router.dispose();
  //   this.router = null;
  // //  this.media = null;
  //   this.utils = null;
  //  this.document = null;
  }

}
