import { NgModule } from '@angular/core';
import { TableComponent } from './table.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { CommonModule } from '@angular/common';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TooltipComponent } from './tooltip/tooltip.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { IconDefinition } from '@ant-design/icons-angular';
import {
  ColumnHeightOutline,
  FullscreenExitOutline,
  FullscreenOutline,
  ReloadOutline,
  SettingOutline,
} from '@ant-design/icons-angular/icons';
import { NzButtonModule } from 'ng-zorro-antd/button';

const icons: IconDefinition[] = [
  ColumnHeightOutline,
  SettingOutline,
  ReloadOutline,
  FullscreenOutline,
  FullscreenExitOutline,
];
@NgModule({
  declarations: [TableComponent, TooltipComponent],
  imports: [
    NzTableModule,
    NzOutletModule,
    CommonModule,
    NzToolTipModule,
    NzIconModule.forChild(icons),
    NzDropDownModule,
    NzButtonModule,
  ],
  exports: [TableComponent],
})
export class TableModule {}
