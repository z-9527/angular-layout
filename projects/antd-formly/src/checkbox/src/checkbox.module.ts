import { NgModule } from '@angular/core';
import { FormlyModule } from '@ngx-formly/core';
import { SharedModule } from '../../shared.module';
import { FormlyFieldCheckbox } from './checkbox.type';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzCheckboxLayoutComponent } from './checkbox-wrapper';
import { NzGridModule } from 'ng-zorro-antd/grid';

@NgModule({
  declarations: [FormlyFieldCheckbox, NzCheckboxLayoutComponent],
  imports: [
    SharedModule,
    NzCheckboxModule,
    NzGridModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'checkbox',
          component: FormlyFieldCheckbox,
          wrappers: ['form-field'],
        },
      ],
    }),
  ],
})
export class FormlyNzCheckboxModule {}
