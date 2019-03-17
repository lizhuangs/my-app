import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './not-found.component';
import { ComposeMessageComponent } from './common/compose-message/compose-message.component';
import { CanDeactivateGuard } from './providers/can-deactivate-guard.service';
import { AuthGuard } from './providers/auth-guard.service';
import { SelectivePreloadingStrategy } from './providers/selective-preloading-strategy';
const routes: Routes = [
  {
    path: 'compose',
    component: ComposeMessageComponent,
    outlet: 'popup'
  },
  {
    path: 'admin',
    loadChildren: 'app/admin/admin.module#AdminModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'form',
    loadChildren: 'app/form/hero-form.module#HeroFormModule'
  },
  {
    path: 'http',
    loadChildren: 'app/http/http-form.module#HttpFormModule'
  },
  {
    path: 'crisis-center',
    loadChildren: 'app/crisis-center/crisis-center.module#CrisisCenterModule',
    data: { preload: true }
  },
  { path: '', redirectTo: '/heroes', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
  // { path: 'crisis-center', component: CrisisListComponent },
  // { path: '', redirectTo: '/heroes', pathMatch: 'full' },
  // { path: 'detail/:id', component: HeroDetailComponent },
  // { path: 'heroes', component: HeroesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      preloadingStrategy: SelectivePreloadingStrategy
      // ,enableTracing: true //debugging purposes only
    }
  )],
  exports: [RouterModule],
  providers: [
    CanDeactivateGuard,
    SelectivePreloadingStrategy
  ]
})
export class AppRoutingModule { }

/*
路由器支持多种守卫：
1. 用CanActivate来处理导航到某路由的情况。
2. 用CanActivateChild处理导航到子路由的情况。
3. 用CanDeactivate来处理从当前路由离开的情况。
4. 用Resolve在路由激活之前获取路由数据。
5. 用CanLoad来处理异步导航到某特性模块的情况。
 */
