import {Routes} from "@angular/router";
import {DashboardComponent} from "./dashboard.component";
import {FarmsResolver} from "./state/farms-state/farms.resolver";
import {CropsResolver} from "./state/crop-state/crops.resolver";
import {FarmCropResolver} from "./state/farm-crop-state/farm-crop.resolver";
import {UsersResolver} from "./state/user-state/users.resolver";

export const DASHBOARD_ROUTES: Routes = [
  {path: '', component: DashboardComponent, children: [
      {path: '',
        resolve: {
          farms: FarmsResolver,
          crops: CropsResolver,
          farmCrops: FarmCropResolver,
          users: UsersResolver,
        },
        loadChildren: () => import('./farmers/farmers.module').then(m => m.FarmersModule)}
    ]},
  ];
