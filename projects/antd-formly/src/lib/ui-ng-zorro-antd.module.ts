import { NgModule } from '@angular/core';
import { FormlyNzInputModule } from '../input';
import { FormlyNzSelectModule } from '../select';
import { FormlyNzCascaderModule } from '../cascader';
import { FormlyNzRadioModule } from '../radio';
import { FormlyNzCheckboxModule } from '../checkbox';

@NgModule({
  imports: [
    FormlyNzInputModule,
    FormlyNzSelectModule,
    FormlyNzCascaderModule,
    FormlyNzRadioModule,
    FormlyNzCheckboxModule,
  ],
})
export class FormlyNgZorroAntdModule {}
