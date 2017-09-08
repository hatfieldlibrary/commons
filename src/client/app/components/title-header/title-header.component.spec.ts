import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TitleHeaderComponent} from './title-header.component';
import {SubjectsComponent} from "../subject-selector/subjects.component";
import {KeyboardArrowBackSvgComponent} from "../svg/keyboard-arrow-back-svg/keyboard-arrow-back-svg.component";
import {KeyboardArrowForwardSvgComponent} from "../svg/keyboard-arrow-forward-svg/keyboard-arrow-forward-svg.component";
import {RouterTestingModule} from "@angular/router/testing";
import {MdButtonModule, MdIconModule} from "@angular/material";
import {FlexLayoutModule, ObservableMedia} from "@angular/flex-layout";
import {Store, StoreModule} from "@ngrx/store";
import {Observable} from "rxjs/Observable";
import {SetIntervalService} from "../../services/interval.service";

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
        MdButtonModule,
        MdIconModule,
        RouterTestingModule,
        FlexLayoutModule,
        StoreModule
      ],
      providers: [
        SetIntervalService,
        // {
        //   provide: FlexLayoutModule,
        //   useClass: class {
        //     subscribe = () => {
        //       // return Observable.of('')
        //     }
        //   }
        // },
        //  ChangeDetectorRef,
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
