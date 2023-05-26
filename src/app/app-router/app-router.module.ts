import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AuthComponent} from "../auth/auth.component";
import {MainComponent} from "../main/main.component";
import {RegisterComponent} from "../register/register.component";
import {AddPostComponent} from "../add-post/add-post.component";

const routes: Routes = [
  {path:'', component:MainComponent},
  { path: 'auth', component: AuthComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'add-post', component: AddPostComponent },

];
// @ts-ignore
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRouterModule { }
