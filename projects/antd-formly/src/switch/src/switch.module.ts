import { NgModule } from '@angular/core';
import { FormlyModule } from '@ngx-formly/core';
import { SharedModule } from '../../shared.module';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { FormlyFieldSwitch } from './switch.type';

@NgModule({
  declarations: [FormlyFieldSwitch],
  imports: [
    SharedModule,
    NzSwitchModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'switch',
          component: FormlyFieldSwitch,
          wrappers: ['form-field'],
        },
      ],
    }),
  ],
})
export class FormlyNzSwitchModule {}
