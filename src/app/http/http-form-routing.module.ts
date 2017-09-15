import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HttpFormComponent } from './http-form.component';

const routes: Routes = [
  { path: 'http', component: HttpFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HttpFormRoutingModule { }
