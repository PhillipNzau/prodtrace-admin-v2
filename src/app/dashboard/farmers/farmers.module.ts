import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FarmersRoutingModule } from './farmers-routing.module';
import { FarmersComponent } from './farmers.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchPipe } from './services/search.pipe';

@NgModule({
  declarations: [FarmersComponent, SearchPipe],
  imports: [
    CommonModule,
    FarmersRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class FarmersModule {}
