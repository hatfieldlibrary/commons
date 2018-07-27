import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SubmitDspaceComponent} from './submit-dspace.component';
import {AppMenusComponent} from '../apps-menu/app-menus.component';
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatListModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import {BackSvgComponent} from '../svg/back-svg/back-svg.component';
import {BackBlackSvgComponent} from '../svg/back-black-svg/back-black-svg.component';
import {HomeSvgComponent} from '../svg/home-svg/home-svg.component';
import {MenuSvgComponent} from '../svg/menu-svg/menu-svg.component';
import {RouterTestingModule} from '@angular/router/testing';
import {Action, Store, StoreModule} from '@ngrx/store';
import {NavigationServiceB} from '../../services/navigation-2/navigation.service';
import {DispatchService} from '../../services/dispatch.service';
import {MenuInteractionService} from '../../services/menu/menu-interaction.service';
import {Observable} from 'rxjs/index';
import {ObservableMedia} from '@angular/flex-layout';
import {HttpClientModule} from '@angular/common/http';
import {mockStore} from '../../shared/test/mock-store';
import {Subject} from 'rxjs/Subject';

describe('SubmitDspaceComponent', () => {
  let component: SubmitDspaceComponent;
  let fixture: ComponentFixture<SubmitDspaceComponent>;

  beforeEach(async(() => {
    const actions = new Subject<Action>();
    const states = new Subject<any>();
    const appStore = mockStore<any>({ actions, states });

    TestBed.configureTestingModule({
      declarations: [
        SubmitDspaceComponent,
        AppMenusComponent,
        BackSvgComponent,
        BackBlackSvgComponent,
        HomeSvgComponent,
        MenuSvgComponent],
      imports: [
        HttpClientModule,
        MatListModule,
        MatTooltipModule,
        MatCardModule,
        MatIconModule,
        MatToolbarModule,
        MatButtonModule,
        RouterTestingModule],
      providers: [
        NavigationServiceB,
        DispatchService,
        MenuInteractionService,
        {
          provide: Store,
          useValue: appStore
        },
        {
          provide: ObservableMedia,
          useValue: {
            asObservable: () => {
              return new Observable<any>();
            },
            isActive: () => {
            }
          }
        },
      ]
    })
      .overrideComponent(AppMenusComponent, {
      set: {
        selector: 'app-menus-component',
        template: `<h6>Area Menu</h6>`
      }
    });
  }));

  beforeAll(() => {
    window.onbeforeunload = () => 'Oh no!';
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitDspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
