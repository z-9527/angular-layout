import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { FormlyFieldRadio } from './radio.type';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { FormlyModule } from '@ngx-formly/core';

@NgModule({
  declarations: [FormlyFieldRadio],
  imports: [
    SharedModule,
    NzRadioModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'radio',
          component: FormlyFieldRadio,
          wrappers: ['form-field'],
        },
      ],
    }),
  ],
})
export class FormlyNzRadioModule {}
