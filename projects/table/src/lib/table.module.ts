import { NgModule } from '@angular/core';
import { TableComponent } from './table.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { CommonModule } from '@angular/common';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

@NgModule({
  declarations: [TableComponent],
  imports: [NzTableModule, NzOutletModule, CommonModule, NzToolTipModule],
  exports: [TableComponent],
})
export class TableModule {}
