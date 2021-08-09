import { NgModule } from '@angular/core';
import { FormlyModule } from '@ngx-formly/core';
import { SharedModule } from '../../shared.module';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
import { FormlyFieldTreeSelect } from './tree-select.type';

@NgModule({
  declarations: [FormlyFieldTreeSelect],
  imports: [
    SharedModule,
    NzTreeSelectModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'tree-select',
          component: FormlyFieldTreeSelect,
          wrappers: ['form-field'],
        },
      ],
    }),
  ],
})
export class FormlyNzTreeSelectModule {}
