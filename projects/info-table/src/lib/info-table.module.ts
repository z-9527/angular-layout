import { NgModule } from '@angular/core';
import { InfoTableComponent } from './info-table.component';
import { CommonModule } from '@angular/common';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { EllipsisTextComponent } from './ellipsis-text/ellipsis-text.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { IconDefinition } from '@ant-design/icons-angular';
import { DownOutline, UpOutline } from '@ant-design/icons-angular/icons';

const icons: IconDefinition[] = [UpOutline, DownOutline];

@NgModule({
  declarations: [InfoTableComponent, EllipsisTextComponent],
  imports: [CommonModule, NzOutletModule, NzIconModule.forChild(icons)],
  exports: [InfoTableComponent, EllipsisTextComponent],
})
export class InfoTableModule {}
