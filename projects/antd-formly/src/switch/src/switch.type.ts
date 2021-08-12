import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'formly-field-nz-switch',
  template: ` <nz-switch
    [formControl]="formControl"
    [formlyAttributes]="field"
    [nzDisabled]="to.disabled"
    [nzCheckedChildren]="to.checkedChildren"
    [nzUnCheckedChildren]="to.unCheckedChildren"
    [nzSize]="to.size"
    [nzLoading]="to.loading"
    (ngModelChange)="onChange($event)"
  ></nz-switch>`,
})
export class FormlyFieldSwitch extends FieldType {
  onChange(value) {
    if (this.to.onChange) {
      this.to.onChange(value, this.field);
    }
  }
}
