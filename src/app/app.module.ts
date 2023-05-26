import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { AuthComponent } from './auth/auth.component';
import {FormsModule} from "@angular/forms";
import {AppRouterModule} from "./app-router/app-router.module";
import {authInterceptorProviders} from "./service/auth.interceptor";
import { RegisterComponent } from './register/register.component';
import {HttpClientModule} from "@angular/common/http";
import { AddPostComponent } from './add-post/add-post.component';




@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AuthComponent,
    RegisterComponent,
    AddPostComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRouterModule,
    HttpClientModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
