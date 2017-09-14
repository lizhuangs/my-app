import { NgModule } from '@angular/core';
import { HeroFormComponent } from './hero-form.component';
import { HeroFormTemplateComponent } from './hero-form-template.component';
import { HeroFormReactiveComponent } from './hero-form-reactive.component';
import { ForbiddenValidatorDirective } from './forbidden-name.directive';
import { HeroFormRoutingModule } from './hero-form-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HeroFormRoutingModule
  ],
  declarations: [
    HeroFormComponent,
    HeroFormTemplateComponent,
    HeroFormReactiveComponent,
    ForbiddenValidatorDirective
  ]
})
export class HeroFormModule { }
