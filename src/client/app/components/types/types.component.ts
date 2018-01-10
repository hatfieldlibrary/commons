import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';
import * as typeActions from '../../actions/type.actions';
import * as listActions from '../../actions/collection.actions';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../reducers';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ContentTypeListType} from '../../shared/data-types/content-types.type';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';
import {MatSelectionList} from '@angular/material';


@Component({
  selector: 'app-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.css']
})
export class TypesComponent implements OnInit, AfterViewInit, OnDestroy {

  private lastSelectedIds: number[];
  private selectedOptions: number[];
  @Input() typeList: ContentTypeListType[];
  @Input() selectedAreas: string;
  @Input() selectedSubject: string;
  @Input() selectedTypes: string;

  constructor(private router: Router,
              private store: Store<fromRoot.State>) {
  }

  private _setLastTypeIds(types: string): void {
    if (types) {
      const typeArr = types.split(',');
      if (typeArr.length === 0) {
        typeArr.push('0');
      }
      this.lastSelectedIds = [];
      for (const area of typeArr) {
        this.lastSelectedIds.push(parseInt(area, 10));
      }
    }
  }

  private _createIdQueryParam(typeList: number[]): string {
    if (typeList.length === 0) {
      return null;
    }
    let typeId = '';
    typeList.forEach((id) => {
      const strId = id.toString();
      if (strId !== '0') {
        typeId += strId + ','
      }
    });
    typeId = typeId.replace(/,\s*$/, '');
    return typeId;
  }

  private getIndex(list: number[], typeId: number): number {
    return list.indexOf(typeId)
  }

  private removeFromList(list: any, typeId: number): any[] {
console.log('removing from list')
    console.log(typeId)
    console.log(list)
    const index = list.indexOf(typeId);
    if (index >= 0) {
      console.log(index)
      if (list.length === 1) {
        return []
      } else {
        return list.splice(index, 1)
      }

    }
    return list;
  }

  private _updateCurrentTypeStore(types: string) {
    if (types) {
      console.log(types)
      this.store.dispatch(new typeActions.CurrentSelectedTypesList(types));
    } else {
      this.store.dispatch(new typeActions.CurrentSelectedTypesList(''));
    }
  }

  onTypeListControlChanged(list: MatSelectionList, typeId: number) {

    let indexOfPrevious: number;
    if (this.lastSelectedIds) {
      indexOfPrevious = this.getIndex(this.lastSelectedIds, typeId);
    } else {
      indexOfPrevious = -1;
    }
    this.selectedOptions = list.selectedOptions.selected.map(item => item.value);
    this.store.dispatch(new listActions.CollectionReset());

    let updatedList: number[];
    let updatedTypeId: string;
    if (indexOfPrevious >= 0) {
      console.log('prev')
      updatedList = this.removeFromList(this.selectedOptions, typeId);

      const zeroIndex = this.getIndex(this.selectedOptions, 0);
      if (zeroIndex >= 0) {
        console.log('removing zero ' + zeroIndex)
        updatedList = this.removeFromList(updatedList, typeId);
      }
      updatedTypeId = this._createIdQueryParam(updatedList);
    } else {
      console.log('new')
      const index = this.getIndex(this.selectedOptions, 0);
      if (index >= 0) {
        updatedList = this.removeFromList(this.selectedOptions, typeId);
      } else {
        updatedList = this.selectedOptions;
      }
      // Otherwise, update the FormArray and navigate.
      // this._updateAreaFormArray(this.selectedOptions,  event.checked);
      updatedTypeId = this._createIdQueryParam(updatedList);
      // this._navigateRoute(updatedAreaId);
    }
    this._updateCurrentTypeStore(updatedTypeId);
    this._navigateRoute(updatedTypeId);
    list.selectedOptions.clear();


    // if (areaId === 0 && this.lastSelectedIds.indexOf(0) >= 0) {
    //   console.log('toggled all collections')
    //   this._navigateRoute('0');
    // } else {
    //   let updatedAreaId: string;
    //   this.selectedOptions = list.selectedOptions.selected.map(item => item.value);
    //   this.store.dispatch(new listActions.CollectionReset());
    //   const indexOfPrevious = this.getIndex(this.lastSelectedIds, areaId);
    //
    //   let updatedList: number[];
    //   // // If the All Collection option is selected, reset the FormArray and navigate.
    //   if (areaId === 0) {
    //     updatedAreaId = '0';
    //     console.log('zero')
    //
    //   } else if (indexOfPrevious >= 0) {
    //     console.log('prev')
    //     updatedList = this.removeFromList(this.selectedOptions, areaId);
    //
    //     const zeroIndex = this.getIndex(this.selectedOptions, 0);
    //     if (zeroIndex >= 0) {
    //       console.log('removing zero ' + zeroIndex)
    //       updatedList = this.removeFromList(updatedList, areaId);
    //     }
    //     updatedAreaId = this._createIdQueryParam(updatedList);
    //   } else {
    //     console.log('new')
    //     const index = this.getIndex(this.selectedOptions, 0);
    //     if (index >= 0) {
    //       updatedList = this.removeFromList(this.selectedOptions, areaId);
    //     } else {
    //       updatedList = this.selectedOptions;
    //     }
    //     // Otherwise, update the FormArray and navigate.
    //     // this._updateAreaFormArray(this.selectedOptions,  event.checked);
    //     updatedAreaId = this._createIdQueryParam(updatedList);
    //     // this._navigateRoute(updatedAreaId);
    //   }
    //   this._navigateRoute(updatedAreaId);
    //   list.selectedOptions.clear();
    // }

  }


  // _removeFromArray(index: number) {
  //   if (index >= 0) {
  //     this.typesFormArray.removeAt(index);
  //   }
  // }
  //
  // _updateAreaFormArray(type: string, checked: boolean) {
  //
  //   if (checked) {
  //     // Add the selected collection areas to FormArray.
  //     this.typesFormArray.push(new FormControl(type));
  //   } else {
  //     // Remove the collection areas from FormArray.
  //     const index = this.typesFormArray.controls.findIndex(x => x.value === type);
  //     this._removeFromArray(index);
  //   }
  //
  // }

  _navigateRoute(typeId: string) {
    console.log(typeId)
    if (this.selectedAreas !== '0' && typeof this.selectedAreas !== 'undefined') {
      if (typeof this.selectedSubject !== 'undefined') {
        if (typeId) {
          this.router.navigate([
            '/',
            environment.appRoot,
            'collection',
            'area',
            this.selectedAreas,
            'type',
            typeId,
            'subject',
            this.selectedSubject
          ]);
        } else {
          this.router.navigate([
            '/',
            environment.appRoot,
            'collection',
            'subject',
            this.selectedSubject,
            'area',
            this.selectedAreas,
          ]);
        }
      } else {
        if (typeId) {
          this.router.navigate([
            '/',
            environment.appRoot,
            'collection',
            'area',
            this.selectedAreas,
            'type',
            typeId]);
        } else {
          this.router.navigate([
            '/',
            environment.appRoot,
            'collection',
            'area',
            this.selectedAreas
          ]);
        }
      }
    } else if (this.selectedAreas === '0') {
      if (this.selectedSubject) {
        if (typeId) {
          this.router.navigate(['/', environment.appRoot, 'collection', 'type', typeId, 'subject', this.selectedSubject]);
        } else {
          this.router.navigate(['/', environment.appRoot, 'collection', 'subject', this.selectedSubject]);
        }
      } else {
        if (typeId) {
          this.router.navigate(['/', environment.appRoot, 'collection', 'type', typeId]);
        } else {
          this.router.navigate(['/', environment.appRoot, 'collection']);
        }
      }
    } else {
      if (typeId) {
        this.router.navigate(['/', environment.appRoot, 'collection', 'type', typeId]);
      } else {
        this.router.navigate(['/', environment.appRoot, 'collection']);
      }
    }
  }

  isSelected(id: string): boolean {
    if (this.selectedTypes) {
      return this.selectedTypes.indexOf(id) >= 0;
    }
    return false;
  }

  // onChange(type: any, event: any) {
  //   this.store.dispatch(new listActions.CollectionReset());
  //   this._updateAreaFormArray(type.toString(), event.checked);
  //   const typeId = this._createIdQueryParam(this.typesFormArray);
  //   this._navigateRoute(typeId);
  //
  // }

  ngOnInit() {
  }

  ngAfterViewInit() {
    console.log('after view init ' + this.selectedTypes)
    this._setLastTypeIds(this.selectedTypes);
  }

  ngOnDestroy(): void {
    // this.typesFormArray = null;
    // this.checkboxGroup = null;
    // this.formArrayRef = null;

  }

}
