import {inject, NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginService} from "./auth/services/login/login.service";

const routes: Routes = [
  {path:'auth', loadComponent: () => import('./auth/auth.component').then(mod => mod.AuthComponent)},
  { path: 'dashboard', loadChildren: () =>
      import('./dashboard/dashboard-routing')
        .then(mod => mod.DASHBOARD_ROUTES),
  canActivate: [() => inject(LoginService).isLoggedIn]},
  {path:'', redirectTo: '/dashboard', pathMatch: 'full'},
  {path:'**', redirectTo: '/auth', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
