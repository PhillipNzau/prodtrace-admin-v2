import {Routes} from "@angular/router";
import {DashboardComponent} from "./dashboard.component";

export const DASHBOARD_ROUTES: Routes = [
  {path: '', component: DashboardComponent, children: [
      {path: '', loadChildren: () => import('./farmers/farmers.module').then(m => m.FarmersModule)}
    ]},
  ];
