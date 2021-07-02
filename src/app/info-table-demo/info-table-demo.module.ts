import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfoTableDemoRoutingModule } from './info-table-demo-routing.module';
import { InfoTableDemoComponent } from './info-table-demo.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { InfoTableModule } from 'info-table';

@NgModule({
  declarations: [InfoTableDemoComponent],
  imports: [
    CommonModule,
    InfoTableDemoRoutingModule,
    NzCardModule,
    InfoTableModule,
  ],
})
export class InfoTableDemoModule {}
