import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilterListDemoRoutingModule } from './filter-list-demo-routing.module';
import { FilterListDemoComponent } from './filter-list-demo.component';
import { FilterListModule } from 'filter-list';

@NgModule({
  declarations: [FilterListDemoComponent],
  imports: [CommonModule, FilterListDemoRoutingModule, FilterListModule],
})
export class FilterListDemoModule {}
