import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeroFormComponent } from './hero-form.component';

const routes: Routes = [
  { path: 'form', component: HeroFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HeroFormRoutingModule { }
