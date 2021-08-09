import { NgModule } from '@angular/core';
import { FormlyNzInputModule } from '../input';
import { FormlyNzSelectModule } from '../select';
import { FormlyNzCascaderModule } from '../cascader';
import { FormlyNzRadioModule } from '../radio';
import { FormlyNzCheckboxModule } from '../checkbox';
import { FormlyNzSwitchModule } from '../switch';
import { FormlyNzTreeSelectModule } from '../tree-select';

@NgModule({
  imports: [
    FormlyNzInputModule,
    FormlyNzSelectModule,
    FormlyNzCascaderModule,
    FormlyNzRadioModule,
    FormlyNzCheckboxModule,
    FormlyNzSwitchModule,
    FormlyNzTreeSelectModule,
  ],
})
export class FormlyNgZorroAntdModule {}
