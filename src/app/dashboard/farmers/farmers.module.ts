import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FarmersRoutingModule } from './farmers-routing.module';
import { FarmersComponent } from './farmers.component';


@NgModule({
  declarations: [
    FarmersComponent
  ],
  imports: [
    CommonModule,
    FarmersRoutingModule
  ]
})
export class FarmersModule { }
