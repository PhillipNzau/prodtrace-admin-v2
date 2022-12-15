import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'auth', loadComponent: () => import('./auth/auth.component').then(mod => mod.AuthComponent)},
  {path:'', redirectTo: '/auth', pathMatch: 'full'},
  {path:'**', redirectTo: '/auth', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
