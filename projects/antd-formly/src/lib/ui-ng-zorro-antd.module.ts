import { NgModule } from '@angular/core';
import { FormlyNzInputModule } from '../input';
import { FormlyNzSelectModule } from '../select';
import { FormlyNzCascaderModule } from '../cascader';
import { FormlyNzRadioModule } from '../radio';

@NgModule({
  imports: [FormlyNzInputModule, FormlyNzSelectModule, FormlyNzCascaderModule, FormlyNzRadioModule],
})
export class FormlyNgZorroAntdModule {}
