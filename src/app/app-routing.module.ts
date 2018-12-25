import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EnvelopeComponent } from './envelope/envelope.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "envelope",
    component: EnvelopeComponent,
  },
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
