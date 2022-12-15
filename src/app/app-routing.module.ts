import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'auth', loadComponent: () => import('./auth/auth.component').then(mod => mod.AuthComponent)},
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard-routing').then(mod => mod.DASHBOARD_ROUTES) },
  {path:'', redirectTo: '/dashboard', pathMatch: 'full'},
  {path:'**', redirectTo: '/auth', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
