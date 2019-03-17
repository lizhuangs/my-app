import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HeroesComponent } from './heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

import { HeroService } from './hero.service';
import { HeroRoutingModule } from './heroes-routing.module';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HeroRoutingModule
  ],
  declarations: [
    HeroesComponent,
    HeroDetailComponent,
    HeroSearchComponent,
    DashboardComponent
  ],
  providers: [HeroService]
})
export class HeroesModule { }
