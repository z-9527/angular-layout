import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableDemoRoutingModule } from './table-demo-routing.module';
import { TableDemoComponent } from './table-demo.component';
import { TableModule } from 'table';
import { NzButtonModule } from 'ng-zorro-antd/button';

@NgModule({
  declarations: [TableDemoComponent],
  imports: [CommonModule, TableDemoRoutingModule, TableModule, NzButtonModule],
})
export class TableDemoModule {}
