import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormlyDemoRoutingModule } from './formly-demo-routing.module';
import { FormlyDemoComponent } from './formly-demo.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyNgZorroAntdModule } from 'antd-formly';
import { FormlyModule } from '@ngx-formly/core';
import { NzButtonModule } from 'ng-zorro-antd/button';

@NgModule({
  declarations: [FormlyDemoComponent],
  imports: [
    CommonModule,
    FormlyDemoRoutingModule,
    ReactiveFormsModule,
    FormlyNgZorroAntdModule,
    FormlyModule.forRoot(),
    NzButtonModule,
  ],
})
export class FormlyDemoModule {}
