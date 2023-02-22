import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { FarmsResolver } from './state/farms-state/farms.resolver';
import { CropsResolver } from './state/crop-state/crops.resolver';
import { FarmCropResolver } from './state/farm-crop-state/farm-crop.resolver';
import { UsersResolver } from './state/user-state/users.resolver';
import { ChatsResolver } from './state/chat-state/chats.resolver';
import { CropCycleResolver } from './state/crop-cycle-state/crop-cycle.resolver';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        resolve: {
          farms: FarmsResolver,
          crops: CropsResolver,
          farmCrops: FarmCropResolver,
          users: UsersResolver,
          chats: ChatsResolver,
          cropCycle: CropCycleResolver,
        },
        loadChildren: () =>
          import('./farmers/farmers.module').then((m) => m.FarmersModule),
      },
    ],
  },
];
