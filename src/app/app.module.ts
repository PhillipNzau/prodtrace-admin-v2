import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

// Ngrx Store
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import {EntityDataModule, EntityDataService} from '@ngrx/data';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { entityConfig } from './entity-metadata';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {FarmsDataService} from "./dashboard/services/farm/farms-data.service";
import {FarmCropDataService} from "./dashboard/services/farm-crop/farm-crop-data.service";
import {CropDataService} from "./dashboard/services/crop/crop-data.service";
import {PlantCycleDataService} from "./dashboard/services/plantCycle/plant-cycle-data.service";
import {environment} from "../environments/environment";
import {AuthInterceptor} from "./shared/service/auth.interceptor";
import {LoginDataService} from "./auth/services/login/login-data.service";
import {UsersDataService} from "./dashboard/services/user/users-data.service";
import {ChatDataService} from "./dashboard/services/chat/chat-data.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),
    EntityDataModule.forRoot(entityConfig),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    })
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    entityDataService: EntityDataService,
    UsersDataService: UsersDataService,
    FarmsDataService: FarmsDataService,
    FarmCropDataService: FarmCropDataService,
    CropDataService: CropDataService,
    PlantCycleDataService: PlantCycleDataService,
    ChatService: ChatDataService,
  ) {
    entityDataService.registerServices({'Users': UsersDataService})
    entityDataService.registerServices({'Farms': FarmsDataService})
    entityDataService.registerServices({'FarmCrop': FarmCropDataService})
    entityDataService.registerServices({'Crop': CropDataService})
    entityDataService.registerServices({'PlantCycle': PlantCycleDataService})
    entityDataService.registerServices({'Chat': ChatService})
  }
}
