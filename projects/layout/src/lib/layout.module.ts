import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { IconDefinition } from '@ant-design/icons-angular';
import {
  MenuFoldOutline,
  MenuUnfoldOutline,
} from '@ant-design/icons-angular/icons';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
const icons: IconDefinition[] = [MenuFoldOutline, MenuUnfoldOutline];

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    NzLayoutModule,
    NzIconModule.forRoot(icons),
    NzMenuModule,
    BrowserAnimationsModule,
    RouterModule.forChild([]),
  ],
  exports: [LayoutComponent],
})
export class LayoutModule {}
