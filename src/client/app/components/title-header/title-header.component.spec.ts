import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TitleHeaderComponent} from './title-header.component';
import {SubjectsComponent} from "../subject-selector/subjects.component";
import {KeyboardArrowBackSvgComponent} from "../svg/keyboard-arrow-back-svg/keyboard-arrow-back-svg.component";
import {KeyboardArrowForwardSvgComponent} from "../svg/keyboard-arrow-forward-svg/keyboard-arrow-forward-svg.component";
import {RouterTestingModule} from "@angular/router/testing";
import {MdButtonModule} from "@angular/material";
import {MediaChange, ObservableMedia} from "@angular/flex-layout";
import {ChangeDetectorRef} from "@angular/core";
import {Store} from "@ngrx/store";
import {Subscription} from "rxjs/Subscription";
import {Observable} from "rxjs/Observable";

describe('TitleHeaderComponent', () => {
  let component: TitleHeaderComponent;
  let fixture: ComponentFixture<TitleHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TitleHeaderComponent,
        SubjectsComponent,
        KeyboardArrowBackSvgComponent,
        KeyboardArrowForwardSvgComponent
      ],
      providers: [
        {
          provide: ObservableMedia,
          useClass: class {
            subscribe = () => {
             // return Observable.of('')
            }
          }
        },
      //  ChangeDetectorRef,
        // {
        //   Store,
        //   useClass: class {
        //     select = () => {
        //       return Observable.of('')
        //     }
        //   }
        // }
      ],
      imports: [
        MdButtonModule,
        RouterTestingModule
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
