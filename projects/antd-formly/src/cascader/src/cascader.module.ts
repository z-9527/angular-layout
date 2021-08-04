import { NgModule } from '@angular/core';
import { FormlyModule } from '@ngx-formly/core';
import { SharedModule } from '../../shared.module';
import { FormlyFieldCascader } from './cascader.type';
import { NzCascaderModule } from 'ng-zorro-antd/cascader';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [FormlyFieldCascader],
  imports: [
    SharedModule,
    NzCascaderModule,
    HttpClientModule,
    HttpClientJsonpModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'cascader',
          component: FormlyFieldCascader,
          wrappers: ['form-field'],
        },
        {
          name: 'address',
          extends: 'cascader',
          defaultOptions: {
            templateOptions: {
              district: true,
            },
          },
        },
      ],
    }),
  ],
})
export class FormlyNzCascaderModule {}
