import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FarmersRoutingModule } from './farmers-routing.module';
import { FarmersComponent } from './farmers.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    FarmersComponent
  ],
    imports: [
        CommonModule,
        FarmersRoutingModule,
        ReactiveFormsModule
    ]
})
export class FarmersModule { }
