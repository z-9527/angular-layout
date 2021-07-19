import { NgModule } from '@angular/core';
import { FormlyNzInputModule } from '../input';
import { FormlyNzSelectModule } from '../select';
import { FormlyNzCascaderModule } from '../cascader';

@NgModule({
  imports: [FormlyNzInputModule, FormlyNzSelectModule, FormlyNzCascaderModule],
})
export class FormlyNgZorroAntdModule {}
