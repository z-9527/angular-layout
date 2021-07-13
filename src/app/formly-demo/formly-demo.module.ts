import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormlyDemoRoutingModule } from './formly-demo-routing.module';
import { FormlyDemoComponent } from './formly-demo.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyNgZorroAntdModule } from 'antd-formly';
import { FormlyModule } from '@ngx-formly/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';
import * as AllIcons from '@ant-design/icons-angular/icons';
const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map((key) => antDesignIcons[key]);

@NgModule({
  declarations: [FormlyDemoComponent],
  imports: [
    CommonModule,
    FormlyDemoRoutingModule,
    ReactiveFormsModule,
    FormlyNgZorroAntdModule,
    FormlyModule.forRoot(),
    NzButtonModule,
    NzIconModule.forRoot(icons),
  ],
})
export class FormlyDemoModule {}
