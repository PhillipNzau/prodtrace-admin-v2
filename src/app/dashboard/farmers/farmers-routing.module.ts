import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FarmersComponent } from './farmers.component';

const routes: Routes = [{ path: '', component: FarmersComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FarmersRoutingModule { }
