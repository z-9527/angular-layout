import { NgModule } from '@angular/core';
import { FormlyNzInputModule } from '../input';
import { FormlyNzSelectModule } from '../select';
import { FormlyNzCascaderModule } from '../cascader';
import { FormlyNzRadioModule } from '../radio';
import { FormlyNzCheckboxModule } from '../checkbox';
import { FormlyNzSwitchModule } from '../switch';
import { FormlyNzTreeSelectModule } from '../tree-select';
import { FormlyNzUploadModule } from '../upload';
import { FormlyNzDateModule } from '../date';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
registerLocaleData(zh);

@NgModule({
  imports: [
    FormlyNzInputModule,
    FormlyNzSelectModule,
    FormlyNzCascaderModule,
    FormlyNzRadioModule,
    FormlyNzCheckboxModule,
    FormlyNzSwitchModule,
    FormlyNzTreeSelectModule,
    FormlyNzUploadModule,
    FormlyNzDateModule,
  ],
})
export class FormlyNgZorroAntdModule {}
