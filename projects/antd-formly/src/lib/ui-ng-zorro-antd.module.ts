import { NgModule } from '@angular/core';
import { FormlyNzInputModule } from '../input';
import { FormlyNzSelectModule } from '../select';
import { FormlyNzCascaderModule } from '../cascader';
import { FormlyNzRadioModule } from '../radio';
import { FormlyNzCheckboxModule } from '../checkbox';
import { FormlyNzSwitchModule } from '../switch';

@NgModule({
  imports: [
    FormlyNzInputModule,
    FormlyNzSelectModule,
    FormlyNzCascaderModule,
    FormlyNzRadioModule,
    FormlyNzCheckboxModule,
    FormlyNzSwitchModule,
  ],
})
export class FormlyNgZorroAntdModule {}
