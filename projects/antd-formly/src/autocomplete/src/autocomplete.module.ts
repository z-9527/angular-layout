import { NgModule } from '@angular/core';
import { FormlyModule } from '@ngx-formly/core';
import { SharedModule } from '../../shared.module';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormlyFieldAutocomplete } from './autocomplete.type';

@NgModule({
  declarations: [FormlyFieldAutocomplete],
  imports: [
    SharedModule,
    NzInputModule,
    NzAutocompleteModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'autocomplete',
          component: FormlyFieldAutocomplete,
          wrappers: ['form-field'],
        },
      ],
    }),
  ],
})
export class FormlyNzAutocompleteModule {}
