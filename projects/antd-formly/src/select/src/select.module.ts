import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { FormlyFieldSelect } from './select.type';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormlyModule } from '@ngx-formly/core';

@NgModule({
  declarations: [FormlyFieldSelect],
  imports: [
    SharedModule,
    NzSelectModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'select',
          component: FormlyFieldSelect,
          wrappers: ['form-field'],
        },
      ],
    }),
  ],
})
export class FormlyNzSelectModule {}
