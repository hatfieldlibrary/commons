import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TitleHeaderComponent} from './title-header.component';
import {SubjectsComponent} from "../subject-selector/subjects.component";
import {KeyboardArrowBackSvgComponent} from "../svg/keyboard-arrow-back-svg/keyboard-arrow-back-svg.component";
import {KeyboardArrowForwardSvgComponent} from "../svg/keyboard-arrow-forward-svg/keyboard-arrow-forward-svg.component";
import {RouterTestingModule} from "@angular/router/testing";
import {MatButtonModule, MatIconModule} from "@angular/material";
import {FlexLayoutModule} from "@angular/flex-layout";
import {Store, StoreModule} from "@ngrx/store";
import {Observable} from "rxjs/Observable";
import {SetIntervalService} from "../../services/timers/interval.service";
import 'rxjs/add/observable/of';

describe('TitleHeaderComponent', () => {
  let component: TitleHeaderComponent;
  let fixture: ComponentFixture<TitleHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TitleHeaderComponent,
        SubjectsComponent,
        KeyboardArrowBackSvgComponent,
        KeyboardArrowForwardSvgComponent,

      ],
      imports: [
        MatButtonModule,
        MatIconModule,
        RouterTestingModule,
        FlexLayoutModule,
        StoreModule
      ],
      providers: [
        SetIntervalService,
         {
          provide: Store,
          useClass: class {
            select = () => {
              return Observable.of('')
            }
          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
