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
import {StoreModule} from '@ngrx/store';
import {NavigationServiceB} from '../../services/navigation-2/navigation.service';
import {DispatchService} from '../../services/dispatch.service';
import {MenuInteractionService} from '../../services/menu/menu-interaction.service';

describe('SubmitDspaceComponent', () => {
  let component: SubmitDspaceComponent;
  let fixture: ComponentFixture<SubmitDspaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SubmitDspaceComponent,
        AppMenusComponent,
        BackSvgComponent,
        BackBlackSvgComponent,
        HomeSvgComponent,
        MenuSvgComponent],
      imports: [
        MatListModule,
        MatTooltipModule,
        MatCardModule,
        MatIconModule,
        MatToolbarModule,
        MatButtonModule,
        RouterTestingModule,
        StoreModule.forRoot({})],
      providers: [
        NavigationServiceB,
        DispatchService,
        MenuInteractionService
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitDspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
