import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HeroesComponent} from './heroes.component';
import {HeroDetailComponent} from './hero-detail/hero-detail.component';
import {DashboardComponent} from '../dashboard/dashboard.component';

const heroesRoutes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'heroes', component: HeroesComponent, data: {animation: 'heroes'}},
  {path: 'hero/:id', component: HeroDetailComponent, data: {animation: 'hero'}}
];

@NgModule({
  imports: [
    RouterModule.forChild(heroesRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class HeroRoutingModule {
}
