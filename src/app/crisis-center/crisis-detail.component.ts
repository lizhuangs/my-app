import {Component, OnInit, HostBinding} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {slideInDownAnimation} from '../animations';
import {Crisis} from './crisis.service';
import {DialogService} from '../providers/dialog.service';
import {Observable} from 'rxjs';

@Component({
  template: `
    <div *ngIf="crisis">
      <h3>"{{ editName }}"</h3>
      <div>
        <label>Id: </label>{{ crisis.id }}</div>
      <div>
        <label>Name: </label>
        <input [(ngModel)]="editName" placeholder="name"/>
      </div>
      <p>
        <button (click)="save()">Save</button>
        <button (click)="cancel()">Cancel</button>
      </p>
    </div>
  `,
  styles: ['input {width: 20em}'],
  animations: [slideInDownAnimation]
})
export class CrisisDetailComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  // @HostBinding('style.position') position = 'absolute';

  crisis: Crisis;
  editName: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialogService: DialogService
  ) {
  }

  ngOnInit() {
    // 注意看这个里面的_value的值。
    // console.log(this.route.data);
    this.route.data
      .subscribe((data: { crisisDetail: Crisis }) => {
        this.editName = data.crisisDetail.name;
        this.crisis = data.crisisDetail;
      });
  }

  cancel() {
    this.gotoCrises();
  }

  save() {
    this.crisis.name = this.editName;
    this.gotoCrises();
  }

  /*  canDeactivate(): Promise<boolean> | boolean {
      if (!this.crisis || this.crisis.name === this.editName) {
        return true;
      }
      return this.dialogService.confirm('Discard changes?');
    }*/

  canDeactivate(): Observable<boolean> | boolean {
    if (!this.crisis || this.crisis.name === this.editName) {
      return true;
    }
    return this.dialogService.confirm('Discard changes?');
  }

  gotoCrises() {
    let crisisId = this.crisis ? this.crisis.id : null;
    // Pass along the crisis id if available
    // so that the CrisisListComponent can select that crisis.
    // Add a totally useless `foo` parameter for kicks.
    // Relative navigation back to the crises
    this.router.navigate(['../', {id: crisisId, foo: 'foo'}], {relativeTo: this.route});
  }
}


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
