import {Injectable} from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {Observable, of, EMPTY} from 'rxjs';
import {mergeMap, take} from 'rxjs/operators';
import {Crisis, CrisisService} from './crisis.service';

@Injectable()
export class CrisisDetailResolverService implements Resolve<Crisis> {
  constructor(private cs: CrisisService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Crisis> | Observable<never> {
    let id = route.paramMap.get('id');

    return this.cs.getCrisis(id).pipe(
      take(1),
      mergeMap(crisis => {
        if (crisis) {
          return of(crisis);
        } else { // id not found
          this.router.navigate(['/crisis-center']);
          return EMPTY;
        }
      })
    );
  }

  /*  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Crisis> {
      // 测试发现如果这里实际联网查询很慢的话，界面会卡住
      let id = route.paramMap.get('id');
      console.log('CrisisDetailResolver' + id);
      return this.cs.getCrisis(id).then(crisis => {
        if (crisis) {
          return crisis;
        } else {
          // id not found，注意看浏览器地址栏
          this.router.navigate(['/crisis-center']);
          return null;
        }
      });
    }*/
}


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
