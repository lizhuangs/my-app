import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './not-found.component';
import { ComposeMessageComponent } from './common/compose-message/compose-message.component';
import { AuthGuard } from './providers/auth-guard.service';
import { SelectivePreloadingStrategy } from './providers/selective-preloading-strategy';
const routes: Routes = [
  /* 如果使用绝对路径/，那么模块必须放在src/app目录下 */
  {
    path: 'login',
    loadChildren: './login.module#LoginModule'
  },
  {
    path: 'compose',
    component: ComposeMessageComponent,
    outlet: 'popup'
  },
  /* 相对路径 */
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule',
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
      // HashLocationStrategy策略，一般用默认的H5风格
      // , useHash: true
      // ,enableTracing: true //debugging purposes only
    }
  )],
  exports: [RouterModule],
  providers: [
    SelectivePreloadingStrategy,
    /* 如果将AuthGuard放在其它 非异步 模块的路由中，这个路由必须在根路由之前定义，那么根路由这里也可以省略 */
    AuthGuard
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
