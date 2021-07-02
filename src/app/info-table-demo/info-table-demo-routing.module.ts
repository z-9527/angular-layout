import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoTableDemoComponent } from './info-table-demo.component';

const routes: Routes = [{ path: '', component: InfoTableDemoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoTableDemoRoutingModule {}
