import {Injectable} from '@angular/core';
import {CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {CrisisDetailComponent} from "../crisis-center/crisis-detail.component";

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
  providedIn: 'root',
})
/*
* 第一种方式：
* 这种方式的实现在组件本身里面实现，相对来说更灵活通用一些
* */
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate(component: CanComponentDeactivate) {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}

/*
* 第二种方式：
* 这种方式指定了组件，实现也直接在本类中，更适用于一些特殊场合用于定制
* */
/*export class CanDeactivateGuard implements CanDeactivate<CrisisDetailComponent> {
  canDeactivate(
    component: CrisisDetailComponent,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    console.log(route.paramMap.get('id'));
    console.log(state.url);
    if (!component.crisis || component.crisis.name === component.editName) {
      return true;
    }
    return component.dialogService.confirm('Discard changes?');
  }
}*/


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
