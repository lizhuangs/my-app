import { NgModule } from '@angular/core';
import { HttpFormComponent } from './http-form.component';
import { HttpFormTemplateComponent } from './http-form-template.component';
import { HttpFormRoutingModule } from './http-form-routing.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpFormRoutingModule
  ],
  declarations: [
    HttpFormComponent,
    HttpFormTemplateComponent
  ]
})
export class HttpFormModule { }
