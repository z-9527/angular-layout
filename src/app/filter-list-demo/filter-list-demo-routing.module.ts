import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilterListDemoComponent } from './filter-list-demo.component';

const routes: Routes = [{ path: '', component: FilterListDemoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilterListDemoRoutingModule {}
