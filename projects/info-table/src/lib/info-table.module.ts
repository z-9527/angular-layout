import { NgModule } from '@angular/core';
import { InfoTableComponent } from './info-table.component';
import { CommonModule } from '@angular/common';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';

@NgModule({
  declarations: [InfoTableComponent],
  imports: [CommonModule, NzOutletModule],
  exports: [InfoTableComponent],
})
export class InfoTableModule {}
