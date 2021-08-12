import { NgModule } from '@angular/core';
import { FormlyModule } from '@ngx-formly/core';
import { SharedModule } from '../../shared.module';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { FormlyFieldDate } from './date.type';

@NgModule({
  declarations: [FormlyFieldDate],
  imports: [
    SharedModule,
    NzDatePickerModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'date',
          component: FormlyFieldDate,
          wrappers: ['form-field'],
        },
      ],
    }),
  ],
})
export class FormlyNzDateModule {}
