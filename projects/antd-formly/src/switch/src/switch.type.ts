import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'formly-field-nz-switch',
  template: ` <nz-switch
    [formControl]="formControl"
    [formlyAttributes]="field"
    [disabled]="to.disabled"
    [nzCheckedChildren]="to.checkedChildren"
    [nzUnCheckedChildren]="to.unCheckedChildren"
    [nzSize]="to.size"
    [nzLoading]="to.loading"
  ></nz-switch>`,
})
export class FormlyFieldSwitch extends FieldType {}
