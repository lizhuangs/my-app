import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
// Imports for loading & configuring the in-memory web api
// import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import {InMemoryDataService} from './in-memory-data.service';
import {PageNotFoundComponent} from './not-found.component';
import {HeroesModule} from './heroes/heroes.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DialogService} from './dialog.service';
import {ComposeMessageComponent} from './compose-message.component';
import {Router} from '@angular/router';
import {LoginComponent} from './login.component';
import {LoginRoutingModule} from './login-routing.module';
import {HeroFormModule} from './form/hero-form.module';
import {HttpFormModule} from './http/http-form.module';
import {Utils} from './providers/Utils';
import {GlobalData} from './providers/GlobalData';
import {Logger} from './providers/Logger';
import {HttpService} from './providers/HttpService';
import {HttpClientModule} from '@angular/common/http';
import {MessageService} from './message.service';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    ComposeMessageComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    HeroesModule,
    HeroFormModule,
    HttpFormModule,
    LoginRoutingModule,
    // InMemoryWebApiModule将Http客户端默认的后端服务,替换成了内存 Web API服务
    // InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule
    /*  RouterModule.forRoot([
       {
         path: 'detail/:id',
         component: HeroDetailComponent
       }
     ]) */
  ],
  providers: [
    DialogService,
    HttpService,
    Utils,
    GlobalData,
    Logger,
    MessageService],
  bootstrap: [AppComponent]
})
export class AppModule {// Diagnostic only: inspect router configuration
  constructor(router: Router) {
    // console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }
}
