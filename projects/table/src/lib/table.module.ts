import { NgModule } from '@angular/core';
import { TableComponent } from './table.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { CommonModule } from '@angular/common';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';
import { TooltipComponent } from './tooltip/tooltip.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { IconDefinition } from '@ant-design/icons-angular';
import {
  ColumnHeightOutline,
  FullscreenExitOutline,
  FullscreenOutline,
  MoreOutline,
  ReloadOutline,
  SettingOutline,
  VerticalAlignBottomOutline,
  VerticalAlignMiddleOutline,
  VerticalAlignTopOutline,
} from '@ant-design/icons-angular/icons';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ColumnSettingComponent } from './column-setting/column-setting.component';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const icons: IconDefinition[] = [
  ColumnHeightOutline,
  SettingOutline,
  ReloadOutline,
  FullscreenOutline,
  FullscreenExitOutline,
  VerticalAlignTopOutline,
  VerticalAlignBottomOutline,
  VerticalAlignMiddleOutline,
  MoreOutline,
];
@NgModule({
  declarations: [TableComponent, TooltipComponent, ColumnSettingComponent],
  imports: [
    NzTableModule,
    NzOutletModule,
    CommonModule,
    NzToolTipModule,
    NzIconModule,
    NzDropDownModule,
    NzButtonModule,
    NzPopoverModule,
    DragDropModule,
    NzCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [TableComponent],
  providers: [{ provide: NZ_ICONS, useValue: icons }],
})
export class TableModule {}
