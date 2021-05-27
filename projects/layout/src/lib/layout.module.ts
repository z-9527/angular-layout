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
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { SideComponent } from './side/side.component';

const icons: IconDefinition[] = [MenuFoldOutline, MenuUnfoldOutline];

@NgModule({
  declarations: [LayoutComponent, SideComponent],
  imports: [
    NzLayoutModule,
    NzIconModule.forRoot(icons),
    NzMenuModule,
    BrowserAnimationsModule,
    RouterModule.forChild([]),
    NzOutletModule,
    NzAvatarModule,
    NzDropDownModule,
  ],
  exports: [LayoutComponent],
})
export class LayoutModule {}
