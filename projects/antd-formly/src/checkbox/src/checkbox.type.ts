import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'formly-field-nz-checkbox',
  template: `
    <nz-checkbox-layout
      [formControl]="formControl"
      [formlyAttributes]="field"
      [options]="to.options"
      [attr.disabled]="to.disabled"
    ></nz-checkbox-layout>
  `,
})
export class FormlyFieldCheckbox extends FieldType {}
