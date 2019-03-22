import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CrisisCenterHomeComponent} from './crisis-center-home.component';
import {CrisisListComponent} from './crisis-list.component';
import {CrisisCenterComponent} from './crisis-center.component';
import {CrisisDetailComponent} from './crisis-detail.component';
import {CanDeactivateGuard} from '../providers/can-deactivate-guard.service';
import {CrisisDetailResolverService} from './crisis-detail-resolver.service';

const crisisCenterRoutes: Routes = [
  {
    path: 'test', // 必须在默认path: ''之前声明才有效，页面使用相对路径<a routerLink="test">test</a>
    component: CrisisDetailComponent
  },
  {
    path: '',
    component: CrisisCenterComponent,
    children: [
      {
        path: '',
        component: CrisisListComponent,
        children: [
          {
            path: ':id',
            component: CrisisDetailComponent,
            canDeactivate: [CanDeactivateGuard], // 处理未保存的更改
            // 预先获取组件数据 导航前预先加载路由信息，简单理解为过滤器
            // 好处1、当网络不好时不会显示空数据给用户 2、如果数据为空，可以提前处理而不用再跳转去渲染组件了
            resolve: {
              crisisDetail: CrisisDetailResolverService
            }
          },
          {
            path: '',
            component: CrisisCenterHomeComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(crisisCenterRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers:[
    CrisisDetailResolverService
  ]
})
export class CrisisCenterRoutingModule {
}


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
