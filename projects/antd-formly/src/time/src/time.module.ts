import { NgModule } from '@angular/core';
import { FormlyModule } from '@ngx-formly/core';
import { SharedModule } from '../../shared.module';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { FormlyFieldTime } from './time.type';

@NgModule({
  declarations: [FormlyFieldTime],
  imports: [
    SharedModule,
    NzTimePickerModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'time',
          component: FormlyFieldTime,
          wrappers: ['form-field'],
        },
      ],
    }),
  ],
})
export class FormlyNzTimeModule {}
