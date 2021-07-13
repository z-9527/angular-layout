import { NgModule } from '@angular/core';
import { FormlyModule } from '@ngx-formly/core';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { SharedModule } from '../../shared.module';
import { FormlyFieldInput } from './input.type';

@NgModule({
  declarations: [FormlyFieldInput],
  imports: [
    SharedModule,
    NzInputModule,
    NzInputNumberModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'input',
          component: FormlyFieldInput,
          wrappers: ['form-field'],
          defaultOptions: {
            templateOptions: {
              placeholder: '请输入',
              allowClear: true,
            },
          },
        },
        {
          name: 'textarea',
          extends: 'input',
          defaultOptions: {
            templateOptions: {
              type: 'textarea',
              rows: 3,
            },
          },
        },
        {
          name: 'number',
          extends: 'input',
          defaultOptions: {
            templateOptions: {
              type: 'number',
              style: { width: '100%' },
            },
          },
        },
      ],
    }),
  ],
})
export class FormlyNzInputModule {}
